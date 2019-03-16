/**
 * @author Leon Mwandiringa
 * @uses define base Middleware
 * @return Router and Nextfunction object if emmited
 */

import { Request, Response, NextFunction } from "express";
var _ = require('lodash');
let range_check =  require('range_check');
import * as util from 'util';
import MessageResponse from "../Interfaces/HttpResponse.interface";

class Middleware{

   public static IpRange(ipRanges?: any){

    /**
	 * @Returns an Express middleware.
     * @uses restricts unwanted devices
	 */
	return function (req: Request, res: Response, next: NextFunction) {

		// Require that at least one IP range has been provided.
		if (_.isUndefined(ipRanges)) {
			throw new Error('Allowed IP range is not defined');
		}

		// The set of allowed ranges has to be separated by space
		// characters or a comma.
		var allowedRanges = ipRanges.split(/\s+|,/);

		// Keep only those ranges that match CIDR format.
		allowedRanges = _.filter(allowedRanges, function (ipRange: any) {
			return range_check.validRange(ipRange);
		});

		if (allowedRanges.length <= 0) {
			throw new Error('No valid CIDR ranges were specified');
		}

		// Using req.ips requires that express 'trust proxy' setting is
		// true. When it *is* set the value for ips is extracted from the
		// X-Forwarded-For request header. The originating IP address is
		// the last one in the array.
		var requestIP = (req.ips.length > 0) ? req.ips.slice().pop() : req.ip;

		// Deny the request if request IP is not in one of the allowed
		// IP address ranges.
		var requestAllowed = range_check.inRange(requestIP, allowedRanges);

		if (!requestAllowed) {
			var msg = '-> blocked request from %s (not in allowed IP range)';
			console.log(util.format(msg, req.ip));

			return res.status(403).json(<MessageResponse>{
                status: false,
                validationMessage: 'Sorry, your request is not authorized',
                response: null,
                responseMessage: 'Requests from outside permitted IP range are not allowed'
            });
		}

		next();

	};


   }

}

export default Middleware;
