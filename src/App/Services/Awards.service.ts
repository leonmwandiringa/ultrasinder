/**
 * @author Leon Mwandiringa
 * @uses define website service
 * @return website or returned error
 */


let jwt = require("jsonwebtoken");
import { AwardSubmission, User } from "../../Models";
import Config from "../../../Bootstrap/Config";
import { CloudUploadService } from "./index";

class AwardService{

    //init file upload
   public Init(execType: string, params: object | null = null ): any{
     
        switch(execType){
            case "create":
                return AwardService.InsertAwardSubmission(params);
            break;
            case "awardsforuser":
                return AwardService.GetUserAwardSubmissions(params);
            break;
            case "awards":
                return AwardService.GetAwardSubmissions(params);
            break;
            case "judge":
                return AwardService.JudgeAwardSubmission(params);
            break;
            case "editjudgesubmission":
                return AwardService.EditJudgeAwardSubmission(params);
            break;
            case "deleterecord":
                return AwardService.DeleteAwardSubmission(params);
            break;
            case "updaterecord":
                return AwardService.UpdateAwardSubmission(params);
            break;
            case "reviewawards":
                return AwardService.FetchReviewAwards(params);
            break;
            
        } 

   }

      //inserting user details for registerring user
    public static async InsertAwardSubmission(params: any){

        let savedFiles: any[] = [];
        for(let i = 0; i < params.attachments.length; i++){
            let retunedParams = await CloudUploadService.Init(params.attachments[i].payload);
            savedFiles.push(retunedParams);
        }
        //create submission
        let newAwardSumission = new AwardSubmission({ 
            title: params.title, author: params.user._id, 
            attachments: savedFiles, category: params.category, 
            description: params.details, user: params.user, award: params.award
        });

        try{
            await newAwardSumission.save();
            await User.findOneAndUpdate({_id: params.user._id}, {submitted: true});
            return {
                exists: false,
                created: true,
                error: null,
                notice: `You have successfully submitted for the ${newAwardSumission.category} category, ${newAwardSumission.award}`,
                result: newAwardSumission
            }
        }catch(err){
            console.log(err);
            return {
                exists: false,
                created: false,
                error: err,
                notice: 'an error occured saving',
                result: null
            }

        }

   }

   
    //updating award insertion
    public static async UpdateAwardSubmission(params: any){

        let AwardSumissionExist = await AwardSubmission.findOne({author: params.user._id, _id: params.id});

        if(!AwardSumissionExist || AwardSumissionExist.result.length > 0){
            return {
                exists: true,
                created: false,
                error: null,
                notice: 'This award is nolonger editable because Judges have already started judging',
                result: null
            }
        }

        try{
            await AwardSubmission.findOneAndUpdate({_id: params.id}, {
                title: params.title,
                category: params.category,
                award: params.award,
                description: params.details
            });
            return {
                exists: false,
                created: true,
                error: null,
                notice: `You have successfully Updated for the ${params.category} category, ${params.award}`,
                result: AwardSubmission
            }
        }catch(err){
            console.log(err);
            return {
                exists: false,
                created: false,
                error: err,
                notice: 'an error occured updating',
                result: null
            }

        }

   }

     //inserting user details for registerring user
     public static async GetUserAwardSubmissions(user: any){

        let AwardSumissionAvailable = await AwardSubmission.find({author: user });

            return {
                exists: true,
                found: AwardSumissionAvailable.length > 0 ? true : false,
                error: null,
                notice: 'Your Submissions were found',
                result: AwardSumissionAvailable
            }

     }

     //inserting all awards
     public static async GetAwardSubmissions(params: any){

        let getUser = await User.findOne({_id: params});
        let query = {};

        //if its a judge only see what you had been assigned
        if(getUser.type != "ADMIN"){
            query = {award: {$in: getUser.assigned}};
        }

        let AwardSumissionAvailable = await AwardSubmission.find(query);

            return {
                exists: true,
                found: AwardSumissionAvailable.length > 0 ? true : false,
                error: null,
                notice: 'Your Submissions were found',
                result: AwardSumissionAvailable
            }

    }

