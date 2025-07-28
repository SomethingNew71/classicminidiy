# Classic Mini DIY MCP Server

Model Context Protocol (MCP) server providing Classic Mini calculator tools for LLMs.

## Overview

This MCP server exposes two main calculator tools:
- **Compression Calculator**: Calculate compression ratio and engine capacity
- **Gearbox Calculator**: Calculate gear ratios, top speed, and speedometer compatibility

## Authentication

**All MCP endpoints require authentication via API key.**

### API Key Setup

1. **Environment Variables**: Set one of the following:
   ```bash
   # Single API key
   MCP_API_KEY=your-secure-api-key

   # Multiple API keys (comma-separated)
   MCP_API_KEYS=key1,key2,key3
   ```

2. **Development Mode**: In development, a default key is available:
   ```
   dev-mcp-key-classic-mini-diy
   ```

### Usage

Include the API key in the Authorization header:
```bash
Authorization: Bearer your-api-key
```

### Security Notes

- API keys should be kept secure and not exposed in client-side code
- Use environment variables to manage keys
- Rotate keys regularly for production use
- Each LLM integration should have its own unique API key

## Endpoints

### MCP Server Info
- **GET** `/api/mcp/server` - Returns server capabilities, tools, and resources

### Tool Execution
- **POST** `/api/mcp/tools/call` - Execute calculator tools

### Resources
- **GET** `/api/mcp/resources` - List available resources
- **GET** `/api/mcp/resources/read?uri=<resource_uri>` - Read resource content

### Direct Calculator APIs
- **POST** `/api/mcp/compression` - Direct compression calculator API
- **POST** `/api/mcp/gearbox` - Direct gearbox calculator API

## Tools

### Compression Calculator

Calculate compression ratio and engine capacity for Classic Mini engines.

**Parameters:**
```json
{
  "bore": 7.06,           // Bore diameter in cm (e.g., 7.06 for 70.6mm)
  "stroke": 8.128,        // Stroke length in cm (e.g., 8.128 for 81.28mm)
  "pistonDish": 6.5,      // Piston dish volume in cc
  "headVolume": 25.5,     // Cylinder head chamber volume in cc
  "deckHeight": 20,       // Piston deck height in thousandths of an inch
  "gasket": 3.4,          // Head gasket volume in cc (use 0 for custom)
  "customGasket": 0.1,    // Custom gasket volume in cc (used when gasket is 0)
  "decomp": 0             // Decompression plate volume in cc
}
```

**Example Response:**
```json
{
  "success": true,
  "results": {
    "compressionRatio": 9.75,
    "engineCapacity": 1275.5,
    "combustionChamberVolume": 41.2
  },
  "context": {
    "pistonSize": "Stock 1275 - 70.60mm",
    "crankshaft": "1275cc - 81.28mm",
    "headGasket": "1275 - 3.4cc",
    "decompPlate": "None (0cc)"
  }
}
```

### Gearbox Calculator

Calculate gear ratios, top speed, and speedometer compatibility.

**Parameters:**
```json
{
  "metric": false,                    // Use metric units (true) or imperial (false)
  "final_drive": 3.444,              // Final drive ratio
  "gear_ratios": [2.583, 1.644, 1.25, 1.0], // Array of 4 gear ratios
  "drop_gear": 1,                    // Drop gear ratio
  "speedo_drive": 0.3529,            // Speedometer drive ratio
  "max_rpm": 6500,                   // Maximum engine RPM
  "tire_type": {                     // Tire specifications
    "width": 145,                    // Tire width in mm
    "profile": 80,                   // Tire profile percentage
    "size": 10                       // Wheel size in inches
  }
}
```

**Example Response:**
```json
{
  "success": true,
  "results": {
    "topSpeed": 85,
    "topSpeedUnit": "mph",
    "engineRevsPerDistance": 3500,
    "gearboxTurnsPerDistance": 3500,
    "tireTurnsPerDistance": 1015
  },
  "gearing": [
    {
      "gear": 1,
      "ratio": 2.583,
      "totalRatio": 8.896,
      "maxSpeed": 33,
      "unit": "mph"
    }
  ],
  "speedometers": [
    {
      "speedometer": "Smiths - Generic",
      "result": "Perfect Match",
      "percentageDiff": 0
    }
  ]
}
```

## Integration with Chat System

To integrate these calculators with your LangGraph chat system, you can:

1. **Add MCP Client to LangGraph Agent**: Configure your LangGraph agent to use this MCP server
2. **Tool Registration**: Register the compression_calculator and gearbox_calculator tools
3. **Resource Access**: Allow the agent to read calculator documentation via MCP resources

### Example LangGraph Integration

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client/index.js';

// Configure MCP client
const mcpClient = new MCPClient({
  name: 'classic-mini-calculators',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {},
    resources: {}
  }
});

// Connect to your MCP server
await mcpClient.connect(new StdioServerTransport({
  command: 'node',
  args: ['path/to/mcp/server.js']
}));

// List available tools
const tools = await mcpClient.listTools();

// Call compression calculator
const result = await mcpClient.callTool({
  name: 'compression_calculator',
  arguments: {
    bore: 7.06,
    stroke: 8.128,
    pistonDish: 6.5,
    headVolume: 25.5
  }
});
```

## Error Handling

All endpoints return standardized error responses:

```json
{
  "statusCode": 400,
  "statusMessage": "Invalid bore: must be a valid number"
}
```

Common error codes:
- `400` - Bad Request (invalid parameters)
- `404` - Not Found (unknown tool or resource)
- `405` - Method Not Allowed
- `500` - Internal Server Error

## CORS Support

The MCP server includes CORS headers to support browser-based MCP clients:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Caching

Calculator responses are cached for 24 hours (`max-age=86400`) since the calculation logic is static.

## Testing

You can test the MCP server endpoints directly:

```bash
# Get server info
curl http://localhost:3000/api/mcp/server

# Test compression calculator
curl -X POST http://localhost:3000/api/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "compression_calculator",
    "arguments": {
      "bore": 7.06,
      "stroke": 8.128,
      "pistonDish": 6.5,
      "headVolume": 25.5
    }
  }'

# Test gearbox calculator
curl -X POST http://localhost:3000/api/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "gearbox_calculator",
    "arguments": {
      "final_drive": 3.444,
      "gear_ratios": [2.583, 1.644, 1.25, 1.0],
      "tire_type": {"width": 145, "profile": 80, "size": 10}
    }
  }'
```

## Available Options

The calculators support all the same options as the Vue components:

### Compression Calculator Options
- **Piston Sizes**: 62.9mm (850) to 74mm (1400cc)
- **Crankshafts**: 850cc (68.26mm) to custom stroked options
- **Head Gaskets**: 850 (2.4cc) to custom volumes
- **Decompression Plates**: None to 12.4cc options

### Gearbox Calculator Options
- **Tire Sizes**: 145/80r10 to 195/50r13
- **Final Drives**: 2.76:1 to 4.571:1
- **Gear Ratios**: Pre-64 Magic Wand to modern dog engagement kits
- **Speedometer Drives**: 5/18 to various ratios
- **Speedometers**: Smiths, Nippon Seiki, Metro options

All options are automatically matched and provided in the response context for better user understanding.
