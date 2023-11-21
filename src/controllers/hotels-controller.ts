import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services';

export async function getListOfHotels(req: AuthenticatedRequest, res: Response) {
  const userId: number = req.userId;

  const listOfHotels = await hotelsService.getListOfHotels(userId);
  return res.status(httpStatus.OK).send(listOfHotels);
}

export async function getHotelWithRooms(req: AuthenticatedRequest, res: Response) {
  const userId: number = req.userId;
  const hotelId = Number(req.params.hotelId);

  const hotelWithRooms = await hotelsService.getHotelByUserId(userId, hotelId);

  return res.status(httpStatus.OK).send(hotelWithRooms);
}
