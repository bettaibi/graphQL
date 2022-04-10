const {ApolloServer} = require('apollo-server');
const resolvers = require('./src/resolvers');
const typeDefs = require('./src/typeDefs');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({port, url})=> {
    console.log(`server is running on port ${port}, url: ${url}`);
});