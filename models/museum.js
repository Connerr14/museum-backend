import mongoose, { Mongoose } from "mongoose";

// Defining the schema for museums
const museumSchema = mongoose.Schema ({
    name: {
        type: String, 
        require: true
    },
    admissionPrice: {
        type: Number, 
        require: true
    },
    location: {
        type: String, 
        require: true
    }
});

// Making the museum interface accessible outside the file
const Museum = mongoose.model('Museum', museumSchema);
export default Museum