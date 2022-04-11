
async function feed(parent, args, context){
    return await context.prisma.link.findMany();
}

async function findById(parent, args, context) {
    try {
        const id = parseInt(args.id)
        const found = await context.prisma.link.findUnique({
            where: {id}
        });

        return found;
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    feed,
    findById
}