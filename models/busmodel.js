import mongoose from "mongoose";

const busschema =new mongoose.Schema({
    busnum:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    routeinfo: {
        type: [
            {
                start: { type: String, required: true },
                end: { type: String, required: true },
                date: { type: Date, required: true },
                availableseats:{ type: Number, required: true,default:0 },
            }
        ],
        default: []
    }
})

const busmodel=mongoose.models.bus || mongoose.model("bus",busschema)

export default busmodel;