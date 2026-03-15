import { Resolvers, UserRole } from 'src/types/graphql-types.js';
import {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
} from '@repositories/user.repository.js';
import { hashPassword, verifyPassword } from '@utils/password.js';
import { authService } from '@services/index.js';

const resolvers: Resolvers = {
  Query: {
    me: async (_root, _args, context) => {
      if (!context.user) return null;

      return await findUserById(context.prisma, context.user.id);
    },

    users: async (_root, _args, context) => {
      return await findAllUsers(context.prisma);
    },
  },
  Mutation: {
    signup: async (_root, args, context) => {
      const { email, name, password } = args.input;

      const existingUser = await findUserByEmail(context.prisma, email);

      if (existingUser) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await hashPassword(password);

      return await createUser(context.prisma, {
        email,
        name,
        password: hashedPassword,
      });
    },
    login: async (_root, args, context) => {
      const { email, password } = args.input;

      const user = await findUserByEmail(context.prisma, email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      authService.loginUser(context.res, {
        id: user.id,
        isAdmin: user.role === UserRole.Admin,
      });

      return user;
    },
    logout: async (_root, _args, context) => {
      authService.logoutUser(context.res);
      return true;
    },
  },
};

export default resolvers;
