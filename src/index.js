import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
import unless from 'express-unless';
import jwt from 'express-jwt';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import es6Renderer from 'express-es6-template-engine';
import qs from 'querystring';
// import dotenv from 'dotenv';
// import createError from 'http-errors';
// import cookieParser from 'cookie-parser';

import indexRouter from './index/router';

const app = express();

const port = process.env.PORT || 3080;

// app.set("views", path.join(__dirname, "../views"));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

// app.use(express.static(__dirname + '../public'));

app.use(indexRouter);

// app.get('/', (req, res) => res.render('index', { title: 'Movie Database' }));

// app.use(function(req, res, next) {
//   next(createError(404));
// })

// app.use(function(err, req, res, next) {
//   //set locals, only providing errors in development
//   res.locals.message = err.message; 
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   //render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// const publicRoutePaths = ['/sign-up', '/login'];
// app.use(jwt({ secret: 'aaaa' }).unless({ path: publicRoutePaths }));



app.listen(port, () => {
  console.log(`API Server is listening on ${port}`);
});