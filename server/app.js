const { ApolloServer, PubSub } = require('apollo-server');
const { getUserId } = require('./src/util');

/** Bring typeDefs and resolvers files */
const resolvers = require('./src/resolvers');
// const typeDefs = require('./src/typeDefs');

/** Nodejs Build in modules */
const fs = require('fs');
const path = require('path');

/** Add prisma client 
 * 
 * attach an instance of PrismaClient to the context when the GraphQLServer is being initialized
*/
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/** Implement Subscription with PubSub */
const pubSub = new PubSub();

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'src/schema.graphql'),
        'utf8'
    ),
    resolvers,
    // context: {
    //     prisma
    // }

    context: ({req})=> {

        return {
            ...req,
            prisma,
            pubSub,
            userId: req && req.headers.authorization ? getUserId(req) : null
        }
    }
});

server.listen().then(({port, url})=> {
    console.log(`server is running on port ${port}, url: ${url}`);
});