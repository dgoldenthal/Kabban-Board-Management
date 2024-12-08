import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { retrieveUsers } from '../api/userAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: 1,
    assignedUser: null
  });
  const [errors, setErrors] = useState({
    name: '',
    description: ''
  });
  const [users, setUsers] = useState<UserData[]>([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to retrieve user info', err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', description: '' };

    if (!newTicket.name.trim()) {
      newErrors.name = 'Ticket name is required';
      isValid = false;
    }
    if (!newTicket.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createTicket(newTicket);
        navigate('/');
      } catch (err) {
        console.error('Failed to create ticket:', err);
      }
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>
        <label htmlFor='tName'>Ticket Name</label>
        {errors.name && <div className="error-message">{errors.name}</div>}
        <textarea
          id='tName'
          name='name'
          value={newTicket.name}
          onChange={handleTextAreaChange}
        />
        <label htmlFor='tStatus'>Status</label>
        <select
          name='status'
          id='tStatus'
          value={newTicket.status}
          onChange={handleChange}
        >
          <option value='Todo'>Todo</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
        <label htmlFor='tDescription'>Description</label>
        {errors.description && <div className="error-message">{errors.description}</div>}
        <textarea
          id='tDescription'
          name='description'
          value={newTicket.description}
          onChange={handleTextAreaChange}
        />
        <label htmlFor='tUserId'>Assigned To</label>
        <select
          name='assignedUserId'
          id='tUserId'
          value={newTicket.assignedUserId}
          onChange={handleChange}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <div className="button-group">
          <button type="submit">Create Ticket</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;