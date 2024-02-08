class redisDatabase {
    
    constructor(){
        const redis = require("redis");
        const REDIS_PORT = process.env.REDIS_PORT || 6379;
        
        return redis.createClient(REDIS_PORT);        
    }

}

module.exports = new redisDatabase();


