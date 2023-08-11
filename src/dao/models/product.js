import mongoose from 'mongoose';

const productsCollection='Products';

const productSchema = new mongoose.Schema({
  
   name: { type: String, required: true },
  price: { type: Number, required: true },
});

const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel;
//agregar paginate