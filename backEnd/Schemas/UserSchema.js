import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  phone: { type: Number, require: true },
  email: { type: String, require: true },
  userName: { type: String, require: true },
  password: { type: String, require: true },
  confirmPassword: { type: String, require: true },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
