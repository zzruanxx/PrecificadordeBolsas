# API Endpoints Documentation

This document describes all the API endpoints available in the Precificador de Bolsas application.

## Base URL
All endpoints are relative to: `http://localhost:3000/api` (development) or your production domain.

## Authentication
Note: Currently, the API does not enforce authentication. When you configure Supabase with Row Level Security (RLS), authentication will be required and enforced at the database level.

---

## Materials (Estoque) Endpoints

### GET /api/materials
Get all materials from inventory.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Linha de Crochê 100g",
      "cost": 12.50,
      "unit": "un",
      "stock": 25,
      "min_stock": 10,
      "created_at": "2024-01-16T00:00:00Z",
      "updated_at": "2024-01-16T00:00:00Z"
    }
  ]
}
```

### POST /api/materials
Create a new material.

**Request Body:**
```json
{
  "name": "Linha de Crochê 100g",
  "cost": 12.50,
  "unit": "un",
  "stock": 25,
  "minStock": 10
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Linha de Crochê 100g",
    "cost": 12.50,
    "unit": "un",
    "stock": 25,
    "min_stock": 10,
    "created_at": "2024-01-16T00:00:00Z"
  }
}
```

### GET /api/materials/[id]
Get a specific material by ID.

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Linha de Crochê 100g",
    "cost": 12.50,
    "unit": "un",
    "stock": 25,
    "min_stock": 10
  }
}
```

### PUT /api/materials/[id]
Update a material.

**Request Body:**
```json
{
  "name": "Linha de Crochê 100g",
  "cost": 13.00,
  "unit": "un",
  "stock": 30,
  "minStock": 10
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Linha de Crochê 100g",
    "cost": 13.00,
    "unit": "un",
    "stock": 30,
    "min_stock": 10
  }
}
```

### DELETE /api/materials/[id]
Delete a material.

**Response:**
```json
{
  "success": true
}
```

---

## Pieces (Fichas Técnicas) Endpoints

### GET /api/pieces
Get all saved pieces.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Bolsa de Crochê Média",
      "materials": [
        {
          "id": "uuid",
          "name": "Linha de Crochê",
          "quantity": 2,
          "unit": "un",
          "unitCost": 12.50
        }
      ],
      "labor_hours": 5,
      "packaging_cost": 3.50,
      "profit_margin": 30,
      "production_cost": 45.50,
      "suggested_price": 89.90,
      "created_at": "2024-01-16T00:00:00Z"
    }
  ]
}
```

### POST /api/pieces
Create a new piece (ficha técnica).

**Request Body:**
```json
{
  "name": "Bolsa de Crochê Média",
  "materials": [
    {
      "id": "temp-id",
      "name": "Linha de Crochê",
      "quantity": 2,
      "unit": "un",
      "unitCost": 12.50
    }
  ],
  "laborHours": 5,
  "packagingCost": 3.50,
  "profitMargin": 30,
  "productionCost": 45.50,
  "suggestedPrice": 89.90
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Bolsa de Crochê Média",
    "materials": [...],
    "labor_hours": 5,
    "production_cost": 45.50,
    "suggested_price": 89.90
  }
}
```

### GET /api/pieces/[id]
Get a specific piece by ID.

### PUT /api/pieces/[id]
Update a piece.

### DELETE /api/pieces/[id]
Delete a piece.

---

## Sales Channels (Canais de Venda) Endpoints

### GET /api/channels
Get all sales channels.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Elo7",
      "fee_percent": 18,
      "fixed_fee": 0.40,
      "created_at": "2024-01-16T00:00:00Z"
    }
  ]
}
```

### POST /api/channels
Create a new sales channel.

**Request Body:**
```json
{
  "name": "Shopee",
  "feePercent": 12,
  "fixedFee": 0
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Shopee",
    "fee_percent": 12,
    "fixed_fee": 0
  }
}
```

### GET /api/channels/[id]
Get a specific channel by ID.

### PUT /api/channels/[id]
Update a sales channel.

**Request Body:**
```json
{
  "name": "Shopee",
  "feePercent": 13,
  "fixedFee": 0.50
}
```

### DELETE /api/channels/[id]
Delete a sales channel.

---

## Settings (Configurações) Endpoints

### GET /api/settings
Get atelier settings.

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "pro_labore": 3000,
    "hours_per_month": 160,
    "fixed_costs": 800,
    "depreciation": 200,
    "updated_at": "2024-01-16T00:00:00Z"
  }
}
```

If no settings exist, returns default values.

### POST /api/settings
Create or update settings (upsert).

**Request Body:**
```json
{
  "proLabore": 3500,
  "hoursPerMonth": 160,
  "fixedCosts": 900,
  "depreciation": 250
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "pro_labore": 3500,
    "hours_per_month": 160,
    "fixed_costs": 900,
    "depreciation": 250,
    "updated_at": "2024-01-16T00:00:00Z"
  }
}
```

---

## Error Responses

All endpoints return error responses in the following format:

**400 Bad Request:**
```json
{
  "error": "Missing required fields: name, cost, unit"
}
```

**404 Not Found:**
```json
{
  "error": "Material not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

## Testing the Endpoints

### Prerequisites
1. Set up Supabase:
   - Create a Supabase project at https://supabase.com
   - Run the SQL schema from `supabase-schema.sql`
   - Copy your project URL and anon key

2. Configure environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and add your Supabase credentials.

3. Start the development server:
   ```bash
   npm run dev
   ```

### Testing with curl

**Create a material:**
```bash
curl -X POST http://localhost:3000/api/materials \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Linha de Crochê 100g",
    "cost": 12.50,
    "unit": "un",
    "stock": 25,
    "minStock": 10
  }'
```

**Get all materials:**
```bash
curl http://localhost:3000/api/materials
```

**Create a piece:**
```bash
curl -X POST http://localhost:3000/api/pieces \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bolsa de Crochê Média",
    "materials": [{"id": "1", "name": "Linha", "quantity": 2, "unit": "un", "unitCost": 12.50}],
    "laborHours": 5,
    "packagingCost": 3.50,
    "profitMargin": 30,
    "productionCost": 45.50,
    "suggestedPrice": 89.90
  }'
```

**Save settings:**
```bash
curl -X POST http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{
    "proLabore": 3000,
    "hoursPerMonth": 160,
    "fixedCosts": 800,
    "depreciation": 200
  }'
```

### Testing with Postman or Insomnia

1. Import the endpoints using the documentation above
2. Create a new request for each endpoint
3. Set the appropriate headers and body data
4. Send requests and verify responses

---

## Field Mapping (Campos Digitáveis)

The following fields are sent from the frontend forms to the backend:

### Materials (Inventory Page):
- `name` → Material name
- `cost` → Unit cost
- `unit` → Measurement unit
- `stock` → Current stock quantity
- `minStock` → Minimum stock alert level

### Pieces (Calculator Page):
- `name` → Piece name
- `materials` → Array of materials with quantities
- `laborHours` → Hours of work
- `packagingCost` → Packaging cost
- `profitMargin` → Profit margin percentage
- `productionCost` → Total production cost (calculated)
- `suggestedPrice` → Suggested selling price (calculated)

### Channels:
- `name` → Channel name (e.g., "Elo7", "Instagram")
- `feePercent` → Percentage fee
- `fixedFee` → Fixed transaction fee

### Settings:
- `proLabore` → Monthly desired income
- `hoursPerMonth` → Hours worked per month
- `fixedCosts` → Monthly fixed costs
- `depreciation` → Equipment depreciation

All these fields are now properly validated and sent to the backend through the API endpoints.
