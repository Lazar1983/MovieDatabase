import { Router } from 'express';
import actions from './actions';

const { list, create } = actions;
 
const moviesRouter = Router();

moviesRouter.get('/movies', list);
moviesRouter.post('/movies', create);


export default moviesRouter;