    //get awards reviewed by user
     public static async FetchReviewAwards(params: any){

        let AwardSumissionAvailable = await AwardSubmission.find({});

        let withResults: any[] = [];

        //running through returned judged by requesting user
        for(let i = 0; i < AwardSumissionAvailable.length; i++){
            if(AwardSumissionAvailable[i].result.length > 0){

                for(let k = 0; k < AwardSumissionAvailable[i].result.length; k++){
                    //only append when true
                    if(AwardSumissionAvailable[i].result[k].judge._id == params){
                        withResults.push(AwardSumissionAvailable[i]);
                    }
                    
                }
                
            }
        }

        return {
            exists: true,
            found: withResults.length > 0 ? true : false,
            error: null,
            notice: 'Your Submissions were found',
            result: withResults
        }

    }
     
    //delete record by user
    public static async DeleteAwardSubmission(params: any){

        let AwardSumissionExist = await AwardSubmission.findOne({_id: params.award, author: params.user});

        if(!AwardSumissionExist){
            return {
                exists: false,
                created: false,
                error: null,
                notice: 'Award Submission was not found.',
                result: null
            }
        }  else if(AwardSumissionExist.result.length > 0){

            return {
                exists: false,
                created: false,
                error: null,
                notice: 'Judges have already started judging this record, you nolonger cant delete.',
                result: null
            }
        }

        try{
            await AwardSubmission.findOneAndDelete({_id: params.award, author: params.user});

            return {
                exists: false,
                created: true,
                error: null,
                notice: `You have successfully Deleted Your award submission`,
                result: true
            }
        }catch(err){
            console.log(err);
            return {
                exists: false,
                created: false,
                error: err,
                notice: 'an error occured saving',
                result: null
            }

        }

   }

         //inserting user details for registerring user
    public static async JudgeAwardSubmission(params: any){

        let AwardSumissionExist = await AwardSubmission.findOne({_id: params.submission});

        let judgeAlreadyJudged = AwardSumissionExist.result.findIndex((elem: any)=>{
            return String(elem.judge._id).trim() == String(params.judge._id).trim();
        });

        if(judgeAlreadyJudged != -1){
            return {
                exists: true,
                created: false,
                error: null,
                notice: 'You have already Judged for this entry for the awards.',
                result: null
            }
        }   

        try{
            await AwardSubmission.findOneAndUpdate({_id: params.submission}, {$push: {result: params}});

            return {
                exists: false,
                created: true,
                error: null,
                notice: `You have successfully Judged the user's submission`,
                result: AwardSubmission
            }
        }catch(err){
            console.log(err);
            return {
                exists: false,
                created: false,
                error: err,
                notice: 'an error occured saving',
                result: null
            }

        }

   }

            //inserting user details for registerring user
    public static async EditJudgeAwardSubmission(params: any){

        let foundVal = await AwardSubmission.findOne({_id: params.submission});
        let toBeEdited, newStructure;
        newStructure = foundVal.result;
        for(var i = 0; i < foundVal.result.length; i++){
            if(foundVal.result[i].judge._id == params.judge._id){
                toBeEdited = foundVal.result[i];
                newStructure.splice(i, 1);
            }
        }

        toBeEdited.results = params.results;
        toBeEdited.comment = params.comment;
        newStructure.push(toBeEdited);


        try{
            
            await AwardSubmission.findOneAndUpdate({_id: params.submission}, {result: newStructure});

            return {
                exists: false,
                created: true,
                error: null,
                notice: `You have successfully Judged the user's submission`,
                result: AwardSubmission
            }
        }catch(err){
            console.log(err);
            return {
                exists: false,
                created: false,
                error: err,
                notice: 'an error occured saving',
                result: null
            }

        }

   }

}

export default new AwardService();