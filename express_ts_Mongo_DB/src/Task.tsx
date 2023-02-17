import mongoose from "mongoose"
const { Schema } = mongoose
const taskSchema = new Schema({
  title: String, // String is shorthand for {type: String}
});

export default mongoose.model("Task", taskSchema);
