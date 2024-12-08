import { UserData } from './UserData';

export interface TicketData {
  id: number;
  name: string;
  description: string;
  status: string;
  assignedUserId: number;
  assignedUser: UserData | null;
}