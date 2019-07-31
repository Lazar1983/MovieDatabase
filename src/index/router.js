import { Router } from 'express';
import movies from '../movies/index';
import actors from '../actors/index';
import admins from '../administrator/index';

const { routes } = movies;


const indexRouter = Router();

indexRouter.use(routes);
indexRouter.use(actors.routes);
indexRouter.use(admins.routes);

export default indexRouter;