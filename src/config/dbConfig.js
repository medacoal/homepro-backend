import mongoose from "mongoose";

export const connectDb = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.error("Error connecting to DB:", err.message));
};
