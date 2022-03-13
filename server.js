const express = require("express");
const path = require("path");

const app = express();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  const webpackMiddleware = require("webpack-dev-middleware");
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config");
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static("dist"));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.listen(3030, () => console.log("listening"));
