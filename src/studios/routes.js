import { Router } from 'express';
import actions from './actions';

const { listStudioById, get, getStudioMovies, getStudioWorth } = actions;
 
const studioRouter = Router();

studioRouter.get('/studio/:id', listStudioById);
studioRouter.get('/studio/:name', get);
studioRouter.get('/studio/movies/:name', getStudioMovies);
studioRouter.get('/studio/worth/:worth1/:worth2', getStudioWorth);



export default studioRouter;