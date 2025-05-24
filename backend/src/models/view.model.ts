import mongoose from "mongoose";

const ViewSchema = new mongoose.Schema({
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
    fingerprint: { type: String, required: false },
    country: { type: String, required: false },
    ip: { type: String, required: false },
    viewedAt: { type: Date, default: Date.now },
}, {timestamps: true});

export default mongoose.model("View", ViewSchema);