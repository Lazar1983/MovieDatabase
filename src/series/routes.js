import { Router } from 'express';
import actions from './actions';

const { 
  list, 
  get, 
  getActorsBySeriesTitle, 
  getSerieByGenre,
  getSeriesByLanguage,
  getSeriesByNumberOfEpisodes,
  getSeriesRating,
  getSeriesByReleaseDate,
  seriesByEpisodesCount
} = actions;
 
const seriesRouter = Router();

seriesRouter.get('/series', list);
seriesRouter.get('/series/:title', get);
seriesRouter.get('/seriesCast/:title', getActorsBySeriesTitle);
seriesRouter.get('/seriesGenre/:genre_name', getSerieByGenre);
seriesRouter.get('/seriesLanguage/:language', getSeriesByLanguage);
seriesRouter.get('/seriesEpisodes/:episodes/', getSeriesByNumberOfEpisodes);
seriesRouter.get('/seriesRating/:rating', getSeriesRating);
seriesRouter.get('/seriesByDate/:start_date/:end_date', getSeriesByReleaseDate);
seriesRouter.get('/seriesByNumberOfEpisodes/:start_count/:end_count', seriesByEpisodesCount);



export default seriesRouter;