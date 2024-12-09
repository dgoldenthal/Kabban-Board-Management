import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';

const retrieveTickets = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tickets/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response');
    }

    return data;
  } catch (err) {
    console.error('Error from data retrieval:', err);
    return [];
  }
};

const retrieveTicket = async (id: number): Promise<TicketData> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tickets/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );

    const data = await response.json();

    if(!response.ok) {
      throw new Error('Could not fetch ticket');
    }
    return data;
  } catch (err) {
    console.error('Error retrieving ticket:', err);
    return Promise.reject('Could not fetch ticket');
  }
};

const createTicket = async (body: TicketData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tickets/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(body)
      }
    );
    const data = await response.json();

    if(!response.ok) {
      throw new Error('Could not create ticket');
    }

    return data;
  } catch (err) {
    console.error('Error creating ticket:', err);
    return Promise.reject('Could not create ticket');
  }
};

const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tickets/${ticketId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(body)
      }
    );
    const data = await response.json();

    if(!response.ok) {
      throw new Error('Could not update ticket');
    }

    return data;
  } catch (err) {
    console.error('Update failed:', err);
    return Promise.reject('Update failed');
  }
};

const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tickets/${ticketId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );

    if(!response.ok) {
      throw new Error('Could not delete ticket');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error deleting ticket:', err);
    return Promise.reject('Could not delete ticket');
  }
};

export { 
  createTicket, 
  deleteTicket, 
  retrieveTickets, 
  retrieveTicket, 
  updateTicket 
};