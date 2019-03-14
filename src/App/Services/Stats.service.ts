/**
 * @author Leon Mwandiringa
 * @uses define stats service
 * @return stats obj or returned error
 */


import { AwardSubmission, User } from "../../Models";
import Config from "../../../Bootstrap/Config";

class StatsService{

    //init file upload
   public Init(execType: string): any{

        switch(execType){
            case "admin":
                return StatsService.STATS_FOR_ADMIN()
        }

   }

   public static async STATS_FOR_ADMIN(){

        let Results: any = {sector: [], practice: [], individual: [], lifetime: [], campaign: [], consultancy: []};
        let Awards: any = {
            sector: ['Business to business', 'Consumer PR for an existing product, service or category', 'Launch of a new service, product or category', 'Financial services',
                        'Investor relations', 'Healthcare', 'Financial services', 'Travel and tourism', 'Sports marketing', 'Resources', 'Environmental', 'Public affairs',
                        'Public sector', 'Community relations', 'NGO campaign', 'Corporate responsibility', 'Sponsorship', 'Public Relations on a shoestring'],
            practice: ['Best use of an event to build / change reputation (event management)', 'Communication Research', 'Corporate communication', 'Crisis management',
                        'Internal or Employee communication', 'Publications', 'Media relations', 'Social Media as the primary method of Communication (best use of social to lead a campaign)',
                        'Social Media as the primary method of Communication(best use of social to lead a campaign with no social media spend)'],
            individual: ['Best Up-and-coming Public Relations Professional', 'Best Public Relations Professional'],
            lifetime: ['Impact on the profession', 'Leadership and volunteerism', 'Innovation', 'Long term vision'],
            campaign: ['Best Small Public Relations consultancy', 'Best Mid-sized Public Relations cons', 'Best Large Public Relations consultancy', 'African Network of the Year'],
            consultancy: ['Pan African Campaign of the Year', 'South African Campaign of the Year']
        }

        for(let kt in Awards){
            for(let i=0; i < Awards[kt].length; i++){

                Results[kt][i] = await AwardSubmission.find({award: Awards[kt][i]}); 

            }
        }

        let submitted = await AwardSubmission.count({});
        let judges = await User.count({type: "JUDGE"});
        let users = await User.count({type: "USER"});
        
        return {
            results: Results,
            submitted: submitted,
            judges: judges,
            users: users
        }

   }


}

export default new StatsService();