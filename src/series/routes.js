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
seriesRouter.get('/getByTitle', get);
seriesRouter.get('/getActorsBySeriesTitle', getActorsBySeriesTitle);
seriesRouter.get('/getSerieByGenre', getSerieByGenre);
seriesRouter.get('/getSeriesByLanguage', getSeriesByLanguage);
seriesRouter.get('/getSeriesByNumberOfEpisodes', getSeriesByNumberOfEpisodes);
seriesRouter.get('/getSeriesRating', getSeriesRating);
seriesRouter.get('/getSeriesByReleaseDate', getSeriesByReleaseDate);
seriesRouter.get('/seriesByEpisodesCount', seriesByEpisodesCount);



export default seriesRouter;