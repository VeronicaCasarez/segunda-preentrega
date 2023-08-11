import { Router } from "express";

import Products from "../dao/mongoManagers/productManager.js";

const router=Router();

const products=new Products();


// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const allProducts = await products.getAll();
    res.json({message: "Todos los productos",data:allProducts});
  } catch (error) {
    res.status(500).json({
        message:"Error al buscar los productos",
        error:error
    });
  }
});

  
  // Obtener un producto por ID
  router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
      const productById = await products.getById(productId);
      res.json({message:"Listado de productos",data:productById});
    } catch (error) {
        res.status(500).json({
            message:"Error al buscar el producto por id",
            error:error
        });
    }
  });
  
  // Crear un nuevo producto
  router.post('/', async (req, res) => {
    const productData = req.body;
    try {
      const newProduct = await products.save(productData);
      
      res.json({message:"Producto creado",data:newProduct});
    } catch (error) {
        res.status(500).json({
            message:"Error al crear el producto",
            error:error
        });
    }
  });
  
  // Actualizar un producto por ID
  router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const updateData = req.body;
    try {
      const updatedProduct = await products.update(productId, updateData);
      res.json({message:"Producto actualizado",data:updatedProduct});
    } catch (error) {
        res.status(500).json({
            message:"Error al actualizar el producto",
            error:error
        });
    }
  });
  
  // Eliminar un producto por ID
  router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
      const productDeleted= await products.delete(productId);
      res.json({message:"Producto eliminado",data:productDeleted});
    } catch (error) {
        res.status(500).json({
            message:"Error al eliminar el producto",
            error:error
        });
    }
  });
  
  export default router;