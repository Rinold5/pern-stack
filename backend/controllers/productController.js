import {sql} from "../config/db.js";

export const getProducts = async(req, res) => {
    try {
        const products = await sql `SELECT * FROM products
        ORDER BY created_at DESC`;

        console.log("Fetched all products",products);
        res.status(200).json({success:true, data:products});
    } catch (error) {
        console.error("Error in getProducts function: ", error)
        res.status(500).json({success:false, message:"Internal Server error"});
    }
};

export const createProduct = async(req, res) => {

    const {name,image,price} = req.body;
    
    if(!name || !image || !price) {
        return res.status(400).json({success:false, error:"Please provide all required fields"});
    }

    try {
        const newProduct = await sql `INSERT INTO products (name, image, price)
        VALUES (${name}, ${image}, ${price})
        RETURNING *`;

        console.log("Created a new product",newProduct);
        res.status(201).json({success:true, data:newProduct[0]});
    } catch (error) {
        console.error("Error in createProduct function: ", error)
        res.status(500).json({success:false, message:"Internal Server error"});
    }
};

export const getProduct = async(req, res) => {
    const {id} = req.params;

    try{
        const product = await sql `SELECT * FROM products WHERE id=${id}`;

        res.status(200).json({success:true, data:product[0]});
    }
    catch(error){
        console.error("Error in getProduct function: ", error)
        res.status(500).json({success:false, message:"Internal Server error"});
    }
};

export const updateProduct = async(req, res) => {
    const {id} = req.params;
    const {name, image, price} = req.body;

    try {
        const updatedProduct = await sql `UPDATE products
        SET name=${name}, image=${image}, price=${price}
        WHERE id=${id}
        RETURNING *`;

        if(updatedProduct.count === 0){
            return res.status(404).json({success:false, message:"Product not found"});
        }

        console.log("Updated product",updatedProduct);
        res.status(200).json({success:true, data:updatedProduct[0]});
    }   
    catch(error){
        console.error("Error in updateProduct function: ", error)
        res.status(500).json({success:false, message:"Internal Server error"});
    }
};

export const deleteProduct = async(req, res) => {
    const {id} = req.params;

    try {
        const deletedProduct = await sql `DELETE FROM products WHERE id=${id}
        RETURNING *`;

        if(deletedProduct.count === 0){
            return res.status(404).json({success:false, message:"Product not found"});
        }

        console.log("Deleted product",deletedProduct);
        res.status(200).json({success:true, message:"Product deleted successfully"});
    }   
    catch(error){
        console.error("Error in deleteProduct function: ", error)
        res.status(500).json({success:false, message:"Internal Server error"});
    }   
};