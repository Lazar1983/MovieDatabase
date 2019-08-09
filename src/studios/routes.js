import { Router } from 'express';
import actions from './actions';

const { list, get, getStudioMovies, getStudioWorth } = actions;
 
const studioRouter = Router();

studioRouter.get('/studio', list);
studioRouter.get('/studio/:name', get);
studioRouter.get('/studio/movies/:name', getStudioMovies);
studioRouter.get('/studio/worth/:worth', getStudioWorth);


export default studioRouter;