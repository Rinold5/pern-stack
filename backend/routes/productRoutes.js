import express from "express";
import { getProducts,createProduct,getProduct,updateProduct,deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/:id", getProduct);
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct); 


export default router;