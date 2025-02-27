// Loads the configuration from config.env to process.env
require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
// get MongoDB driver connection
const dbo = require("./db/conn");

const PORT = process.env.PORT || 5000;
const app = express();

app.use("/static", express.static("public"));
app.use(cors());
app.use(express.json());
app.use(require("./routes/routes"));


// Global error handling
app.use(function (req, res) {
  console.error(req.stack);
  res.status(500).send("Something broke!");
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
