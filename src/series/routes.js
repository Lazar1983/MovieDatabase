import { Router } from 'express';
import actions from './actions';

const { list, get } = actions;
 
const seriesRouter = Router();

seriesRouter.get('/series', list);
seriesRouter.get('/series/:title', get);


export default seriesRouter;