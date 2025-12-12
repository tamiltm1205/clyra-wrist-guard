import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

// Initialize database
db.serialize(() => {
  // Admin table
  db.run(`CREATE TABLE admin (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT
  )`);

  // User table
  db.run(`CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    email TEXT
  )`);

  // Active events table
  db.run(`CREATE TABLE active_events (
    id INTEGER PRIMARY KEY,
    type TEXT,
    data TEXT,
    admin_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Notification logs
  db.run(`CREATE TABLE notification_logs (
    id INTEGER PRIMARY KEY,
    event_id INTEGER,
    status TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Simulated device status
  db.run(`CREATE TABLE simulated_device_status (
    id INTEGER PRIMARY KEY,
    device_id TEXT DEFAULT 'virtual-wristband-001',
    battery_level INTEGER DEFAULT 100,
    is_connected BOOLEAN DEFAULT 1,
    last_heartbeat DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert default admin (password: admin123)
  db.run(`INSERT INTO admin (username, password) VALUES (?, ?)`, 
    ['admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi']);
  
  // Insert default device status
  db.run(`INSERT INTO simulated_device_status (device_id) VALUES (?)`, ['virtual-wristband-001']);
});

export default db;