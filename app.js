const http = require('http');

require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var artistRouter = require('./routes/artist')
var contactRouter = require('./routes/contact')
var authRouter = require('./routes/auth')
var cientificoRouter = require('./routes/cientifico')
var preguntasRouter = require('./routes/preguntas')
var aboutUsRouter = require("./routes/aboutUs")
var tasacionRouter = require("./routes/tasacionDelValor")
var tarifasRouter = require("./routes/tarifas")
var venderRouter = require("./routes/vender")
var noticiasRouter = require("./routes/noticias")
var testimoniosRouter = require("./routes/testimonios")
var paymentRouter = require("./routes/stripeRouter")
var sitemap = require("./controllers/sitemap")


var app = express();
//console.log("here");
app.set('env',process.env.isDevel ? 'development' : 'prod'); 

//cache control
let setCache = function (req, res, next) {
	const period = 60 * 60 * 24 * 2; //CFG: en segundos 

	if (req.method == 'GET') { //A: solo para GET
    res.set('Cache-control', `public, max-age=${period}`)
  } else {
    res.set('Cache-control', `no-store`)
  }

	next(); //A: seguir procesando
}
app.use(setCache)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//DBG: app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.all(/.*/, function(req, res, next) { //A: redirigir a www
	var desired_host= process.env.HOST;
	var desired_proto= process.env.PROTO || 'https';
  var host = req.header("host");
  console.log('aaa');
	//DBG: console.log('HOST req vs desired',host, desired_host, desired_proto, req.originalUrl); 
  if (process.env.HOST=="" || host==desired_host) { next(); } 
	else { res.redirect(301, desired_proto+'://'+desired_host+req.originalUrl); }
});
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/robots.txt', function (req, res, next) {
	res.type('text/plain')
	res.send("User-agent: *\nAllow: /\n\nSitemap: https://www.expertosenarte.org/sitemap.xml\n\n");
});
app.get('/sitemap.xml', sitemap);

app.use('/', indexRouter)
app.use('/artistas', artistRouter)
app.use("/autenticacion", authRouter)
app.use("/cientifico-y-forense", cientificoRouter)
app.use("/preguntas-frecuentes", preguntasRouter)
app.use("/sobre-nosotros", aboutUsRouter)
app.use("/tasacion-del-valor", tasacionRouter)
app.use("/vender", venderRouter)
app.use("/testimonios", testimoniosRouter)
app.use("/noticias", noticiasRouter)
app.use("/payment", paymentRouter)
app.use("/contacto", contactRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

console.log("the env:");
console.log(app.get('env'));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { baseURL: ""});
});

app.listen(3000);
/*
module.exports = app;
//with its own server
const hostname = '127.0.0.1';
const port = 53540;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World Again from Node.js\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
