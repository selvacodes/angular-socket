import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as express from "express";
import * as morgan from "morgan";
import * as mongoose from "mongoose";
import * as path from "path";

import setRoutes from "./routes";

const app = express();
dotenv.load({ path: ".env" });

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.set("port", process.env.PORT || 3000);

app.use("/", express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let mongodbURI;
if (process.env.NODE_ENV === "test") {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan("dev"));
}

mongoose.Promise = global.Promise;
//const mongodb = mongoose.connect(mongodbURI);

//mongodb
//.then(db => {
//console.log("Connected to MongoDB");

//setRoutes(app);

//app.get("/*", function(req, res) {
//res.sendFile(path.join(__dirname, "../public/index.html"));
//});

//if (!module.parent) {
//app.listen(app.get("port"), () => {
//console.log("Angular Full Stack listening on port " + app.get("port"));
//});
//}
//})
//.catch(err => {
//console.error(err);
//
//});
io.set("origins", "http://localhost:4200");

console.log("IO");
io.on("connection", socket => {
  console.log("user connected");

  setInterval(() => {
    io.emit("progress", { type: "new-message", text: "10" });
  }, 5000);
});
http.listen(3000);
export { app };
