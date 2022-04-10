const {links} = require('./dummy');

const resolvers = {
    Query: {
        info: () => "Welcome To Apollo",
        feed: () => links,
        findById: (parent, args) => {
            return links.find(item => item.id === args.id);
        }
    },
    Mutation: {
        newLink: (parent, args) => {
            const count = links.length;
            const link = {
                url: args.url, 
                description: args.description, 
                id: `link-${count+1}`
            };

            links.push(link);

            return link;
        },

        findOneAndUpdate: (parent, args) => {
            const updatedLink = {
                id: args.id,
                url: args.url, 
                description: args.description
            }
            return links.map(link => {
                return link.id != args.id ? link: updatedLink;
            });
        },

        findOneAndDelete: (parent, args) => {
            return links.filter(link => {
                return link.id != args.id
            });
        }
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url
    }
    
};

module.exports = resolvers;