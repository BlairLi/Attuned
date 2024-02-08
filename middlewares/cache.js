module.exports = (req, res, next) =>{
    const redis = require('../redisDb');
    var common = require('../common');

    const user  = req.decoded.user_id.toString();
    redis.get(user, (error, cachedData) => {
      if (error) console.log(error);
      if (cachedData != null) {
          console.log("from cache")
        res.status(common.http_status.HTTP_SUCCESS).json({ 
            status: common.http_status.SUCCESS, 
            code: common.http_status.HTTP_SUCCESS,
            message: "List",
            data : cachedData
        });
      } else {
        next();
      }
    });
  }