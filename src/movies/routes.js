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
moviesRouter.get('/movieByLanguage/:language', getMovieByLanguage);
moviesRouter.get('/moviesBygenre/:genre_name', getMovieByGenre);
moviesRouter.get('/moviesBycast/:title', getMoviesCast);
moviesRouter.get('/moviesByrating/:rating', getMoviesRating);
moviesRouter.get('/moviesBylength/:length1/:length2', getMoviesLength);
moviesRouter.get('/moviesByRelease_date/:start_date/:end_date', getMoviesByReleaseDate);


export default moviesRouter;