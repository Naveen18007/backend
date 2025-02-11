import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    busnum:{type:String,required:true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    routeId:{type: mongoose.Schema.Types.ObjectId, ref: "route", required: true},
    price:{type:Number,required:true},
    seats:{type:Number,required:true},
})

const bookingmodel=mongoose.models.booking || mongoose.model("booking",bookingSchema)

export default bookingmodel;