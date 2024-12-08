// client/src/api/authAPI.tsx

import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export { login };