import mongoose from "mongoose";

const routeschema=new mongoose.Schema({
    busId:{type:String,required:true},
    start:{type:String,required:true},
    end:{type:String,required:true},
    date:{type:Date,default:Date.now()},
    availableseats:{type:Number,required:true}
})

const routemodel=mongoose.models.route || mongoose.model("route",routeschema)

export default routemodel;