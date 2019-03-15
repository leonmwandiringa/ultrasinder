/**
 * @author Leon Mwandiringa
 * @uses define bundle controllers available
 * @return controllers object
 */

export { default as TokenController } from "./Token.controller";
export { default as ForgotPasswordController } from "./Auth/ForgotPassword.controller";
export { default as LoginController } from "./Auth/Login.controller";
export { default as ResetPasswordController } from "./Auth/ResetPassword.controller";
export { default as UserController } from "./Auth/User.controller";
export { default as RegisterController } from "./Auth/Register.controller";