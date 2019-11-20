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
directorsRouter.get('/getDirectosByNames', getDirectosByNames);
directorsRouter.get('/getDirectorsSeries', getDirectorsSeries);
directorsRouter.get('/getDirectorsMovies', getDirectorsMovies);
directorsRouter.get('/getDirectorsByBirth', getDirectorsByBirth);


export default directorsRouter;