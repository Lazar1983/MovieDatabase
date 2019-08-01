import { Router } from 'express';
import actions from './actions';

const { list } = actions;
 
const seriesRouter = Router();

seriesRouter.get('/series', list);


export default seriesRouter;