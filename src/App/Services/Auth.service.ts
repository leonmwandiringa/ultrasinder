/**
 * @author Leon Mwandiringa
 * @uses define file uploads service
 * @return file url or returned error
 */


let jwt = require("jsonwebtoken");
import Config from "../../../Bootstrap/Config";
import { User } from "../../Models";
import { AuthToken, EmailService, CryptoService } from "./index";
let bcrypt = require("bcryptjs");

class AuthService{

    //init file upload
   public Init(exec: any, params: any = null): any{

        switch(exec){
            case "register":
                return AuthService.InsertUser(params);
            break;
            case "login":
                return AuthService.LoginUser(params);
            break;
            case "user":
                return AuthService.getUser(params);
            break;
            case "users":
                return AuthService.getAllUsers();
            break;
            case "delete":
                return AuthService.DeleteUser(params);
            break;
            case "reset":
                return AuthService.resetUserPass(params);
            break;
            case "updateuser":
                return AuthService.UpdateUser(params);
            break;
            case "updateuserbyadmin":
                return AuthService.UpdateUserByAdmin(params);
            break;
            case "applyreset":
                return AuthService.ApplyPasswordReset(params);
            break;
        }

   }

   //inserting user details for registerring user
   public static async InsertUser({name, email, password, type}: any){

        let userRegistered = await User.findOne({email: email});

        if(userRegistered){
            return {
                exists: true,
                created: false,
                error: null,
                user: null
            }
        }

        //create user 
        let encryptedPass = bcrypt.hashSync(password, 10);
        let newUser = new User({ name, email, password: encryptedPass, type});

        try{
            await newUser.save();

            let sendMessage = `Account for user ${name} was successfully created. you can now use the portal.`;
            //send email
            (new EmailService({email: email, subject: "Prism Awards account created", message: sendMessage})).send();

            let token: any = await AuthToken.Init(newUser);
            return {
                exists: false,
                created: true,
                error: null,
                user: newUser,
                logintoken: token
            }
        }catch(err){
            console.log(err);
            return {
                exists: false,
                created: false,
                error: err,
                user: null
            }

        }

   }

   //inserting user details for registerring user
   public static async LoginUser({name, email, password}: any){

        let userFound = await User.findOne({email: email});

        if(!userFound){
            return {
                exists: false,
                error: "no such user was found or password is incorect",
                user: null
            }
        }

        if(!bcrypt.compareSync(password.trim(), userFound.password)){
            return {
                exists: true,
                error: "no such user was found or password is incorect",
                user: null
            }
        }

        let token: any = await AuthToken.Init(userFound);

        return {
            exists: true,
            error: "user successfully logged in",
            user: {name: userFound.name, _id: userFound._id, email: userFound.email, token}
        }

    }



       //inserting ureset user password
   public static async resetUserPass({email}: any){

        let userFound = await User.findOne({email: email});

        if(!userFound){
            return {
                exists: false,
                error: "no such user was found",
                user: null
            }
        }

        let securityToken: any = await CryptoService.encrypt({email: email, _id: userFound._id, time: Date.now()});

        let sendMessage = `Account for user  has been approved for password reset please click on the link below to reset the account.
        
${Config.CLIENT.url}/reset-password.html?token=${securityToken}
        `;
            //send email
        (new EmailService({email: email, subject: "Prism Awards account reset", message: sendMessage})).send();
        
        return {
            exists: true,
            error: "reset sent, please check your email and finish reset password within 24hrs",
            user: {}
        }

    }

    //validate and password reset
   public static async ApplyPasswordReset(params: any){

        let securityToken;
        securityToken = await CryptoService.decrypt(params.token);
        let timeTaken = (((new Date()).getTime() - (new Date(securityToken.time)).getTime())/1000)/(60*60);

        console.log(securityToken);
        console.log(timeTaken);

        if(timeTaken > 24){
            return {
                exists: true,
                validated: false,
                error: null,
                notice: "Please rerequest for another token, token has expired",
                result: null
            }
        }

        let encryptedPass = bcrypt.hashSync(params.password, 10);
        let passChanged = await User.findOneAndUpdate({_id: securityToken._id}, {password: encryptedPass});

        if(passChanged){
            return {
                exists: true,
                error: null,
                result: true,
                notice: "Password was successfully reset You can now login"
            }
        }else{

            return {
                exists: true,
                error: true,
                result: false,
                notice: "and error happened updating your password"
            }

        }
 
   }

    //inserting user details for registerring user
   public static async getUser(user: any){
    
        let returnUser = await User.findOne({_id: user});

            return {
                exists: true,
                found: returnUser ? true : false,
                error: null,
                result: returnUser
            }


   }

          //inserting user details for registerring user
   public static async getAllUsers(){
    
        let returnUsers = await User.find({});

            return {
                exists: true,
                found: returnUsers ? true : false,
                error: null,
                result: returnUsers
            }


   }

    //deleting user
   public static async DeleteUser(user: any){
    
        let returnUsers = await User.findOneAndDelete({_id: user});

            return {
                exists: true,
                found: true,
                error: null,
                notice: "User was succesfully delete",
                result: returnUsers
            }

   }

   //update current user
   public static async UpdateUser(params: any){
    
        try{
            let user = await User.findOneAndUpdate({_id: params.id}, {name: params.name, number: params.number, address: params.address});
            return {
                exists: false,
                error: null,
                notice: 'User profile was successfully updated',
                result: user
            }

        }catch(error){
            console.log(error);
            return {
                exists: false,
                error: error,
                notice: 'an error occured updating',
                result: null
            }

        }

    }

    //update user by admin
   public static async UpdateUserByAdmin(params: any){

        if(params.type != "JUDGE"){
            params.assigned = [];
        }
        try{
            let userUpdated = await User.findOneAndUpdate({_id: params.user}, {type: params.type, active: params.active, assigned: params.assigned});

            return {
                exists: true,
                error: null,
                notice: 'User profile was successfully updated',
                result: userUpdated
            }

        }catch(err){
            return {
                exists: false,
                error: err,
                notice: 'an error occured updating user parameters',
                result: null
            }
        }

    }

}

export default new AuthService();