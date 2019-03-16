/**
 * @author Leon Mwandiringa
 * @uses define Auth services functionalities
 * @return object, token, error accordingly
 */

import Config from "../../Config";
import { User } from "../Models";
import { AuthToken, EmailService, CryptoService } from "./index";
import ServiceResponse from "../Interfaces/ServiceResponse.interface";
let bcrypt = require("bcryptjs");

class AuthService{

   /**
    * @uses creating and validating user
    * @return [success] user details and token [error] error object
    * @params body params
    */
   public static async CreateUser({name, email, password, type}: any){

        let userRegistered = await User.findOne({email: email});

        if(userRegistered){
            return <ServiceResponse>{
                notice: "an error occured finding the user",
                error: null,
                result: null
            }
        }

        //create user 
        let encryptedPass = bcrypt.hashSync(password, 10);
        let newUser = new User({ name, email, password: encryptedPass, type});

        try{
            await newUser.save();

            let sendMessage = `Account for user ${name} was successfully created. you can now use the portal.`;
            //send email
            (new EmailService({email, subject: "Prism Awards account created", message: sendMessage})).send();

            let token: any = await AuthToken.Init(newUser);

            newUser.password = null;
            return <ServiceResponse>{
                notice: "User was successfully created",
                error: null,
                result: {user: newUser, token: token},
            }

        }catch(err){

            return <ServiceResponse>{
                notice: "An error occured Creating user",
                error: err,
                result: null
            }

        }

   }

   /**
    * @uses Logging and validating user
    * @return [success] user details and token [error] error object
    * @params body params
    */
   public static async LoginUser({email, password}: any){

        let userFound = await User.findOne({email: email});

        if(!userFound){
            return <ServiceResponse>{
                notice: "no such user was found or password is incorect",
                error: "no such user was found or password is incorect",
                result: null
            }
        }

        if(!bcrypt.compareSync(password.trim(), userFound.password)){
            return <ServiceResponse>{
                notice: "no such user was found or password is incorect",
                error: "no such user was found or password is incorect",
                result: null
            }
        }

        let token: any = await AuthToken.Init(userFound);

        userFound.password = null;
        return <ServiceResponse>{
            notice: "User was succefully logged in",
            error: null,
            result: {user: userFound, token}
        }

    }


    /**
    * @uses reseting and validating user password
    * @return [success] user details and token [error] error object
    * @params body params
    */
   public static async ForgotUserPassword({email}: any){

        let userFound = await User.findOne({email: email});

        if(!userFound){
            return <ServiceResponse>{
                notice: "no such user was found",
                error: "no such user was found",
                result: null
            }
        }

        let securityToken: any = await CryptoService.encrypt({email: email, _id: userFound._id, time: Date.now()});

        let sendMessage = `Account for user  has been approved for password reset please click on the link below to reset the account.
        
${Config.CLIENT.url}/reset-password.html?token=${securityToken}
        `;
        //send email
        (new EmailService({email: email, subject: "Prism Awards account reset", message: sendMessage})).send();
        
        return <ServiceResponse>{
            notice: "reset sent, please check your email and finish reset password within 24hrs",
            error: null,
            result: {}
        }

    }

    /**
    * @uses applying reseting and validating user
    * @return [success] user details and token [error] error object
    * @params body params
    */
    public static async ResetUserPassword(params: any){

        let securityToken = await CryptoService.decrypt(params.token);
        let timeTaken = (((new Date()).getTime() - (new Date(securityToken.time)).getTime())/1000)/(60*60);

        if(timeTaken > 24){
            return <ServiceResponse>{
                error: null,
                notice: "Please rerequest for another token, token has expired",
                result: null
            }
        }

        let encryptedPass = bcrypt.hashSync(params.password, 10);
        let passChanged = await User.findOneAndUpdate({_id: securityToken._id}, {password: encryptedPass});

        if(passChanged){

            return <ServiceResponse>{
                error: null,
                result: true,
                notice: "Password was successfully reset You can now login"
            }

        }else{

            return <ServiceResponse>{
                error: "an error happened updating your password",
                result: null,
                notice: "an error happened updating your password"
            }

        }
 
    }

    /**
    * @uses get and validating user
    * @return [success] user details and token [error] error object
    * @params body params
    */
    public static async getUser(user: any){
    
        try{
            let returnUser = await User.findOne({_id: user});
            return <ServiceResponse>{
                notice: "User was found",
                error: null,
                result: returnUser
            }
        }catch(err){
            return <ServiceResponse>{
                notice: "User was not found",
                error: err,
                result: null
            }
        }

    }

    /**
    * @uses get All USERS
    * @return [success] user details and token [error] error object
    * @params body params
    */
    public static async getAllUsers(){
    
        try{

            let returnUsers = await User.find({});
            return <ServiceResponse>{
                error: null,
                notice: "Users were succefully found",
                result: returnUsers
            }

        }catch(err){

            return <ServiceResponse>{
                error: err,
                notice: "Users were succefully found",
                result: null
            }

        }

    }

    /**
    * @uses delete single user
    * @return [success] user details  [error] error object
    * @params request params user id
    */
    public static async DeleteUser(user: any){
    
        try{

            let returnUsers = await User.findOneAndDelete({_id: user});

            return <ServiceResponse>{
                error: null,
                notice: "User was succesfully delete",
                result: returnUsers
            }

        }catch(err){

            return <ServiceResponse>{
                error: err,
                notice: "User was succesfully delete",
                result: null
            }

        }

    }

    /**
    * @uses delete single user
    * @return [success] user details  [error] error object
    * @params request body params
    */
    public static async UpdateUser(params: any){
    
        try{

            let user = await User.findOneAndUpdate({_id: params.id}, {name: params.name, number: params.number, address: params.address});
            return <ServiceResponse>{
                error: null,
                notice: 'User profile was successfully updated',
                result: user
            }

        }catch(error){

            return <ServiceResponse>{
                error: error,
                notice: 'an error occured updating',
                result: null
            }

        }

    }

}

export default AuthService;