import { Router } from 'express';
import { getHotelWithRooms, getListOfHotels } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getListOfHotels).get('/:hotelId', getHotelWithRooms);

export { hotelsRouter };
