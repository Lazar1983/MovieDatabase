import { Router } from 'express';
import actions from './actions';

const { 
  list, 
  get, 
  getActorsBySeriesTitle, 
  getSerieByGenre,
  getSeriesByLanguage,
  getSeriesByNumberOfEpisodes,
  getSeriesRating
} = actions;
 
const seriesRouter = Router();

seriesRouter.get('/series', list);
seriesRouter.get('/series/:title', get);
seriesRouter.get('/series/cast/:title', getActorsBySeriesTitle);
seriesRouter.get('/series/genre/:genre_name', getSerieByGenre);
seriesRouter.get('/series/language/:language', getSeriesByLanguage);
seriesRouter.get('/series/episodes/:episodes/', getSeriesByNumberOfEpisodes);
seriesRouter.get('/series/rating/:rating', getSeriesRating);



export default seriesRouter;