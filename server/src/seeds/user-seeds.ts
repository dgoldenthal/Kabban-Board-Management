import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash('password', 10);
    console.log('Created hashed password:', hashedPassword);

    await User.bulkCreate([
      { 
        username: 'JollyGuru',
        password: hashedPassword
      },

      { username: 'SunnyScribe', 
        password: hashedPassword 
      },

      { username: 'RadiantComet', 
        password: hashedPassword 
      }
    ]);

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};