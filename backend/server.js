import express from 'express';
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import db from './database.js';

const app = express();
const PORT = 3001;
const JWT_SECRET = 'mezzoi-secret-key';

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// WebSocket server
const wss = new WebSocketServer({ port: 3002 });
const connectedUsers = new Set();

wss.on('connection', (ws) => {
  connectedUsers.add(ws);
  console.log(`User connected via WebSocket. Total users: ${connectedUsers.size}`);
  
  ws.on('close', () => {
    connectedUsers.delete(ws);
    console.log(`User disconnected. Total users: ${connectedUsers.size}`);
  });
});

// Broadcast to all connected users
const broadcast = (data) => {
  connectedUsers.forEach(ws => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(data));
    }
  });
};

// Auth middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Admin login
app.post('/auth/admin-login', (req, res) => {
  const { username, password } = req.body;
  
  db.get('SELECT * FROM admin WHERE username = ?', [username], (err, admin) => {
    if (err || !admin) return res.status(401).json({ error: 'Invalid credentials' });
    
    bcrypt.compare(password, admin.password, (err, isValid) => {
      if (err || !isValid) return res.status(401).json({ error: 'Invalid credentials' });
      
      const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, admin: { id: admin.id, username: admin.username } });
    });
  });
});

// Trigger SOS alert
app.post('/trigger/sos', authenticateAdmin, (req, res) => {
  const eventData = {
    type: 'SOS_TRIGGERED',
    message: 'Emergency SOS Alert!',
    timestamp: new Date().toISOString(),
    adminId: req.adminId
  };
  
  db.run('INSERT INTO active_events (type, data, admin_id) VALUES (?, ?, ?)',
    [eventData.type, JSON.stringify(eventData), req.adminId], function(err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      
      broadcast(eventData);
      res.json({ success: true, eventId: this.lastID });
    });
});

// Trigger silent SOS
app.post('/trigger/silent', authenticateAdmin, (req, res) => {
  const eventData = {
    type: 'SILENT_SOS_TRIGGERED',
    message: 'Silent SOS Alert - No Sound',
    timestamp: new Date().toISOString(),
    adminId: req.adminId
  };
  
  db.run('INSERT INTO active_events (type, data, admin_id) VALUES (?, ?, ?)',
    [eventData.type, JSON.stringify(eventData), req.adminId], function(err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      
      broadcast(eventData);
      res.json({ success: true, eventId: this.lastID });
    });
});

// Send custom notification
app.post('/trigger/notify', authenticateAdmin, (req, res) => {
  const { message } = req.body;
  const eventData = {
    type: 'CUSTOM_NOTIFICATION',
    message: message || 'Custom notification from admin',
    timestamp: new Date().toISOString(),
    adminId: req.adminId
  };
  
  db.run('INSERT INTO active_events (type, data, admin_id) VALUES (?, ?, ?)',
    [eventData.type, JSON.stringify(eventData), req.adminId], function(err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      
      broadcast(eventData);
      res.json({ success: true, eventId: this.lastID });
    });
});

// Simulate location update
app.post('/trigger/location', authenticateAdmin, (req, res) => {
  const { lat, long } = req.body;
  const eventData = {
    type: 'LOCATION_UPDATED',
    message: 'Location updated',
    location: { lat: lat || 0, long: long || 0 },
    timestamp: new Date().toISOString(),
    adminId: req.adminId
  };
  
  db.run('INSERT INTO active_events (type, data, admin_id) VALUES (?, ?, ?)',
    [eventData.type, JSON.stringify(eventData), req.adminId], function(err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      
      broadcast(eventData);
      res.json({ success: true, eventId: this.lastID });
    });
});

// Get active events (fallback for users)
app.get('/user/active-events', (req, res) => {
  db.all('SELECT * FROM active_events ORDER BY timestamp DESC LIMIT 10', (err, events) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    
    const formattedEvents = events.map(event => ({
      id: event.id,
      ...JSON.parse(event.data)
    }));
    
    res.json({ events: formattedEvents });
  });
});

// Get connected users count
app.get('/admin/stats', authenticateAdmin, (req, res) => {
  res.json({ 
    connectedUsers: connectedUsers.size,
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    connectedUsers: connectedUsers.size,
    timestamp: new Date().toISOString() 
  });
});

app.listen(PORT, () => {
  console.log(`Mezzoi Backend running on port ${PORT}`);
  console.log(`WebSocket server running on port 3002`);
});