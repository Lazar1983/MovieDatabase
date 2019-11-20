import { Router } from 'express';
import actions from './actions';

const { listStudios, get, getStudioMovies, getStudioWorth } = actions;
 
const studioRouter = Router();

studioRouter.get('/studio', listStudios);
studioRouter.get('/getStudioByName', get);
studioRouter.get('/getStudioMovies', getStudioMovies);
studioRouter.get('/getStudioWorth', getStudioWorth);



export default studioRouter;