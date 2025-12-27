import express from "express";
import mongoose from "mongoose";
import Table from "../models/Table.js";
import Column from "../models/Column.js";
import Row from "../models/Row.js";

const router = express.Router();

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

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

router.get("/table", async (req, res) => {
  try {
    const tables = await Table.find().sort({ createdAt: -1 });
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tables",
    });
  }
});

router.get("/table/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table ID format'
      });
    }

    const table = await Table.findById(id);

    if (!table) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    res.json(table);
  } catch (error) {
    res.status(500).json({
      message: "Invalid table id",
    });
  }
});

router.post("/column", async (req, res) => {

  try{

  const { tableId , name , type , options , order} = req.body

    // Validate ObjectId
    if (!isValidObjectId(tableId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table ID format'
      });
    }

  const column = await Column.create({
    tableId:tableId,
    name: name,
    type: type,
    options:options || [],
    order: order || 0,
  });

  if(!column){
    res.status(400).json({
      message:"Column not created"
    })
  }

  res.json(column);

} catch (error) {
    res.status(500).json({
      message: "Failed to create column",
      error: error.message,
    });
  }
});

router.get("/column/table/:tableId", async (req, res) => {
  try{
    const { tableId } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(tableId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table ID format'
      });
    }
  const columns = await Column.find({
    tableId: tableId,
  }).sort({ order: 1 });

  res.json(columns);
}catch (error) {
    res.status(500).json({
      message: "Column does not found",
      error: error.message,
    });
  }
});

router.post("/row", async (req, res) => {

  try{

  const { tableId ,cells} = req.body

    // Validate ObjectId
    if (!isValidObjectId(tableId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table ID format'
      });
    }

  const row = await Row.create({
    tableId: tableId,
    cells: cells,
  });

  if(!row){
    res.status(400).json({
      message:"Row not created"
    })
  }

  res.json(row);

} catch (error) {
    res.status(500).json({
      message: "Failed to create row",
      error: error.message,
    });
  }
});

router.get("/row/table/:tableId", async (req, res) => {
  try{
    const { tableId } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(tableId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table ID format'
      });
    }
  const rows = await Row.find({
    tableId: tableId,
  });

  res.json(rows);
}catch (error) {
    res.status(500).json({
      message: "Column does not found",
      error: error.message,
    });
  }
});

export default router;
