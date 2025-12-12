import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Users, Wifi, WifiOff } from 'lucide-react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [customMessage, setCustomMessage] = useState('');
  const [latitude, setLatitude] = useState('37.7749');
  const [longitude, setLongitude] = useState('-122.4194');
  const [isConnected, setIsConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [lastEventId, setLastEventId] = useState<number | null>(null);
  const { toast } = useToast();

  const API_BASE = 'http://localhost:3001';

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      checkConnection();
    }
  }, [token]);

  const checkConnection = async () => {
    try {
      const response = await fetch(`${API_BASE}/health`);
      if (response.ok) {
        const data = await response.json();
        setIsConnected(true);
        setConnectedUsers(data.connectedUsers || 0);
      } else {
        setIsConnected(false);
        setConnectedUsers(0);
      }
    } catch {
      setIsConnected(false);
      setConnectedUsers(0);
    }
  };

  // Poll for connection status and user count
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(checkConnection, 3000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const login = async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        toast({ title: 'Login successful!' });
        checkConnection();
      } else {
        toast({ title: 'Login failed', description: data.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Connection error', variant: 'destructive' });
    }
  };

  const makeRequest = async (endpoint: string, body?: any) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body ? JSON.stringify(body) : null
      });

      const data = await response.json();
      
      if (response.ok) {
        setLastEventId(data.eventId);
        toast({ 
          title: '✅ Alert Sent Successfully!', 
          description: `Event ID: ${data.eventId} - Alert broadcasted to all connected users`,
          duration: 3000
        });
      } else {
        toast({ title: 'Failed to send alert', description: data.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Connection error', variant: 'destructive' });
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAuthenticated(false);
    toast({ title: 'Logged out' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-center text-white">🚨 Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/20 border-purple-500/30 text-white"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/20 border-purple-500/30 text-white"
            />
            <Button onClick={login} className="w-full bg-purple-600 hover:bg-purple-700">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              🚨 Admin Control Panel
            </h1>
            <p className="text-purple-300 text-sm mt-1">Simulate wristband alerts & notifications</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-lg">
              {isConnected ? <Wifi className="w-4 h-4 text-green-400" /> : <WifiOff className="w-4 h-4 text-red-400" />}
              <Badge variant={isConnected ? 'default' : 'destructive'}>
                {isConnected ? 'Server Online' : 'Server Offline'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-lg">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-white text-sm">{connectedUsers} Users</span>
            </div>
            <Button onClick={logout} variant="outline" className="border-purple-500/30 text-white hover:bg-purple-600/20">
              Logout
            </Button>
          </div>
        </div>

        {lastEventId && (
          <Card className="bg-green-500/10 border-green-500/30 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Last Alert Sent: Event #{lastEventId}</span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-black/40 border-red-500/30 hover:border-red-400/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Emergency Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => makeRequest('/trigger/sos')}
                disabled={!isConnected}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg transition-all hover:scale-105 disabled:opacity-50"
              >
                🆘 TRIGGER SOS ALERT
              </Button>
              <Button 
                onClick={() => makeRequest('/trigger/silent')}
                disabled={!isConnected}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 text-lg transition-all hover:scale-105 disabled:opacity-50"
              >
                🔇 SILENT SOS ALERT
              </Button>
              <p className="text-xs text-gray-400 text-center mt-2">
                {isConnected ? 'Ready to send alerts' : 'Server offline - alerts disabled'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-blue-500/30 hover:border-blue-400/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-blue-400">📢 Custom Notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter custom message for users..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="bg-black/20 border-blue-500/30 text-white placeholder:text-gray-400 min-h-[80px]"
              />
              <Button 
                onClick={() => makeRequest('/trigger/notify', { message: customMessage })}
                disabled={!isConnected || !customMessage.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 transition-all hover:scale-105 disabled:opacity-50"
              >
                📢 Send Custom Alert
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Send custom messages to all connected users
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-500/30 md:col-span-2 hover:border-green-400/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-green-400">📍 Location Simulator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Latitude</label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="37.7749"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="bg-black/20 border-green-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Longitude</label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="-122.4194"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="bg-black/20 border-green-500/30 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setLatitude('37.7749');
                    setLongitude('-122.4194');
                  }}
                  variant="outline"
                  className="border-green-500/30 text-green-400 hover:bg-green-600/20"
                >
                  San Francisco
                </Button>
                <Button 
                  onClick={() => {
                    setLatitude('40.7128');
                    setLongitude('-74.0060');
                  }}
                  variant="outline"
                  className="border-green-500/30 text-green-400 hover:bg-green-600/20"
                >
                  New York
                </Button>
              </div>
              <Button 
                onClick={() => makeRequest('/trigger/location', { lat: parseFloat(latitude), long: parseFloat(longitude) })}
                disabled={!isConnected || !latitude || !longitude}
                className="w-full bg-green-600 hover:bg-green-700 py-3 transition-all hover:scale-105 disabled:opacity-50"
              >
                📍 Simulate Location Update
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Simulate wristband location updates for testing
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;