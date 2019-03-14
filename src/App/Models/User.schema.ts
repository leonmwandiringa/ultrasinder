/**
 * @author Leon Mwandiringa
 * @uses define and run User Mongo model
 * @return Model and schema object
 */


import { model, Schema } from "mongoose";

const UserSchema: Schema = new Schema({

   name: {
       type: String,
       required: true,
   },
   email:{
        type: String,
        required: true,
   },
   password:{
        type: String,
        required: true,
   },
   address:{
        type: String,
        required: false,
        default: ""
   },
   active:{
        type: String,
        enum: ["N", "Y"],
        required: false,
        default: "N"
   },
   submitted: {
        type: String,
        enum: ["N", "Y", null],
        required: false,
        default: null
   },
   type:{
          type: String,
          enum: ["ADMIN", "USER", "JSUBSCRIBER"],
          default: "USER",
          required: false,
    }

}, {timestamps: true, strict: false});

const User: any = model("User", UserSchema);

export default User;