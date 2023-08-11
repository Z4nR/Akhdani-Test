const express = require("express"),
  cors = require("cors"),
  route = require("./routes/api-route"),
  bodyParser = require("body-parser");
(app = express()), (db = require("./db"));

require("dotenv").config();

const env = process.env.NODE_ENV;
const port = process.env.PORT || 5500;

//Handling Console.log
if (env === "development") {
  console.log = function () {};
}

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Route
app.use("/v1", route);

//DB Connection
db();

app.listen(port, () => {
  console.log(`Litening on port ${port}...`);
});
