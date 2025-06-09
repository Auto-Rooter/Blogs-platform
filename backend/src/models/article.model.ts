import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        es: { type: String },
        de: { type: String }
        },
    body: {
        en: { type: String, required: true },
        es: { type: String },
        de: { type: String }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    timeSpent: {
        type: Number,
        default: 0,
    },
    ratings: {
        type: [Number],
        default: [],
        validate: {
          validator: (arr: number[]) => Array.isArray(arr),
          message: "Ratings must be an array",
        }
    },
    ratedFingerprints: {
        type: [String],
        default: []
    }
},
{timestamps: true} 
);

export default mongoose.model("Article", ArticleSchema);