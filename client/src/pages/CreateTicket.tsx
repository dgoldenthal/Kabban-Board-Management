import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { retrieveUsers } from '../api/userAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import Auth from '../utils/auth';

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData>({
    id: null,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: null,
    assignedUser: null
  });

  const [users, setUsers] = useState<UserData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      if (!Auth.loggedIn()) {
        navigate('/login');
        return;
      }
      try {
        const fetchedUsers = await retrieveUsers();
        console.log('Fetched users in CreateTicket:', fetchedUsers);

        if (fetchedUsers && fetchedUsers.length > 0) {
          setUsers(fetchedUsers);
          setNewTicket(prev => ({
            ...prev,
            assignedUserId: fetchedUsers[0].id || null
          }));
        }
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };
    loadUsers();
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createTicket(newTicket);
      navigate('/');
    } catch (err) {
      console.error('Failed to create ticket:', err);
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({
      ...prev,
      [name]: name === 'assignedUserId' ? (value ? parseInt(value) : null) : value
    }));
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>
        <label>Ticket Name</label>
        <textarea
          name='name'
          value={newTicket.name}
          onChange={handleTextAreaChange}
          required
        />
        <label>Status</label>
        <select
          name='status'
          value={newTicket.status}
          onChange={handleChange}
        >
          <option value='Todo'>Todo</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
        <label>Description</label>
        <textarea
          name='description'
          value={newTicket.description}
          onChange={handleTextAreaChange}
          required
        />
        <label>Assigned To</label>
        <select
          name='assignedUserId'
          value={newTicket.assignedUserId !== null ? String(newTicket.assignedUserId) : ''}
          onChange={handleChange}
        >
          {users && users.length > 0 ? (
            users.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user.username}
              </option>
            ))
          ) : (
            <option value="">Loading users...</option>
          )}
        </select>
        <div className='button-group'>
          <button type='submit'>Create Ticket</button>
          <button type='button' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;