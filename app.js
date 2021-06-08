const app = require('express')();
const { graphqlHTTP } = require('express-graphql');
const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const PORT = 5000;

const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
];

let books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
];

//  GRAPHQL CUSTOM TYPES
const BookType = new GraphQLObjectType({
    name: 'Book_Type',
    description: 'This represent a Book Model',
    fields: ()=> ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString)},
        authorId: { type: GraphQLNonNull(GraphQLInt)}
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author_Type',
    description: 'Author Model',
    fields:  () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString)},
        books: { 
            type: GraphQLList(BookType),
            resolve: (author) => {
               return books.filter((book) => book.authorId === author.id)
            }
        }
    })
});

// CREATE GRAPHQL ROOT QUERY TYPE
const rootQueryType = new GraphQLObjectType({
    name: 'query',
    description: 'GRAPHQL Root Query Type',
    fields: () => ({
        book: { 
            type: BookType,
            description: 'A single book',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {return books.find((item) => item.id === args.id)}
        },
        books: {
            type: GraphQLList(BookType),
            description: 'List of all books',
            resolve: () => {return books}
        },
        authors: {
            type: GraphQLList(AuthorType),
            description: 'List of all Authors',
            resolve: () => authors
        }
    })
});

// CREATE GRAPHQL MUTATION TYPE
const rootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: { 
            type: BookType,
            description: 'Create New Book',
            args: {
                name: { type : GraphQLNonNull(GraphQLString)},
                authorId: { type : GraphQLNonNull(GraphQLInt)}
            },
            resolve : async (parent, args) => {
                let toSave = {id: books.length+1, name: args.name, authorId: args.authorId};

                books = [toSave, ...books];

                return toSave;
            }
        }
    })
})

// CREATE GRAPHQL SCHEMA
const schema = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
});

// GRAPHQL ROOT ENDPOINT
app.use('/graphql', graphqlHTTP({
     graphiql: true,
     schema
}));

app.listen(PORT, ()=> {
    console.log('The server is running on port, '+ PORT);
});