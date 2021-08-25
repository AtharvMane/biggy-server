import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const restaurantSchema = new mongoose.Schema({
  address: Object,
  city: String,
  cuisine: String,
  menu: Array,
  score: String,
  restaurant_id: String,
  name: { type: String, required: [true, "pls provide Name"] },
  email: {
    type: String,
    required: [true, "pls provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Provide a Valid Email",
    ],
  },
  password: { type: String, required: [true, "pls provide password"] },
});
restaurantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});
restaurantSchema.methods.signedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
restaurantSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
