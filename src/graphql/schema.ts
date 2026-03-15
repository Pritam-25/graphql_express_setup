import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { resolvers as userResolvers } from '@entities/user/index.js';

const typeDefs = loadSchemaSync('src/entities/**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: [userResolvers],
});

export default schema;
