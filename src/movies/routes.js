import { Router } from 'express';
import actions from './actions';

const { list, getMovieByName, getMovieByLanguage } = actions;
 
const moviesRouter = Router();

moviesRouter.get('/movies', list);
moviesRouter.get('/movies/:title', getMovieByName);
moviesRouter.get('/movies/:search/:language', getMovieByLanguage);


export default moviesRouter;