const Airtable = require("airtable");
require("dotenv").config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const table = base("Orders");

// Fetch all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = [];
    await table.select().eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        orders.push({ id: record.id, ...record.fields });
      });
      fetchNextPage();
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

// Place a new order
exports.placeOrders = async (req, res) => {
    try {
      const { orders } = req.body; // Expecting an array of orders
  
      if (!Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({ message: "Invalid request. Provide an array of orders." });
      }
  
      // Prepare orders for batch insertion
      const records = orders.map(order => ({
        fields: {
          "Product ID": [order.productId], // Airtable expects an array for linked fields
          "Buyer Name": order.buyerName,
          "Order Status": order.status || "Pending" // Default to "Pending" if status is not provided
        }
      }));
  
      // Insert multiple orders into Airtable
      const createdOrders = await base(process.env.AIRTABLE_ORDERS_TABLE).create(records);
  
      // Format response
      const response = createdOrders.map(record => ({
        id: record.id,
        ...record.fields
      }));
  
      res.status(201).json({ message: "Orders placed successfully", orders: response });
    } catch (error) {
      res.status(500).json({ message: "Error placing orders", error });
    }
  };  

// Update order status
exports.updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      console.log("Received status:", status);
  
      // ✅ List of allowed statuses (MUST match exactly with Airtable)
      const allowedStatuses = ["Pending", "Shipped", "Delivered"];

      console.log("Airtable allowed statuses:", allowedStatuses);
  
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          error: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`,
        });
      }
  
      const updatedRecord = await table.update([
        {
          id,
          fields: { "Order Status": status }, // Ensure this exactly matches Airtable's field name
        },
      ]);
  
      res.json({ message: "Order updated successfully", order: updatedRecord[0].fields });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Error updating order" });
    }
  };  

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await table.destroy(id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting order" });
  }
};
