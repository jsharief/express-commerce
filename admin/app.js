const express = require("express");
const app = express();
const agentRoutes = require("./router/agent");
const bodyParser = require("body-parser");
const path = require("path");
const agentSchema = require("./util/dataSource");

const port = process.env.AGENT_PORT || 3000;

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

//console.log('path.join(__dirname)',path.join(__dirname,'public'));

app.use(express.static(path.join(__dirname, "public")));

app.use("/agent", agentRoutes);

app.get("/", (req, res, next) => {
  res.redirect("/agent");
});

agentSchema
  .dataSource()
  .then((connected) => {
    app.listen(port, () => {
      console.log("Server listerning @ Port #", port);
    });
  })
  .catch((exception) => {
    console.error("exception occurred in connecting datasource", exception);
  });
