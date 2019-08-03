import { Router } from 'express';
import actions from './actions';

const { list, create, createMovie, login } = actions;

const adminRouter = Router();

adminRouter.get('/admin', list);
adminRouter.post('/sign-up', create);
adminRouter.post('/admin/:id/movies', createMovie);
adminRouter.post('/login', login);


export default adminRouter;