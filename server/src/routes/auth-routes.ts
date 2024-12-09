import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    console.log('Login attempt for username:', username); // Debug log

    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      console.log('User not found'); // Debug log
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Add debug logs
    console.log('Found user:', user.username);
    console.log('Stored password:', user.password);
    console.log('Attempted password:', password);

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword); // Debug log

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: '1h' }
    );

    console.log('Generated token:', token); // Debug log
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const router = Router();
router.post('/login', login);

export default router;