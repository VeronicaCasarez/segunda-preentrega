import cartModel from "../models/cart.js";

export default class Carts {
  //obtener todos los carritos
  async getAll() {
    return await cartModel.find({}).lean();
  }
 //obtener un carrito
  async getOne (id)  {
    let result = await cartModel.findById(id).lean();
    return result;
  };
  
  //obtener carrito por id
  async getById(id) {
    return await cartModel.findById(id);
  }

  //crear carrito
  async save(data) {
    const newCart = await cartModel.create(data);
    return newCart;
    
 }
 //actualizar carrito
  async update(id, data) {
    const updatedCart = await  cartModel.findByIdAndUpdate(id, {products:data});
    return updatedCart;
  }

//eliminar carrito
  async delete(id) {
    const deletedCart = await cartModel.findByIdAndDelete(id);
    return deletedCart;
  }

 //Eliminar del carrito el producto seleccionado
  async removeFromCart(cid, pid) {
      let cart = await cartModel.findOne({_id: cid})
      const result = await cartModel.updateOne(
    { _id: cid },
    { $pull: { products: {_id : pid } } }
  );
    return result
  }

  //encontrar un producto en el carrito por id
  async findProductInCartById(cid, pid, newQuantity) {
    console.log(cid)
    console.log(pid)
    console.log(newQuantity)
    const updatedCart = await cartModel.findOneAndUpdate(
      { _id: cid, 'products._id': pid }, // Encuentra el carrito y el producto específico dentro de él
      { $set: { 'products.$.quantity': newQuantity } }, // Actualiza la cantidad del producto específico
      { new: true }
    );
    
   console.log(updatedCart)
     
    return updatedCart;
  }
  

}