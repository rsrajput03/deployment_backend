const express = require("express");
require("dotenv").config()
const {userRouter} = require("./routes/user.routes")
const {noteRouter} = require("./routes/notes.routes")
const auth = require("./middleware/auth.middleware")
const { connection } = require("./db");
const cors = require("cors")

//creating app
const app = express();
app.use(express.json())
app.use(auth)
app.use("/users",userRouter)
app.use("/notes",noteRouter)
app.use(cors())



app.listen(process.env.port, async (req, res) => {
  await connection;
  try {
    console.log("Conneted to MongoDB");
  } catch (error) {
    console.log("Not able to connect to MongoDB");
    console.log(error);
  }
  console.log(`Server is running on ${process.env.port}`);
});
