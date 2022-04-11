const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Link
};

module.exports = resolvers;