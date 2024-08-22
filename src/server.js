const sqlite3 = require("sqlite3");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3001;
app.use(cors());

// connect to SQLite database
const db = new sqlite3.Database(process.env.PATH_TO_DB);

// API endpoint to fetch data
app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM rawWorkoutData;";
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: rows,
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
