import { Router } from 'express';
import actions from './actions';

const { list, get, getActorsBySeriesTitle } = actions;
 
const seriesRouter = Router();

seriesRouter.get('/series', list);
seriesRouter.get('/series/:title', get);
seriesRouter.get('/series/cast/:title', getActorsBySeriesTitle);



export default seriesRouter;