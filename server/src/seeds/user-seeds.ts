import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash('password', 10);
    console.log('Created hashed password:', hashedPassword); // Debug log

    await User.bulkCreate([
      { 
        username: 'RadiantComet',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};