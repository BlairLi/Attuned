var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const models = require("./helpers/modelLoader");
var adminRouter = require("./routes/web");
var apiRouter = require("./routes/api");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDoc = require("./docs/api-docs.json");
const bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
const conRelease = require("./middlewares/connectionRelease");

var app = express();
app.use(cookieParser());
app.set("trust proxy", true);
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "1XCR3rsasa%RDHHHd",
    cookie: { maxAge: 86400000, secure: true },
  })
);
// app.use(function(req, res, next) {
//   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//   next();
// });
let sources = {
  'default-src': ['\'self\'','\'unsafe-inline\''],
  'script-src': ['\'self\'','\'unsafe-inline\''],
  'img-src': ['\'self\'', 'https:', 'data:'],
  'style-src': ['\'self\'', '\'unsafe-inline\'', 'fonts.googleapis.com code.ionicframework.com'],
  'style-src-elem': ['\'self\'', '\'unsafe-inline\'', 'fonts.googleapis.com code.ionicframework.com'],
  'font-src': ['\'self\'', 'fonts.gstatic.com code.ionicframework.com'],
  'connect-src': ['\'self\''],
}

let csp = Object.keys(sources).map(function(key){
  return `${key} ${sources[key].join(' ')};`
})


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, device_token, access_token,device_type, language"
  );
  res.header(
    "Access-Control-Expose-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, device_token, access_token,device_type, language"
  );

  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  //res.header('Content-Security-Policy', "default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com")
  res.header('Content-Security-Policy', csp.join(' '));
  next();
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// initialize swagger-jsdoc

app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload()); //for multipart form

//app.use("/admin", models.loadModels, adminRouter);
app.use('/privacy',function(req, res){
	res.render('privacy',{title:"Privacy"});
});
app.get('/test', (req, res)=>{
  res.header('Content-Security-Policy', "default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com")
  res.send({"test":"sucess"})
});
app.use("/", models.loadModels, adminRouter);
app.use("/api/v1", models.loadModels, apiRouter);

console.log(__dirname)
//app.use("/", express.static("docs"));
//app.use("/",express.static(__dirname,{index: '/homePage.html'}))
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(req.params);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
