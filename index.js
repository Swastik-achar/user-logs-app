const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/api/users", function(req, res) {
  console.log("hi");
  fs.readFile("./info.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(data);
      if (user) {
        res.json(users);
      } else {
        res.send({});
      }
    }
  });
});

app.use(function(req, res, next) {
  res.status("404").json({
    notice: "url not found"
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("listening on the port ", port);
});
