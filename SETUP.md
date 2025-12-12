# 🚨 Wristband Alert System Setup

## Overview
This system simulates a wristband device with an admin dashboard to trigger alerts and a user dashboard to receive them in real-time.

## Architecture
- **Admin Dashboard**: Simulates wristband triggers (SOS, notifications, location updates)
- **User Dashboard**: Receives and displays alerts in real-time
- **Backend Server**: Handles authentication, WebSocket connections, and alert broadcasting
- **Database**: Stores admin credentials and event history

## Quick Start

### 1. Start Backend Server
```bash
cd backend
npm install
npm start
```
Server runs on: http://localhost:3001
WebSocket runs on: ws://localhost:3002

### 2. Start Frontend
```bash
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### 3. Access Dashboards

**Admin Dashboard**: http://localhost:5173/admin
- Username: `admin`
- Password: `admin123`

**User Dashboard**: http://localhost:5173/dashboard
- No login required

### 4. Test Connection
Open: `test-connection.html` in your browser to verify WebSocket connectivity

## Features

### Admin Dashboard
- 🆘 **Emergency SOS**: Triggers high-priority alert with sound
- 🔇 **Silent SOS**: Triggers alert without sound notification
- 📢 **Custom Notifications**: Send custom messages to users
- 📍 **Location Updates**: Simulate GPS location changes
- 👥 **User Count**: Shows number of connected users
- 🔌 **Connection Status**: Real-time server connectivity

### User Dashboard
- 🔔 **Real-time Alerts**: Instant notification display
- 🔊 **Sound Control**: Toggle alert sounds on/off
- 📱 **Mobile-friendly**: Responsive design
- 🎯 **Alert History**: Shows recent alerts with timestamps
- 🗺️ **Location Display**: Shows GPS coordinates when available
- ⚡ **Live Status**: Connection and battery indicators

## Alert Types

| Type | Icon | Priority | Sound | Description |
|------|------|----------|-------|-------------|
| SOS_TRIGGERED | 🆘 | High | Yes | Emergency alert |
| SILENT_SOS_TRIGGERED | 🔇 | High | No | Silent emergency |
| CUSTOM_NOTIFICATION | 📢 | Medium | Yes | Admin message |
| LOCATION_UPDATED | 📍 | Low | No | GPS update |

## API Endpoints

### Authentication
- `POST /auth/admin-login` - Admin login

### Alert Triggers (Admin only)
- `POST /trigger/sos` - Emergency SOS
- `POST /trigger/silent` - Silent SOS
- `POST /trigger/notify` - Custom notification
- `POST /trigger/location` - Location update

### Status
- `GET /health` - Server health check
- `GET /admin/stats` - Connected users count

## WebSocket Events
All alerts are broadcasted to connected users via WebSocket on port 3002.

## Database Schema
```sql
-- Admin users
CREATE TABLE admin (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  password TEXT
);

-- Event history
CREATE TABLE active_events (
  id INTEGER PRIMARY KEY,
  type TEXT,
  data TEXT,
  admin_id INTEGER,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Backend Issues
- Ensure port 3001 and 3002 are available
- Check if SQLite database is created in backend folder
- Verify admin credentials in database

### Frontend Issues
- Clear browser cache and localStorage
- Check browser console for WebSocket errors
- Ensure backend server is running

### Connection Issues
- Use `test-connection.html` to verify WebSocket
- Check firewall settings for ports 3001-3002
- Verify CORS settings in backend

## Development

### Adding New Alert Types
1. Add new endpoint in `backend/server.js`
2. Update alert handlers in `src/pages/Dashboard.tsx`
3. Add new alert styling in `getAlertColor()` function

### Customizing UI
- Modify components in `src/components/`
- Update styling in `src/index.css`
- Adjust animations and colors as needed

## Production Deployment
- Update WebSocket URLs to production domains
- Configure proper authentication and security
- Set up SSL certificates for HTTPS/WSS
- Use production database (PostgreSQL/MySQL)