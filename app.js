// Importing the packages needed
import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import cors from 'cors'


// Get access to the museums controller
import museumsController from './controllers/museums.js'

// Create a express instance
let app = express();


// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());

mongoose.connect(process.env.DB, {})
.then((res) => console.log('Connected to MongoDB'))
.catch((err) => console.log(`Connection Failure: ${err}`))

// Cors: allow angular client http access
app.use(cors({
    origin: [
        'http://localhost:4200', // Local development URL
        'https://museum-backend-llx2.vercel.app' // Production frontend URL
    ],
    methods: "GET,POST,PUT,DELETE,HEAD,OPTIONS", 
    credentials: false, 
    allowedHeaders: 'Content-Type, Authorization'
}));


const docOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Museum API',
            version: '1.0.0'
        }
    },
    apis: ['./controllers/*.js'] // Where to find methods
}

const openapiSpecification = swaggerJSDoc(docOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


// Configure routing to the correct controller
app.use('/api/v1/museums', museumsController);


app.use('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});


app.listen(3000, () => {
    console.log("Express api running on port 3000");
})