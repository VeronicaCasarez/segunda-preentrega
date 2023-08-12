import { Router } from "express";
import mongoose from "mongoose";
import { __dirname } from "../utils.js";
import * as dotenv from "dotenv";

import Products from "../dao/dbManagers/productManager.js";
import ProductModel from "../dao/models/product.js"; 
import productsModel from "../dao/models/product.js";
//import Products from "../dao/models/product.js";


const router=Router();

const products=new Products();


// router.get('/', async (req, res) => {
//     try {
//         const limit = parseInt(req.query.limit) || 10;
//         const page = parseInt(req.query.page) || 1;
//         const sort = req.query.sort === 'desc' ? -1 : 1;
//         const query = req.query.query || '';

//         const filter = {};
//         if (query) {
//             filter.$or = [
//                 { category: { $regex: query, $options: 'i' } },
//                 { availability: { $regex: query, $options: 'i' } },
//             ];
//         }

//         const totalProducts = await ProductModel.countDocuments(filter);
//         const totalPages = Math.ceil(totalProducts / limit);

//         const skip = (page - 1) * limit;

//         const allProducts = await productsModel.find(filter)
//             .sort({ price: sort })
//             .skip(skip)
//             .limit(limit);

//         const hasNextPage = page < totalPages;
//         const hasPrevPage = page > 1;

//         const result = {
//             status: 'success',
//             payload: allProducts,
//             totalPages,
//             prevPage: hasPrevPage ? page - 1 : null,
//             nextPage: hasNextPage ? page + 1 : null,
//             page,
//             hasPrevPage,
//             hasNextPage,
//             prevLink: hasPrevPage ? `/products?page=${page - 1}` : null,
//             nextLink: hasNextPage ? `/products?page=${page + 1}` : null,
//         };

//         res.render('product', result); 
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Error al buscar los productos',
//             error: error.message,
//         });
//     }
// });
// Obtener todos los productos
router.get('/all', async (req, res) => {
  try {
    const allProducts = await products.getAll();
    res.render('product',{products:allProducts});
  } catch (error) {
    res.status(500).json({
        message:"Error al buscar los productos",
        error:error
    });
  }
});

// Obtener los productos con limite
router.get("/", async (req, res) => {
  const {limit}  = req.query;
  
  try {
    const response = await products.getAll();
    if (limit) {
      let tempArray = response.slice(0, limit);
      res.render('product', { products: tempArray });
    } else {
      res.render('product', { products: response });
    }
  } catch (err) {
    res.render({ message: "Error al obtener los productos", data: err });
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