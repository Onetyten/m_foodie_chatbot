import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  foodId: { type: mongoose.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, default: 1 },
  priceAtPurchase: { type: Number, required: true },
  customisation: [
    {
      name: { type: String },
      type: { type: String },
      value: { type: String },
    },
  ],
}, { timestamps: true });

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default OrderItem;
