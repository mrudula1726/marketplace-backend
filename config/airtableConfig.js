const Airtable = require("airtable");
require("dotenv").config();

//Initialize Airtable Connection
const base = new Airtable({ apiKey : process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
);

//export the airtable base for use in other files
module.exports = base;