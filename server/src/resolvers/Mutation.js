const bcrypt = require('bcryptjs');
const {APP_SECRET} = require('../util');
const jwt = require('jsonwebtoken');

async function newLink(parent, args, context){
    try{
        const link = {
            url: args.url, 
            description: args.description,
            postedBy: context.userId
        };

        const saved = await context.prisma.link.create({
            data: link
        });

        return saved;
    }
    catch(err){
        throw err;
    }
}

async function findOneAndUpdate (parent, args, context) {
   try{
    const id = parseInt(args.id)
    const updatedLink = {
       ...args
    }

    const updated = await context.prisma.link.update({
        where: {id},
        data : updatedLink
    })

    return updated;

   }
   catch(err){
    throw err;
   }
}

async function findOneAndDelete (parent, args, context) {
    try{
        const id = parseInt(args.id)
        const deletedLink = await context.prisma.link.delete({
            where: {id}
        });
    }
    catch(err){
        throw err;
    }
}

async function register (parent, {name, email, password}, context){
    try{
        const found = await context.prisma.user.findUnique({
            where: {email}
        });

        if(found){
             throw new Error("User is Already Exist");
        }

        const cryptedPassword = await bcrypt.hash(password, 10);

        const user = await context.prisma.user.create({
            data: {
                email,
                name, 
                password: cryptedPassword
            }
        });

        const token = jwt.sign({userId: user.id}, APP_SECRET);

        return {
            token,
            user
        }

    }
    catch(err){
        throw err;
    }
}

async function login(parent, {email, password}, {prisma}){
    try{
        const found = await prisma.user.findUnique({
            where: {email}
        }); 

        if(!found){
            throw new Error("No such Account");
        }

        const isMatch = await bcrypt.compare(password, found.password);

        if(!isMatch){
            throw new Error("Password Not Match!");
        }

        const token = jwt.sign({ userId: found.id }, APP_SECRET);

        return { token, user: found};

    }
    catch(err){
        throw err;
    }
}

module.exports = {
    findOneAndDelete,
    findOneAndUpdate,
    newLink,
    register,
    login
}