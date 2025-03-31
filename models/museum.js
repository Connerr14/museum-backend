import mongoose, { Mongoose } from "mongoose";

// Defining the schema for museums
const museumSchema = mongoose.Schema ({
    name: {
        type: String, 
        required: true
    },
    admissionPrice: {
        type: Number, 
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    tours: [{
        tourName: {
            type: String,
        },
        tourGuide: {
            type: String,
        },
        duration: {
            type: Number,
        }
    }]
});

// Making the museum interface accessible outside the file
const Museum = mongoose.model('Museum', museumSchema);
export default Museum
