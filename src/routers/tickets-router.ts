import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { postTicket, getTicketTypes, getUserCurrentTicket } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getUserCurrentTicket)
  .post('/', postTicket);

export { ticketsRouter };
