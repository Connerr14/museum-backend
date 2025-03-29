import express from "express";
import Museum  from "../models/museum.js";

// Create a express router object
const router = express.Router();

/**
 * @swagger
 * /api/v1/museums:
 *   get:
 *     summary: Retrieve all museums
 *     responses:
 *       200:
 *         description: A list of museums
 *       404:
 *         description: Not found
 */
router.get('/', async (req, res) => {
    let museums = await Museum.find();
    
    // If no museums are found, return 404
    if (!museums){
        return res.status(404).json({err: "No results found"});
    }

    return res.status(200).json(museums);
});

/**
 * @swagger
 * /api/v1/museums/{id}:
 *   get:
 *      summary: Find museums by their id
 *      parameters:
 *        - name: id
 *          in: path
 *          schema:
 *            type: string
 *            required: true
 *      responses:
 *        200:
 *          description: Returns a single museum
 *        404:
 *          description: Not found
 */
router.get('/:id', async (req, res) => {
    try {
        let museum = await Museum.findById(req.params.id);

        // If the object is not found, return 404
        if (!museum) {
            return res.status(404).json({err: "No result found"});
        }

        return res.status(200).json(museum);
    } 
    catch (err) {
        return res.status(400).json({err: `Bad Request: ${err}`});
    }
})


/**
 * @swagger
 * /api/v1/museums:
 *   post:
 *     summary: Add new museum from POST body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               admissionPrice:
 *                 type: integer
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resource created
 *       400:
 *         description: Bad Request
 */
router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).json({err: "Request Body Required"});
    }

    try {
        // Add the request to the db
        await Museum.create(req.body);
        return res.status(201).json("Resource Created"); // 201 resource created.
    }
    catch (err) {
        return res.status(400).json({err: `Bad Request: ${err}`});
    }
});


/**
 * @swagger
 * /api/v1/museums/{id}:
 *   put:
 *     summary: Update selected museum from/with request body
 *     parameters: 
 *       -name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               admissionPrice:
 *                 type: integer
 *               location:
 *                 type: string
 *     responses:
 *       204:
 *         description: Resource created
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not found
 */
router.put('/:id', async (req, res) => {
    try {
        let museum = await Museum.findById(req.params.id);

        // If the id value is invalid or no museum was found, return a 404
        if (!museum) {
            return res.status(404).json({err: "Resource was not found"});
        }

        // Check that there is a id in the req body, and that it is equal to the id in the url
        if (req.body._id && req.params.id !== req.body._id) 
        {
            // Return the bad request status code
            return res.status(400).json({err: "The ID's don't match"});
        }

        await Museum.findByIdAndUpdate(req.params.id, req.body);

        return res.status(204).json();
    }
    catch (err) {
        return res.status(400).json({err: `Bad Request ${err}`});
    }
});

/**
 * @swagger
 * /api/v1/museums/{id}:
 *   delete:
 *     summary: Remove a selected museum
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       204:
 *         description: Resource deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', async (req, res) => { 
    // Search for the item by id
    let museum = await Museum.findById(req.params.id);

    if (!museum) {
        return res.status(404).json({err: "Not found"});
    }

    // Delete the item
    await Museum.findByIdAndDelete(req.params.id);

    return res.status(204).json();
})

// Export the controller so that the rest of the app can use it
export default router; 
