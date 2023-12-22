// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Generate a random grid with red and blue tiles
function generateGrid() {
  const colors = ["blue"];
  const grid = Array.from(
    {
      length: 2,
    },
    () =>
      Array.from(
        {
          length: 10,
        },
        () => colors[Math.floor(Math.random() * colors.length)]
      )
  );
  return grid;
}

let currentGrid = generateGrid();

app.get("/grid", (req, res) => {
  res.json({
    grid: currentGrid,
  });
});

// Update the /click endpoint
app.post("/click", (req, res) => {
  const { row, col } = req.body;

  if (currentGrid[row] && currentGrid[row][col]) {
    const clickedTile = currentGrid[row][col];
    let scoreChange = 0;

    if (clickedTile === "blue") {
      scoreChange = 10;
    }

    // Reset the clicked tile to its original color
    currentGrid[row][col] = clickedTile;

    res.json({
      scoreChange,
    });
  } else {
    console.log("Invalid click coordinates");
    res.status(400).json({
      error: "Invalid click coordinates",
    });
  }
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
