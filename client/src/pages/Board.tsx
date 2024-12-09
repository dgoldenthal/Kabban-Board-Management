import { useEffect, useState, useLayoutEffect } from 'react';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import { retrieveUsers } from '../api/userAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import FilterSort, { FilterOptions } from '../components/FilterSort';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import { ApiMessage } from '../interfaces/ApiMessage';
import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<TicketData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchData = async () => {
    try {
      const [ticketsData, usersData] = await Promise.all([
        retrieveTickets(),
        retrieveUsers()
      ]);
      console.log('Fetched users:', usersData); // Debug log
      setTickets(ticketsData);
      setFilteredTickets(ticketsData);
      setUsers(usersData);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError(true);
    }
  };

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...tickets];

    if (filters.status !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }

    if (filters.assignedUser !== 'all') {
      filtered = filtered.filter(ticket => ticket.assignedUser?.username === filters.assignedUser);
    }

    setFilteredTickets(filtered);
  };

  const handleSortChange = (sortOption: string) => {
    const sorted = [...filteredTickets].sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'assignee':
          return (a.assignedUser?.username || '').localeCompare(b.assignedUser?.username || '');
        default:
          return 0;
      }
    });
    setFilteredTickets(sorted);
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchData();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if(loginCheck) {
      fetchData();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className='login-notice'>
          <h1>Login to create & view tickets</h1>
        </div>  
      ) : (
        <div className='board'>
          <FilterSort 
            users={users}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          <div className='board-display'>
            {boardStates.map((status) => {
              const statusTickets = filteredTickets.filter(ticket => ticket.status === status);
              return (
                <Swimlane 
                  title={status} 
                  key={status} 
                  tickets={statusTickets} 
                  deleteTicket={deleteIndvTicket}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;