const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_id: {
        type: String,
        required: true,
    },    
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
}); 

// Tạo model từ schema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;