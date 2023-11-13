import { Ticket, TicketStatus } from '@prisma/client';
import { ticketsRepository } from '@/repositories/tickets-repository';
import { conflictError, invalidDataError, notFoundError } from '@/errors';
import { enrollmentRepository } from '@/repositories';
import { CreateTicketInfo } from '@/protocols';

async function createTicket(userId: number, ticketTypeId: number) {
  if (!ticketTypeId) throw invalidDataError('Não existe este ticket no banco!');

  const usersEnrollmentInfo = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!usersEnrollmentInfo) throw notFoundError();

  const ticketInfo: CreateTicketInfo = {
    enrollmentId: usersEnrollmentInfo.id,
    ticketTypeId,
    status: TicketStatus.RESERVED,
  };
  const enrollmentExists = await ticketsRepository.findTicketByEnrollmentId(usersEnrollmentInfo.id);

  if (enrollmentExists) throw conflictError('Já existe um ticket associado a este no banco!');

  const ticket = await ticketsRepository.createTicket(ticketInfo);

  return ticket;
}

async function getUserCurrentTicket(userId: number): Promise<Ticket> {
  const usersEnrollmentInfo = await ticketsRepository.findUserById(userId);

  if (usersEnrollmentInfo === null) throw notFoundError();

  const enrollmentId: number = usersEnrollmentInfo.id;
  const userCurrentTicket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId);

  if (userCurrentTicket === null) throw notFoundError();

  return userCurrentTicket;
}

export const ticketsService = { createTicket, getUserCurrentTicket };
