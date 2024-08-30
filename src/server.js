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
  const query = `SELECT * FROM rawWorkoutData`;
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

// API endpoint to fetch grouped data
app.get("/api/data/grouped", (req, res) => {
  const query = `
  SELECT 
    id,
    date,
    exercise, 
    MAX(CAST(((weight*0.861) / (1.0278 - 0.0278*reps)) AS INT)) AS max, 
    MIN(CAST(((weight*0.861) / (1.0278 - 0.0278*reps)) AS INT)) AS min
  FROM rawWorkoutData
  GROUP BY date, exercise`;
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

// API endpoint to fetch weights max line graph data
app.get("/api/data/line", (req, res) => {
  const query = `
    SELECT 
        id,
        '[' || GROUP_CONCAT('{"x": "' || date || '", "y": ' || max || '}', ', ') || ']' as data
    FROM 
        (
        SELECT 
          exercise as id,
          STRFTIME('%Y-%m-%d', 
          SUBSTR(date, 7, 4) || '-' || 
          SUBSTR(date, 4, 2) || '-' || 
          SUBSTR(date, 1, 2)
          ) AS date,
          max(cast(((weight*0.861) / (1.0278 - 0.0278*reps)) as int)) as max
        FROM rawWorkoutData
        GROUP BY date, exercise
        order BY date DESC, exercise ASC)
    GROUP BY id;`;
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

// API endpoint to add new row
app.use(express.json());
app.post("/api/data", (req, res) => {
  const { date, exercise, weight, reps } = req.body;
  const query = `INSERT INTO rawWorkoutData (date, exercise, weight, reps) VALUES (?, ?, ?, ?)`;
  db.run(query, [date, exercise, weight, reps], (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Row added successfully" });
  });
});

// API endpoint to delete row
app.delete("/api/data/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM rawWorkoutData WHERE id = ?`;
  db.run(query, id, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: `Row with id ${id} deleted successfully` });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
