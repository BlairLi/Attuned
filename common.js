module.exports = {
    http_status :{
        "SUCCESS":true,
        "ERROR":false,
        "HTTP_SUCCESS":200,
        "HTTP_UNAUTHORIZED":403,
        "HTTP_NOT_FOUND":401,
        "HTTP_BAD_REQUEST":400,
        "HTTP_ALREADY_EXISTS": 409,
        "INTERNAL_SERVER_ERROR":500
    },
    message: {
        "ADMIN":{
            "SAVE_QUESTIONNAIRE":{
                "UPDATED":"Question have been successfully updated",
                "NOT_EXISTS": "Questionnaire not exists for particular ID.",
                "CREATED": "Questionnaire successfully created.",
            },
            "DELETE_QUESTIONNAIRE":{
                "DELETED": "Questionnaire deleted successfully.",
                "NOT_EXISTS": "Questionnaire do not exist for particular ID."
            },
            "ACCESS_CODE":{
                "SUCCESS":"Access Code has been successfully added",
                "UPDATED":"Access Code has been successfully updated",
                "NOT_EXISTS":"Access Code with provided ID does not exists"
            },
            "DELETE_ACCESS_CODE":{
                "DELETED": "Access code deleted successfully.",
                "NOT_EXISTS": "Access code do not exist for particular ID."
            }
        },
        "USER_NOT_FOUND":"No such user found",
        "INTERNAL_SERVER_ERROR":"Something went wrong",
        "LOGIN":{
            "SUCCESS":"You have been logged in Successfully",
            "FAILED":"You have entered incorrect password",
            "VERIFY_EMAIL":"Please verify your email id",
            "DOES_NOT_EXIST":"Email does not exists.Sign Up to continue"
        },
        "SIGNUP":{
            "ALREADY_EXISTS":"User with this email already exists",
            "SUCCESS":"You have successfully Signed Up. Please verify the link sent on your email ID"
        },
        "SAVE_ANSWER":{
            "UPDATE":{
                "SUCCESS":"Answers Saved Successfully",
                "FAILED":"Answers cannot be saved"
            },
            "CREATE":{
                "SUCCESS":"Answers Successfully Added",
                "FAILED":"Answers cannot be saved"
            }
        },
        "VERIFY_OTP":{
            "SUCCESS":"You have been logged in Successfully",
            "FAILED":"One Time Password has been expired.Please retry",
            "WRONG_OTP":"You have entered incorrect otp.Please try again"
        },
        "FORGOT_PASSWORD":{
            "SUCCESS":"We have sent a link on your email ID to reset your password",
            "FAILED":"User does not exists"
        },
        "RESET_PASSWORD":{
            "SUCCESS":"Your password has been changed Successfully",
            "FAILED":"Reset link has been expired.Please retry",
            "WRONG_LINK":"This link is no longer valid.Please try again"
        },
        "UPLOAD":{
            "NO_FILE":"Please upload a file"
        },
        "VERIFY_EMAIL_TOKEN":{
            "SUCCESS":"Your email address is verified",
            "ERROR":"Invalid Token"
        },
        "VERIFY_ACCESS_CODE":{
            "SUCCESS":"Access code verified",
            "ERROR":"Invalid Access code"
        },
        "GET_QUESTION_ANSWER":{
            "SUCCESS":"List"
        }
    },
    constants:{
        "temp_base_path": "public/temp/",
        "image_type_allowed": ['.png', '.jpeg', '.bmp', '.jpg'],
        "LIVE_URL": "localhost:3001/public/temp/",
        "USER_ROLE": ["admin", "superadmin"],
        'GENDER':{
            'TRANS_MALE':1,
            'TRANS_FEMALE':2,
            'GENDER_NOT_CONFIRMING':3,
            'NON_BINARY':4
        },
        'RECORDS_PER_PAGE': 20
    }
}