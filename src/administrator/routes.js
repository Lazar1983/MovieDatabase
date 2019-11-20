import { Router } from 'express';
import actions from './actions';

const { 
  list,
  getAdminById, 
  createAdmin, 
  login, 
  createMovie, 
  createActor, 
  createDirector, 
  createSerie, 
  createStudio, 
  createGenre,
  updateAdmin,
  updateMovieRating,
  updateSerieRating,
  deleteAdmin,
  updateStudioWorth 
} = actions;

const adminRouter = Router();

adminRouter.get('/admin', list);
adminRouter.get('/admin/:id', getAdminById);
adminRouter.post('/sign-up', createAdmin);
adminRouter.post('/login', login);
adminRouter.post('/admin/:id/movies/', createMovie);
adminRouter.post('/admin/:id/actors/', createActor);
adminRouter.post('/admin/:id/director/', createDirector);
adminRouter.post('/admin/:id/serie/', createSerie);
adminRouter.post('/admin/:id/studio/', createStudio);
adminRouter.post('/admin/:id/genre/', createGenre);
adminRouter.put('/admin/:id/rating/', updateMovieRating);
adminRouter.put('/admin/:id', updateAdmin);
adminRouter.put('/admin/:id/movies/:id', updateMovieRating);
adminRouter.put('/admin/:id/series/:id', updateSerieRating);
adminRouter.put('/admin/:id/studio/:id', updateStudioWorth);
adminRouter.delete('/admin/:id', deleteAdmin);


export default adminRouter;