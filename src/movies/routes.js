import { Router } from 'express';
import actions from './actions';

const { 
  list, 
  getMovieByName, 
  getMovieByLanguage, 
  getMovieByGenre,
  getMoviesCast,
  getMoviesRating
} = actions;
 
const moviesRouter = Router();

moviesRouter.get('/movies', list);
moviesRouter.get('/movies/:title', getMovieByName);
moviesRouter.get('/movies/movieLanguage/:language', getMovieByLanguage);
moviesRouter.get('/movies/genre/:genre_name', getMovieByGenre);
moviesRouter.get('/movies/cast/:title', getMoviesCast);
moviesRouter.get('/movies/rating/:rating', getMoviesRating);


export default moviesRouter;