import mongoose  from "mongoose";

export const connectDB = async () => {
  try {    

    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/notion_table", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true, 
    });

    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};
