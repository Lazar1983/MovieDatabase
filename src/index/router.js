import { Router } from 'express';
import movies from '../movies/index';

const { routes } = movies;
const indexRouter = Router();

indexRouter.use(routes);

export default indexRouter;