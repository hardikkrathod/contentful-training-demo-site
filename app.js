var express = require("express");
var exphbs = require("express-handlebars");
var contentful = require('contentful');

var app = express();
global.appServer = app;



const dotenv = require('dotenv');
dotenv.config();

const authenticatedRoutes = require("./src/public/js/authenticated-routes");
const global_vars = require('./src/public/js/global_variables');

const cfClient = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACEID,
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
  host: process.env.CONTENTFUL_HOST
});
// put instance of contentful client in global variables
global.cfClient = cfClient;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/dist/public"));

app.use((req, res, next) => {
  if (req.url.substr(-1) === "/" && req.url.length > 1) {
    res.redirect(301, req.url.slice(0, -1));
  } else {
    next();
  }
});

// app.use('/*', (req, res, next) => {
//   req.url = req.url.toLowerCase();
//   next();
// });

app.all('/*', (req, res, next) => {
  next();
  global_vars.getGlobalEntriesData();
});
// Load authenticated routes
app.use("/", authenticatedRoutes);

app.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  res.render("error");
  res.status(404);
});

app.listen(3000);
