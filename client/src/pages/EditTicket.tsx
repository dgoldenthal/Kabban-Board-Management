import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { retrieveTicket, updateTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';

const EditTicket = () => {
  const [ticket, setTicket] = useState<TicketData | undefined>();
  const [errors, setErrors] = useState({
    name: '',
    description: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTicket(parseInt(id));
    }
  }, [id]);

  const fetchTicket = async (ticketId: number) => {
    try {
      const data = await retrieveTicket(ticketId);
      setTicket(data);
    } catch (err) {
      console.error('Failed to retrieve ticket:', err);
      navigate('/');
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', description: '' };

    if (!ticket?.name?.trim()) {
      newErrors.name = 'Ticket name is required';
      isValid = false;
    }
    if (!ticket?.description?.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm() && ticket && ticket.id) {
      try {
        await updateTicket(ticket.id, ticket);
        navigate('/');
      } catch (err) {
        console.error('Failed to update ticket:', err);
      }
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket(prev => prev ? ({ ...prev, [name]: value }) : undefined);
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicket(prev => prev ? ({ ...prev, [name]: value }) : undefined);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container">
      {ticket ? (
        <form className="form" onSubmit={handleSubmit}>
          <h1>Edit Ticket</h1>
          <label htmlFor="tName">Ticket Name</label>
          {errors.name && <div className="error-message">{errors.name}</div>}
          <textarea
            id="tName"
            name="name"
            value={ticket.name || ''}
            onChange={handleTextAreaChange}
          />
          <label htmlFor="tStatus">Status</label>
          <select
            name="status"
            id="tStatus"
            value={ticket.status || ''}
            onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <label htmlFor="tDescription">Description</label>
          {errors.description && <div className="error-message">{errors.description}</div>}
          <textarea
            id="tDescription"
            name="description"
            value={ticket.description || ''}
            onChange={handleTextAreaChange}
          />
          <div className="button-group">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditTicket;