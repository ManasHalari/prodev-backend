import express from "express";
import Table from "../models/Table.js";
import Column from "../models/Column.js";
import Row from "../models/Row.js";

const router = express.Router();

router.post("/table", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Table name is required",
      });
    }

    const table = await Table.create({ name });

    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create table",
      error: error.message,
    });
  }
});


export default router;
