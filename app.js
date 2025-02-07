// Importing the packages needed
import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

// Get access to the museums controller
import museumsController from './controllers/museums.js'

// Create a express instance
let app = express();

// Configure routing to the correct controller
app.use('/api/v1/museums', museumsController);

app.listen(3000, () => {
    console.log("Express api running on port 3000");
})