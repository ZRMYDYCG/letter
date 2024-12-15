import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  identity: {
    type: [Number],
    required: true,
  },
});

const routeModel = mongoose.model("routes", RouteSchema);

export default routeModel;
