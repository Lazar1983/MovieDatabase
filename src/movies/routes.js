import { Router } from 'express';
import actions from './actions';

const { 
  list, 
  getMovieByName, 
  getMovieByLanguage, 
  getMovieByGenre,
  getMoviesCast,
  getMoviesRating,
  getMoviesLength,
  getMoviesByReleaseDate
} = actions;
 
const moviesRouter = Router();

moviesRouter.get('/movies', list);
moviesRouter.get('/getMovieByName', getMovieByName);
moviesRouter.get('/getMovieByLanguage', getMovieByLanguage);
moviesRouter.get('/getMovieByGenre', getMovieByGenre);
moviesRouter.get('/getMoviesCast', getMoviesCast);
moviesRouter.get('/getMoviesRating', getMoviesRating);
moviesRouter.get('/getMoviesLength', getMoviesLength);
moviesRouter.get('/getMoviesByReleaseDate', getMoviesByReleaseDate);


export default moviesRouter;