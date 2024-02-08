dbRelease = (req, res, next) => {
    let db = req.database;
    console.log("here")
    db.connection.close()
    //res.status(res.locals.status).json(res.locals.data);
    next();
  }
  module.exports = dbRelease;