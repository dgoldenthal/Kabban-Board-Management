import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

const sequelize = process.env.DATABASE_URL ? 
 // For deployment - with SSL
 new Sequelize(process.env.DATABASE_URL, {
   dialect: 'postgres',
   dialectOptions: {
     ssl: {
       require: true,
       rejectUnauthorized: false
     }
   },
   logging: false
 })
 : 
 // For local development
 new Sequelize(
   process.env.DB_NAME || 'kanban_db',
   process.env.DB_USER || 'postgres',
   process.env.DB_PASSWORD,
   {
     host: 'localhost',
     dialect: 'postgres',
     dialectOptions: {
       decimalNumbers: true,
     },
     logging: false
   }
 );

// Test database connection
const testConnection = async () => {
 try {
   await sequelize.authenticate();
   console.log('Database connection has been established successfully.');
 } catch (error) {
   console.error('Unable to connect to the database:', error);
 }
};

testConnection();

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

// Define associations
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

export { sequelize, User, Ticket };