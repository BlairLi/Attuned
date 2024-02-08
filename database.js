class Database {
    
    constructor(){
        const mongoose = require('mongoose');
        // let uri = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}?authSource=admin`;
        let uri = `mongodb+srv://transvcornell:1ykLHkuFmFJBGyr9@cluster0.zvm3y.mongodb.net/`;
        if(process.env.ENVIRONMENT == 'production'){
            uri = process.env.PROD_URI;
        }
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
            // keepAlive:true,
            // server: { 
            //     socketOptions: {
            //         connectTimeoutMS: process.env.SESSION_EXPIRATION_LIMIT
            //     }
            // }
        });
        // console.log(mongoose.connection)
        return mongoose.connection;        
    }

}

module.exports = new Database();


