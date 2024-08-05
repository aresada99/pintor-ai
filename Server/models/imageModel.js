import mongoose, {Schema} from "mongoose"


const imageSchema  = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
        
    },
    imgLink: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ImageModel = mongoose.model('Image', imageSchema);

export default ImageModel;
