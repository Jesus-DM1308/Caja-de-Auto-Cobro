const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { testConnection } = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Import routes
const medicationsRoutes = require('./routes/medications');
const inventoryRoutes = require('./routes/inventory');
const transactionsRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');

// Initialize express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Allow all origins by default
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logger

// Health check route
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/medications', medicationsRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Pharmacy Auto-Cobro API',
        version: '1.0.0',
        endpoints: {
            medications: '/api/medications',
            inventory: '/api/inventory',
            transactions: '/api/transactions',
            auth: '/api/auth',
            health: '/health'
        }
    });
});

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();

        if (!dbConnected) {
            console.error('❌ Failed to connect to database. Please check your configuration.');
            console.log('\n📝 Make sure:');
            console.log('   1. XAMPP MySQL is running');
            console.log('   2. Database "pharmacy_autocobro" exists');
            console.log('   3. .env file is configured correctly\n');
            process.exit(1);
        }

        // Start listening
        app.listen(PORT, () => {
            console.log('\n🚀 ===================================');
            console.log(`   Pharmacy Auto-Cobro API Server`);
            console.log('   ===================================');
            console.log(`   🌐 Server: http://localhost:${PORT}`);
            console.log(`   📊 Health: http://localhost:${PORT}/health`);
            console.log(`   🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log('   ===================================\n');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
