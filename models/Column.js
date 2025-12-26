import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    id: String,
    label: String,
  },
  { _id: false }
);

const columnSchema = new mongoose.Schema(
  {
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "text",
        "email",
        "date",
        "select",
        "multi-select",
        "file",
      ],
      required: true,
    },

    options: {
      type: [optionSchema],
      default: [],
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Column", columnSchema);
