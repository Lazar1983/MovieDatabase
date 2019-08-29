import { Router } from 'express';
import actions from './actions';

const { listStudios, get, getStudioMovies, getStudioWorth } = actions;
 
const studioRouter = Router();

studioRouter.get('/studio', listStudios);
studioRouter.get('/studio/:name', get);
studioRouter.get('/studio/movies/:name', getStudioMovies);
studioRouter.get('/studio/worth/:worth1/:worth2', getStudioWorth);



export default studioRouter;