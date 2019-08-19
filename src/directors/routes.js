import { Router } from 'express';
import actions from './actions';

const { list, get, getDirectorsSeries, getDirectorsMovies, getDirectorsByBirth } = actions;
 
const directorsRouter = Router();

directorsRouter.get('/directors', list);
directorsRouter.get('/directors/:first_name', get);
directorsRouter.get('/directors/series/:first_name', getDirectorsSeries);
directorsRouter.get('/directors/movies/:first_name', getDirectorsMovies);
directorsRouter.get('/directors/:start_date/:end_date', getDirectorsByBirth);


export default directorsRouter;