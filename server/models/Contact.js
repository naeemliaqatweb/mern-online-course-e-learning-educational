import mongoose from "mongoose";

const contactSechema = new mongoose.Schema({
    email : {type: String , required: true},
    phone : {type: String , required: true},
    address : {type: String , required: true},
    socialLinks: [
        {
            name: String,
            url: String,
            icon:String
        }
    ]
}, {timestamps: true});

export default mongoose.model('Contact', contactSechema);