require("dotenv").config();

const express = require("express");
const router = require("./routes");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());



const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/storage',express.static('storage'))



const DbConnect = require("./database");
const PORT = process.env.PORT;
DbConnect();
app.use(express.json({limit:'8mb'}));
app.use(router);

app.get("/", (req, res) => {
  res.send(process.env.DB_URL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
