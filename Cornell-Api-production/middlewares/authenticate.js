
let isAuthenticated = (req, res, next) => {
    var jwt = require('jsonwebtoken');
    let access_token = req.body.token || req.query.token || req.headers['access_token'];
    let device_type = req.headers['device_type'];
    let mongoose = require("mongoose")
    if (access_token) {
        var secretKey = process.env.SECRET_KEY || 'thisisatemporarysecretkey'
        jwt.verify(access_token, secretKey, async(err, decoded) => {
        if (err) {
            //res.status(500).send('Token Invalid');
            console.log(err)
            res.status(413).send({
            status: false,
            message: 'Token Invalid',
            code: 413
            });
        } else {
          // console.log(decoded)
            req.decoded = decoded;
            // console.log(req.decoded._id)
            let userInfo = await req.models.user.findOne({ _id: mongoose.Types.ObjectId(req.decoded.user_id)})
            // console.log(userInfo)
            // where: {
            //     id: req.decoded.user_id,
            //     isDeleted: {
            //     $ne: req.constants.IS_DELETED
            //     }
            // },
            // include: [{
            //     model: req.models.device,
            //     where: {
            //     accessToken : access_token
            //     }
            // }]           
            // });

            userInfo = JSON.parse(JSON.stringify(userInfo, null, 4));

            if (userInfo == null) {
              return res.status(413).send({
                  status: false,
                  message: 'Your account is deleted by admin. Kindly contact the admin.',
                  code: 413
              });
            } else if(userInfo.accessToken == " " || userInfo.accessToken == undefined || userInfo.accessToken == "") {
              return res.status(413).send({
                status: false,
                message: 'Please login again to continue',
                code: 413
              });
            }
            else if(userInfo.isDeleted == true){
                return res.status(413).send({
                  status: false,
                  message: 'Account disabled.Kindly contact the admin',
                  code: 413
                });
            }else {
              req.is_mobile = false;
              if (req.headers.device_type && req.headers.app_version) {
                  req.is_mobile = true;
              }
            }
            //   if (device_type === 'web' && req.decoded.expiresIn) {
            //     let expTime = 108000; // 30 minutes
            //     let expiresIn = req.decoded.expiresIn;
            //     let currTime = new Date().getTime();
            //     // Match exp time with current time // 30 min 
            //     let timeDiff = Math.ceil((Math.abs(currTime - expiresIn) / 1000) % 60);
            //     if (timeDiff > 104000 && timeDiff < 108000) {

            //     } else {
            //       res.status(401).send({
            //         status: false,
            //         message: 'Token Invalid'
            //       });
            //     }
            //   }

            next();
        }
        })
    } else {
        res.status(403).send({
        status: false,
        message: 'Please send a token'
        });
        //res.send('Please send a token')
    }

}

let hasAccess = (req, res, next) => {
  let role = req.decoded.role;

  // Check user role is admin or superadmin
  if (role === req.constants.USER_TYPE.superadmin || role === req.constants.USER_TYPE.admin) {
    next();
  } else {
    return res.status(req.constants.HTTP_FORBIDDEN).send({
      code: req.constants.HTTP_FORBIDDEN,
      status: req.constants.ERROR,
      message: 'Un-authorized access'
    });
  }

}
let isAdminAuthenticated = (req, res, next) => {
  let userData = req.session.user;

  // Check user role is admin or superadmin
  if (userData != undefined) {
    console.log("in middleware",userData)
    next();
  } else {
    res.redirect('/admin')
    //  res.redirect('/', {
    //     title: 'Login Page',
    //     error: false,
    //     message: ""
    //     // data: finalCountryData,
    //     // errorMessage:"",
    //     // domainUrl : "https://" ,
    //     // ampUrl: ampUrl,
    //     // searchQuery: searchQuery
    // }
    // );
  }

}
let hasAccessForProvider = (req, res, next) => {
  let role = req.decoded.role;
  // Check user role is admin or superadmin or provider
  if (role === req.constants.USER_TYPE.superadmin || role === req.constants.USER_TYPE.admin || role === req.constants.USER_TYPE.provider) {
    next();
  } else {
    return res.status(req.constants.HTTP_FORBIDDEN).send({
      code: req.constants.HTTP_FORBIDDEN,
      status: req.constants.ERROR,
      message: 'Un-authorized access'
    });
  }
}

module.exports = {
  isAuthenticated: isAuthenticated,
  hasAccess: hasAccess,
  isAdminAuthenticated:isAdminAuthenticated,
  hasAccessForProvider: hasAccessForProvider
}