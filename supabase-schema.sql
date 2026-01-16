-- Supabase Database Schema for Precificador de Bolsas
-- Run this script in your Supabase SQL Editor to create all required tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for materials (estoque)
CREATE TABLE IF NOT EXISTS materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL,
  stock DECIMAL(10,2) DEFAULT 0,
  min_stock DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for sales channels (canais de venda)
CREATE TABLE IF NOT EXISTS sales_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  fee_percent DECIMAL(5,2) DEFAULT 0,
  fixed_fee DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for atelier settings (configurações)
CREATE TABLE IF NOT EXISTS atelier_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  pro_labore DECIMAL(10,2) NOT NULL,
  hours_per_month INTEGER NOT NULL,
  fixed_costs DECIMAL(10,2) NOT NULL,
  depreciation DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for pieces (fichas técnicas)
CREATE TABLE IF NOT EXISTS pieces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  materials JSONB NOT NULL,
  labor_hours DECIMAL(10,2) NOT NULL,
  packaging_cost DECIMAL(10,2) DEFAULT 0,
  profit_margin DECIMAL(5,2) DEFAULT 30,
  production_cost DECIMAL(10,2) NOT NULL,
  suggested_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_materials_user_id ON materials(user_id);
CREATE INDEX IF NOT EXISTS idx_sales_channels_user_id ON sales_channels(user_id);
CREATE INDEX IF NOT EXISTS idx_atelier_settings_user_id ON atelier_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_pieces_user_id ON pieces(user_id);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE atelier_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pieces ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for materials
CREATE POLICY "Users can view their own materials" 
  ON materials FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own materials" 
  ON materials FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own materials" 
  ON materials FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own materials" 
  ON materials FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for sales_channels
CREATE POLICY "Users can view their own sales channels" 
  ON sales_channels FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sales channels" 
  ON sales_channels FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sales channels" 
  ON sales_channels FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sales channels" 
  ON sales_channels FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for atelier_settings
CREATE POLICY "Users can view their own settings" 
  ON atelier_settings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" 
  ON atelier_settings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" 
  ON atelier_settings FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings" 
  ON atelier_settings FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for pieces
CREATE POLICY "Users can view their own pieces" 
  ON pieces FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pieces" 
  ON pieces FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pieces" 
  ON pieces FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pieces" 
  ON pieces FOR DELETE 
  USING (auth.uid() = user_id);

-- Create functions to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to call the update_updated_at_column function
CREATE TRIGGER update_materials_updated_at BEFORE UPDATE ON materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sales_channels_updated_at BEFORE UPDATE ON sales_channels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_atelier_settings_updated_at BEFORE UPDATE ON atelier_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pieces_updated_at BEFORE UPDATE ON pieces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
