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
moviesRouter.get('/movies/:name', getMovieByName);
moviesRouter.get('/movies/movieLanguage/:language', getMovieByLanguage);
moviesRouter.get('/movies/genre/:genre_name', getMovieByGenre);
moviesRouter.get('/movies/cast/:title', getMoviesCast);
moviesRouter.get('/movies/rating/:rating', getMoviesRating);
moviesRouter.get('/movies/length/:length1/:length2', getMoviesLength);
moviesRouter.get('/movies/release_date/:start_date/:end_date', getMoviesByReleaseDate);


export default moviesRouter;