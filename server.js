import dotenv from "dotenv"
dotenv.config(); 

import app from "./app.js";

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
