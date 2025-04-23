import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "RESERVATIONS",
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.error(`Error connecting to the database: ${err.message}`);
      process.exit(1); // Exit process with failure
    });
};

