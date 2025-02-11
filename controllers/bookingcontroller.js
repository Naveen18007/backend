import busmodel from "../models/busmodel.js";
import userModel from "../models/usermodel.js";
import bookingmodel from "../models/booking.js";

//book bus
const bookbus = async (req, res) => {
  try {
    const { busId, routeId, userId, seats } = req.body;
    const user = await userModel.findById(userId);

    if (!user) return res.json({ success: false, message: "User not found" });

    const bus = await busmodel.findById(busId);
    if (!bus) return res.json({ success: false, message: "Bus not found" });

    const route = bus.routeinfo.find((r) => r._id.toString() === routeId);
    if (!route) return res.json({ success: false, message: "Route not found" });

    if (route.availableseats < seats) {
      return res.json({
        success: false,
        message: "Not enough seats available",
      });
    }
    const pricePerSeat = bus.price;
    const totalPrice = pricePerSeat * seats;
    route.availableseats -= seats;
    await bus.save();
    const booking = new bookingmodel({
      busnum: bus.busnum,
      userId,
      routeId,
      price: totalPrice,
      seats,
    });
    await booking.save();
    res.json({
      success: true,
      message: "Bus booked successfully",
      data: booking,
    });
  } catch (error) { 
    console.log(error)
    res.json({success:false,message:"Error"})
  }
};

//cancel bus
const cancelbus = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await bookingmodel.findById(bookingId);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }
    const { busnum,userID,routeId,price,seats } = booking;
    const bus = await busmodel.findOne({ busnum });
    const routee = bus.routeinfo.find((r) => r._id.toString() === routeId.toString());
    if (!routee) return res.json({ success: false, message: "Route not found" });
    routee.availableseats += seats;
    await bus.save();
    await bookingmodel.findByIdAndDelete(bookingId);
    res.json({success:true,message:"Booking canceled"})
  } catch (error) {
    console.log(error);
    res.json({ suscess: false, messgae: "Error" });
  }
};

//Get available bus
const listbus = async (req, res) => {
  try {
    const { start, end } = req.body;
    let query = {};

    if (start) query["routeinfo.start"] = start;
    if (end) query["routeinfo.end"] = end;
    const buses = await busmodel.find(query);
    if (buses.length === 0) {
      return res.json({ success: false, message: "No buses found" });
    }
    res.json({ success: true, data: buses });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, messgae: "Error" });
  }
};

export { bookbus, cancelbus, listbus };
