import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { retrieveTicket, updateTicket } from '../api/ticketAPI';
import { retrieveUsers } from '../api/userAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import Auth from '../utils/auth';

const EditTicket = () => {
  const [ticket, setTicket] = useState<TicketData>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: 1,
    assignedUser: null
  });
  
  const [users, setUsers] = useState<UserData[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      if (!Auth.loggedIn()) {
        navigate('/login');
        return;
      }

      try {
        const [ticketData, usersData] = await Promise.all([
          retrieveTicket(parseInt(id!)),
          retrieveUsers()
        ]);
        
        setTicket({
          ...ticketData,
          assignedUserId: ticketData.assignedUserId ?? 1
        });
        setUsers(usersData);
      } catch (err) {
        console.error('Failed to load data:', err);
        navigate('/');
      }
    };

    loadData();
  }, [id, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (ticket.id) {
        await updateTicket(ticket.id, ticket);
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to update ticket:', err);
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicket(prev => ({
      ...prev,
      [name]: name === 'assignedUserId' ? parseInt(value) : value
    }));
  };

  const handleCancel = () => {
    navigate('/');
  };

  // Convert assignedUserId to string and ensure it's never undefined
  const assignedUserIdString = String(ticket.assignedUserId ?? 1);

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Edit Ticket</h1>
        <label>Ticket Name</label>
        <textarea
          name='name'
          value={ticket.name}
          onChange={handleTextAreaChange}
          required
        />
        <label>Status</label>
        <select
          name='status'
          value={ticket.status}
          onChange={handleChange}
        >
          <option value='Todo'>Todo</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
        <label>Description</label>
        <textarea
          name='description'
          value={ticket.description}
          onChange={handleTextAreaChange}
          required
        />
        <label>Assigned To</label>
        <select
          name='assignedUserId'
          value={assignedUserIdString}
          onChange={handleChange}
        >
          {users && users.length > 0 ? (
            users.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user.username}
              </option>
            ))
          ) : (
            <option value="1">Loading users...</option>
          )}
        </select>
        <div className='button-group'>
          <button type='submit'>Save Changes</button>
          <button type='button' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditTicket;