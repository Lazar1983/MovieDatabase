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

import indexRouter from './index/router';

const app = express();

const port = process.env.PORT || 3010;

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.get('/', (req, res) => res.send('Hello World!'))

// const publicRoutePaths = ['/sign-up', '/login'];
// app.use(jwt({ secret: 'aaaa' }).unless({ path: publicRoutePaths }));

app.use(indexRouter);

app.listen(port, () => {
  console.log(`API Server is listening on ${port}`);
});