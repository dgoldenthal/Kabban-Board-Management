import { User } from '../models/user.ts';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('password', 10);
  
  await User.bulkCreate([
    { username: 'JollyGuru', password: hashedPassword },
    { username: 'SunnyScribe', password: hashedPassword },
    { username: 'RadiantComet', password: hashedPassword },
  ]);
};