import { Enrollment, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicketInfo } from '@/protocols';

async function createTicket(ticketInfo: CreateTicketInfo): Promise<Ticket> {
  return prisma.ticket.create({
    data: ticketInfo,
    include: {
      TicketType: true,
    },
  });
}

async function findUserById(userId: number): Promise<Enrollment> {
  return prisma.enrollment.findUnique({
    where: { userId },
  });
}

async function findTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: { TicketType: true },
  });
}

export const ticketsRepository = { createTicket, findUserById, findTicketTypes, findTicketByEnrollmentId };
