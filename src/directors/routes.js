import { Router } from 'express';
import actions from './actions';

const { 
  list, 
  getDirectosByNames, 
  getDirectorsSeries, 
  getDirectorsMovies, 
  getDirectorsByBirth 
} = actions;
 
const directorsRouter = Router();

directorsRouter.get('/directors', list);
directorsRouter.get('/directors/:name', getDirectosByNames);
directorsRouter.get('/directors/series/:name', getDirectorsSeries);
directorsRouter.get('/directors/movies/:name', getDirectorsMovies);
directorsRouter.get('/directors/:start_date/:end_date', getDirectorsByBirth);


export default directorsRouter;