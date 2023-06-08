const { createConnection} = require("typeorm");

createConnection()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
