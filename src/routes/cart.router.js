import { Router } from "express";

import Carts from "../dao/dbManagers/cartManager.js";
import productsModel from "../dao/models/product.js";
import Product from '../dao/dbManagers/productManager.js'; 

const router = Router();
const cartsManager = new Carts();

const productsManager = new Product();


// Mostrar el carrito
router.get('/', async (req, res) => {
  try {
    const showCart = await cartsManager.getAll();
    res.render('cart',{carts:showCart});
  } catch (error) {
    res.status(500).json({
        message:"Error al mostrar el carrito",
        error:error
    });
  }
});



// Mostrar un carrito por su ID
router.get('/:cartId', async (req, res) => {
  const { cartId } = req.params;
  
  try {
    const cartData = await cartsManager.getById(cartId);

    if (!cartData) {
      res.status(404).json({ error: "Carrito no encontrado" });
      return;
    }

    res.render('cart', { carts: [cartData] }); // Renderiza la vista 'cart' con el carrito encontrado
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el carrito",
      error: error,
    });
  }
});
  
  
    
  // Crear un nuevo carrito
  router.post('/', async (req, res) => {
    const cartData = req.params;
    try {
      
      const newCart = await cartsManager.save(cartData);
  
      res.json({message:"Carrito creado",data:newCart});
    } catch (error) {
        res.status(500).json({
            message:"Error al crear el carrito",
            error:error
        });
    }
  });
  
  router.post("/:cid/product/:pid", async (req, res) => {
    try {
      
      const cartId = req.params.cid;
      const productId = req.params.pid;
  
      const cartData = await cartsManager.getById(cartId);
  
      if (!cartData) {
        res.status(404).json({ error: "Carrito no encontrado" });
        return;
      }
  
      const existingProductIndex = cartData.products.findIndex(product => 
        product.productId.toString() === productId);
    
      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, aumenta la cantidad
        cartData.products[existingProductIndex].quantity += 1;
        await cartsManager.update(cartId, cartData); 

      } else {
        // Si el producto no existe en el carrito, agrégalo con cantidad 1
        cartData.products.push({ productId, quantity: 1 });
      }
        
      // Actualiza el carrito con la nueva información
      const productData = await productsManager.getById(productId);
      await cartsManager.update(cartId, productData);
         
      res.json({
        message: "Producto agregado al carrito correctamente",
        data: cartData,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al agregar el producto al carrito",
        error: error,
      });
    }
  });
  
  
//agregar un producto al carrito
// router.post("/:cid/product/:pid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const productId = req.params.pid;
         
//     const cartData = await cartsManager.getById(cartId);

//     if (!cartData) {
//       res.status(404).json({ error: "Carrito no encontrado" });
//       return;
//     }

//     const existingProduct = await productsManager.getById(productId);
   
//     if (existingProduct) {
      
//       const cartUpdated = await cartsManager.update(cartId, existingProduct);
      
//       res.json({
//         message: "Producto agregado al carrito correctamente",
//         data: cartUpdated,
//       });
//     } else {
//       res.status(404).json({ error: "Producto no encontrado" });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Error al agregar el producto al carrito",
//       error: error,
//     });
//   }
// });
  
  
  // Eliminar el carrito
  router.delete('/:cartId', async (req, res) => {
    const { cartId } = req.params;
    try {
      const cartDeleted= await cartsManager.delete(cartId);
      res.json({message:"Carrito eliminado",data:cartDeleted});
    } catch (error) {
        res.status(500).json({
            message:"Error al eliminar el carrito",
            error:error
        });
    }
  });
  
  export default router;