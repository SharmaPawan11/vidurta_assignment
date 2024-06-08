const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const start = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // const MyModel = mongoose.model('Test', new Schema({ name: String }));
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start()

module.exports = start

 