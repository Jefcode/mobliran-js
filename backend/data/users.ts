import bcrypt from 'bcryptjs';
import { User } from './../../shared/types';

const users: User[] = [
  {
    username: 'AdminUser',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('jefcode', 10),
    isAdmin: true,
  },
  {
    username: 'john',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('jefcode', 10),
  },
  {
    username: 'jane',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('jefcode', 10),
  },
];

export default users;
