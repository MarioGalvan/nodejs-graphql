const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
const {buildContext} = require('graphql-passport');

const { loadFiles } = require('@graphql-tools/load-files')
const resolvers = require('./resolvers')


const useGraphQl = async (app) => {
  const server = new ApolloServer({
    typeDefs: await loadFiles('./src/**/*.graphql'),
    resolvers,
    context: ({req,res})=> buildContext({req,res}),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await server.start();
  server.applyMiddleware({ app });
};

module.exports = useGraphQl;
