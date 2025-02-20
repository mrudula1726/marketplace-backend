const base = require("../config/airtableConfig");

//Get all products
exports.getProducts = async(req, res) => {
    try{
        const products = [];
        await base(process.env.AIRTABLE_PRODUCTS_TABLE)
        .select({ view: "Grid view" })
        .eachPage((records, fetchNextPage)=>{
            records.forEach((record) =>{
                products.push({ id: record.id, ...record.fields });
            });
            fetchNextPage();
        })
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

//Add a new product
exports.addProducts = async (req, res) => {
    try {
        const products = req.body.products; // Expecting an array of product objects

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Invalid request. Provide an array of products." });
        }

        // Prepare records for Airtable batch insert
        const records = products.map(product => ({
            fields: {
                "Product Name": product.name,
                "Description": product.description,
                "Price": product.price,
                "Image URL": product.imageURL
            }
        }));

        // Insert multiple products into Airtable
        const createdProducts = await base(process.env.AIRTABLE_PRODUCTS_TABLE).create(records);

        // Format response
        const response = createdProducts.map(record => ({
            id: record.id,
            ...record.fields
        }));

        res.status(201).json({ message: "Products added successfully", products: response });
    } catch (error) {
        res.status(500).json({ message: "Error adding products", error });
    }
};


//Update an existing product
exports.updateProduct = async(req, res)=>{
    try{
        const { id } = req.params;
        const { name, description, price, imageURL } = req.body;

        const updatedProduct = await base(process.env.AIRTABLE_PRODUCTS_TABLE).update(id,{
            "Product Name" : name,
            "Description" : description,
            "Price" : price,
            "Image URL" : imageURL
        });
        res.status(200).json({ id: updatedProduct.id, ...updatedProduct.fields });

    }catch(error){
        res.status(500).json({ message: "Error updating product", error });
    }
}

//Delete a product
exports.deleteProduct = async(req, res)=>{
    try{
        const { id } = req.params;
        await base(process.env.AIRTABLE_PRODUCTS_TABLE).destroy(id);

        res.status(200).json({ message: "Product deleted successfully" })

    }catch(error){
        res.status(500).json({ message: "Error deleting product", error });
    }
}