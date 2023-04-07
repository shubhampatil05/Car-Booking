import mongoose from "mongoose";
const InfoSchema = mongoose.Schema({
  //   bookingBy: { type: String, require: true },
  pickupDate: { type: String, require: true },
  dropDate: { type: String, require: true },
  pickupTime: { type: String, require: true },
  pickupLocation: { type: String, require: true },
  dropLocation: { type: String, require: true },
  driverType: { type: String, require: true },
  driverDetails: { type: [Object], require: true },
});

const infoModel = mongoose.model("infos", InfoSchema);

export default infoModel;
