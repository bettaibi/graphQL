const app = require('express')();
const { graphqlHTTP } = require('express-graphql');
const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const PORT = 5000;

// CREATE GRAPHQL SCHEMA
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Hello_world',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello world'
            }
        })
    })
});

// GRAPHQL ROOT ENDPOINT
app.use('/graphql', graphqlHTTP({
     graphiql: true,
     schema
}));

app.listen(PORT, ()=> {
    console.log('The server is running on port, '+ PORT);
});