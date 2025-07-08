import mongoose from "mongoose";

const foodEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    sodium: {
        type: Number,
        required: true,
    },
    fat: {
        type: Number,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Food = mongoose.model("Food", foodEntrySchema);
export default Food;
