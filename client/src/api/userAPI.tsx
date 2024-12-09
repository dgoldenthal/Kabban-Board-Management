import Auth from '../utils/auth';

const retrieveUsers = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    console.log('Retrieved users:', data); // Debug log
    return data;

  } catch (err) { 
    console.error('Error fetching users:', err);
    return [];
  }
};

export { retrieveUsers };
