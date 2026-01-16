#!/bin/bash

# Test script for API endpoints
# Make sure the server is running: npm run dev

BASE_URL="http://localhost:3000/api"
echo "Testing API Endpoints at $BASE_URL"
echo "======================================"
echo ""

# Test Materials Endpoints
echo "1. Testing Materials Endpoints"
echo "-------------------------------"

echo "GET /api/materials"
curl -s "$BASE_URL/materials" | jq '.' || echo "Failed"
echo ""

echo "POST /api/materials (create new material)"
MATERIAL_RESPONSE=$(curl -s -X POST "$BASE_URL/materials" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Material",
    "cost": 10.50,
    "unit": "un",
    "stock": 20,
    "minStock": 5
  }')
echo "$MATERIAL_RESPONSE" | jq '.' || echo "Failed"
MATERIAL_ID=$(echo "$MATERIAL_RESPONSE" | jq -r '.data.id')
echo ""

if [ "$MATERIAL_ID" != "null" ] && [ -n "$MATERIAL_ID" ]; then
  echo "GET /api/materials/$MATERIAL_ID"
  curl -s "$BASE_URL/materials/$MATERIAL_ID" | jq '.' || echo "Failed"
  echo ""

  echo "PUT /api/materials/$MATERIAL_ID (update material)"
  curl -s -X PUT "$BASE_URL/materials/$MATERIAL_ID" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Updated Test Material",
      "cost": 12.00,
      "unit": "un",
      "stock": 25,
      "minStock": 5
    }' | jq '.' || echo "Failed"
  echo ""

  echo "DELETE /api/materials/$MATERIAL_ID"
  curl -s -X DELETE "$BASE_URL/materials/$MATERIAL_ID" | jq '.' || echo "Failed"
  echo ""
fi

# Test Channels Endpoints
echo "2. Testing Channels Endpoints"
echo "------------------------------"

echo "GET /api/channels"
curl -s "$BASE_URL/channels" | jq '.' || echo "Failed"
echo ""

echo "POST /api/channels (create new channel)"
CHANNEL_RESPONSE=$(curl -s -X POST "$BASE_URL/channels" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Channel",
    "feePercent": 15,
    "fixedFee": 0.50
  }')
echo "$CHANNEL_RESPONSE" | jq '.' || echo "Failed"
CHANNEL_ID=$(echo "$CHANNEL_RESPONSE" | jq -r '.data.id')
echo ""

if [ "$CHANNEL_ID" != "null" ] && [ -n "$CHANNEL_ID" ]; then
  echo "DELETE /api/channels/$CHANNEL_ID"
  curl -s -X DELETE "$BASE_URL/channels/$CHANNEL_ID" | jq '.' || echo "Failed"
  echo ""
fi

# Test Settings Endpoints
echo "3. Testing Settings Endpoints"
echo "------------------------------"

echo "GET /api/settings"
curl -s "$BASE_URL/settings" | jq '.' || echo "Failed"
echo ""

echo "POST /api/settings (save settings)"
curl -s -X POST "$BASE_URL/settings" \
  -H "Content-Type: application/json" \
  -d '{
    "proLabore": 3000,
    "hoursPerMonth": 160,
    "fixedCosts": 800,
    "depreciation": 200
  }' | jq '.' || echo "Failed"
echo ""

# Test Pieces Endpoints
echo "4. Testing Pieces Endpoints"
echo "----------------------------"

echo "GET /api/pieces"
curl -s "$BASE_URL/pieces" | jq '.' || echo "Failed"
echo ""

echo "POST /api/pieces (create new piece)"
PIECE_RESPONSE=$(curl -s -X POST "$BASE_URL/pieces" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Bag",
    "materials": [
      {
        "id": "temp-1",
        "name": "Test Material",
        "quantity": 2,
        "unit": "un",
        "unitCost": 10.50
      }
    ],
    "laborHours": 5,
    "packagingCost": 3.50,
    "profitMargin": 30,
    "productionCost": 45.50,
    "suggestedPrice": 59.15
  }')
echo "$PIECE_RESPONSE" | jq '.' || echo "Failed"
PIECE_ID=$(echo "$PIECE_RESPONSE" | jq -r '.data.id')
echo ""

if [ "$PIECE_ID" != "null" ] && [ -n "$PIECE_ID" ]; then
  echo "DELETE /api/pieces/$PIECE_ID"
  curl -s -X DELETE "$BASE_URL/pieces/$PIECE_ID" | jq '.' || echo "Failed"
  echo ""
fi

echo "======================================"
echo "API Testing Complete!"
