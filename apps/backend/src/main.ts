import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.get('/', (c) => {
  return c.json({ 
    message: 'ERP Backend API is running! 🚀',
    status: 'success',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/health', (c) => {
  return c.json({ 
    status: 'healthy',
    service: 'ERP Backend',
    uptime: process.uptime()
  });
});

app.get('/api/employees', (c) => {
  return c.json({
    employees: [
      { id: 1, name: 'John Doe', role: 'HR Manager', department: 'HR' },
      { id: 2, name: 'Jane Smith', role: 'Finance Manager', department: 'Finance' }
    ],
    total: 2
  });
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

console.log(`🚀 Starting ERP Backend on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`✅ Backend running at http://localhost:${port}`);