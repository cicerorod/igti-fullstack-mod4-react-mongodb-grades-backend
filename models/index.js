import mongoose from "mongoose";
import gradeModels from "./gradeModels.js";

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grade = gradeModels(mongoose);

export { db };
