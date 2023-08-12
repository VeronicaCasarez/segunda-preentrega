import mongoose from 'mongoose';

const cartsCollection = 'Carts';

const cartSchema = new mongoose.Schema({
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }]
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;
