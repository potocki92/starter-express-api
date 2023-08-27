const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    type: Object,
    name: { type: String, require: false },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
    },
    NIP: { type: Number, required: false },
    REGON: { type: Number, required: false },
    address: {
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      street: { type: String, required: true },
    },
    phone: { type: Number, required: false },
  },
  products: { type: Array, default: [] },
  clients: { type: Array, default: [] },
  invoices: { type: Array, default: [] },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
