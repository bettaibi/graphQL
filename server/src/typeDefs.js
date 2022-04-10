
const typeDefs = `
    type Query{
        info: String!
        feed: [Link!]!
        findById(id: ID!): Link!
    }
    type Mutation{
        newLink(url: String!, description: String!): Link!
        findOneAndUpdate(id: ID!, url: String!, description: String!): [Link!]!
        findOneAndDelete(id: ID!): [Link!]!
    }
    type Link{
        id: ID!
        description: String!
        url: String!
    }
    
`;

module.exports = typeDefs;