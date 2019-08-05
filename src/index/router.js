import { Router } from 'express';
import admins from '../administrator/index';
import movies from '../movies/index';
import actors from '../actors/index';
import directors from '../directors/index';
import series from '../series/index';
import studios from '../studios/index';
import genres from '../genres/index';

const { routes } = admins;

const indexRouter = Router();

indexRouter.use(routes);
indexRouter.use(actors.routes);
indexRouter.use(movies.routes);
indexRouter.use(directors.routes);
indexRouter.use(series.routes);
indexRouter.use(studios.routes);
indexRouter.use(genres.routes);

export default indexRouter;