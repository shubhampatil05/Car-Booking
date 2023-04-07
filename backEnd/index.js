import express, { request } from "express";
const app = express();
import mongoose from "mongoose";
import carModel from "./Schemas/CarSchema.js";
import userModel from "./Schemas/UserSchema.js";
import infoModel from "./Schemas/InfoSchema.js";
import cors from "cors";
app.use(cors());
app.use(express.json()); // app.use() is a express js middleware.. used to get a data which is posted
mongoose
  .connect("mongodb://localhost:27017/Car-Rental")
  .then(() => console.log("Connected To MongoDB"))
  .catch(() => console.log("Not Connected To MongoDB"));

// get a carInfo data from db

app.get("/carInfo", async (req, res) => {
  const data = await carModel.find();
  res.send(data);
});

// post a user details in db when ragister

app.post("/signUp", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    // if user try to ragister with the email which is already exist..then we throws an error

    const userExits = await userModel.findOne({ email: email });
    // console.log(userExits);

    if (userExits) {
      res.status(422).json({ error: "User Already Exist" });
    } else if (password !== confirmPassword) {
      res.status(422).json({ error: "Password Dosen't Match" });
    } else {
      const data = new userModel(req.body);
      const result = await data.save();
      //   console.log(result);
      res.status(201).json({ message: "User Ragisterd Successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// check email and password is correct or not when user try to login

app.post("/logIn", async (req, res) => {
  const { email, password } = req.body;

  const isUser = await userModel.findOne({ email: email, password: password });

  try {
    if (!isUser) {
      return res.status(404).json({ error: "Invalid Credentials" });
    } else {
      return res
        .status(200)
        .json({ message: "You Have Logged In Successfully" });
    }
  } catch (error) {
    console.log(Error.message);
  }
});

app.post("/info", async (req, res) => {
  const {
    pickupDate,
    dropDate,
    pickupTime,
    pickupLocation,
    dropLocation,
    driverType,
    driverDetails,
  } = req.body;

  try {
    if (
      !pickupDate ||
      !dropDate ||
      !pickupTime ||
      !pickupLocation ||
      !dropLocation ||
      !driverType ||
      !driverDetails
    ) {
      return res.status(404).json({ error: "Fill Up All The Details" });
    } else {
      const data = await infoModel(req.body);
      const result = await data.save();
      return res.status(201).json({ message: "Confirmed" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5200, () => {
  console.log("All Okk");
});
