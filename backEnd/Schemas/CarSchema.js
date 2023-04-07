import mongoose from "mongoose";

const carSchema = mongoose.Schema({
  company: String,
  carModel: String,
  capacity: String,
  fuelType: String,
  insurance: String,
  mileage: String,
  comfort: String,
  carView: String,
  carImg: String,
});

const carModel = mongoose.model("cars", carSchema);

export default carModel;
