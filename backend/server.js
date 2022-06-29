require("dotenv").config();

const express = require("express");
const router = require("./routes");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

const DbConnect = require("./database");
const PORT = process.env.PORT;
DbConnect();
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send(process.env.DB_URL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
