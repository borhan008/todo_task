const connect = require("mongoose").connect;
const dbConnect = async () => {
  try {
    const connection = await connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
