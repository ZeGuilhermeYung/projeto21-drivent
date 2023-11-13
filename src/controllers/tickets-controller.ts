import { AuthenticatedRequest } from '@/middlewares';
import { ticketsRepository } from '@/repositories/tickets-repository';
import { ticketsService } from '@/services/tickets-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.body;
  const { ticketTypeId } = req.body;

  const ticket = await ticketsService.createTicket(userId, ticketTypeId);

  res.status(httpStatus.CREATED).send(ticket);
};

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketsRepository.findTicketTypes();

  res.status(httpStatus.OK).send(ticketTypes);
};

export async function getUserCurrentTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req.body;

    const userCurrentTicket = await ticketsService.getUserCurrentTicket(userId);

    res.status(httpStatus.OK).send(userCurrentTicket);
};