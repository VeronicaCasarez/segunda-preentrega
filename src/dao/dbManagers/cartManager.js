import cartModel from "../models/cart.js";

export default class Carts {
  async getAll() {
    return await cartModel.find({}).lean();
  }

  getOne = async (id) => {
    let result = await cartModel.findById(id).lean();
    return result;
  };
  
  async getById(id) {
    return await cartModel.findById(id);
  }

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
}