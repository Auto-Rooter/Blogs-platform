import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from "../src/models/article.model";

dotenv.config();

const runMigration = async () => {
  await mongoose.connect(process.env.MONGODB_URI || "");

  const articles = await Article.find();

  for (const article of articles) {
    if (typeof article.title === "string" && typeof article.body === "string") {
      article.title = { en: article.title };
      article.body = { en: article.body };
      await article.save();
      console.log(`[*] Migrated article ${article._id}`);
    }
  }

  await mongoose.disconnect();
  console.log("[+] Migration complete");
};

runMigration().catch((err) => {
  console.error("[!] Migration error:", err);
  process.exit(1);
});
