import { Router } from 'express';
import actions from './actions';

const { list, create, createMovie } = actions;

const adminRouter = Router();

adminRouter.get('/admin', list);
adminRouter.post('/admin', create);
adminRouter.post('/admin/:id/movies', createMovie);

export default adminRouter;