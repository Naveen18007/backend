import busmodel from "../models/busmodel.js";
import fs from "fs";
import routemodel from "../models/routemodel.js";
import bookingmodel from "../models/booking.js";

//Add Bus item
const addbus = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const bus = new busmodel({
    busnum: req.body.busnum,
    price: req.body.price,
    image: image_filename,
  });
  try {
    await bus.save();
    res.json({ success: true, message: "Bus Addeed",bus});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove bus
const removebus = async (req, res) => {
  try {
    const bus = await busmodel.findById(req.body.id);
    fs.unlink(`uploads/${bus.image}`, () => {});
    await busmodel.findByIdAndDelete(req.body.id);
    await routemodel.deleteMany({ busId:req.body.id });
    await bookingmodel.deleteMany({busnum:bus.busnum})
    const buss=await busmodel.find()
    res.json({ success: true, message: "Bus Removed",buss});
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error" });
  }
};

//update bus
const updatebus = async (req, res) => {
  try {
    const { id, busnum, price } = req.body;
    await busmodel.findByIdAndUpdate(id, { busnum, price });
    const bus=await busmodel.find()
    res.json({ success: true, message: "Bus Updated",bus});
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error" });
  }
};

//add route
const addroute = async (req, res) => {
  const { busId, start, end, date, availableseats } = req.body;
  const checkbus = await busmodel.findById(busId);
  if (!checkbus) {
    return res.json({ success: false, message: "Bus not found" });
  }
  const route = new routemodel({
    busId,
    start,
    end,
    date,
    availableseats,
  });
  try {
    const savedroute = await route.save();
    const newroute = {
      _id: savedroute._id,
      start,
      end,
      date,
      availableseats,
    };
    checkbus.routeinfo.push(newroute);
    await checkbus.save();
     const buss=await busmodel.find()
    const routee=await routemodel.find()
    res.json({ success: true, message: "Route Addeed",buss,routee });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove route
const removeroute = async (req, res) => {
  try {
    const route = await routemodel.findById(req.body.id);
    await routemodel.findByIdAndDelete(req.body.id);
    await busmodel.updateOne(
      { _id: route.busId },
      { $pull: { routeinfo: { _id: req.body.id } } }
    );
    const buss=await busmodel.find()
    const routee=await routemodel.find()
    res.json({ success: true, message: "Route Removed",buss,routee});
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error" });
  }
};

//update route
const updateroute = async (req, res) => {
  try {
    const { id, start, end, date, availableseats } = req.body;
    await routemodel.findByIdAndUpdate(id, {
      start,
      end,
      date,
      availableseats,
    });
    await busmodel.updateOne(
      { "routeinfo._id": id },
      {
        $set: {
          "routeinfo.$.start": start,
          "routeinfo.$.end": end,
          "routeinfo.$.date": date,
          "routeinfo.$.availableseats": availableseats,
        },
      }
    );
    const routee=await routemodel.find()
    const buss=await busmodel.find()
    res.json({ success: true, message: "Route Updated",routee,buss});
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error" });
  }
};

export { addbus, addroute, removebus, removeroute, updateroute, updatebus };
