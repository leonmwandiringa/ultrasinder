/**
 * @author Leon Mwandiringa
 * @uses define crypto encryption service
 * @return encrypted data  or decrypted data
 */


import Config from "../../Config";
import * as crypto from 'crypto';
const ENCRYPTION_KEY: any = Config.CRYPTO.encryption_key; // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

class CryptoService{

    /**
     * @uses encrypting object passed 
     * @params mixed object
     * @return 256 bit encrypted string with randombyte key
     */
    public encrypt(payload: any) {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(JSON.stringify(payload));

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return encodeURIComponent(iv.toString('hex') + ':' + encrypted.toString('hex'));
    }

    /**
     * @uses descrypt string to object
     * @params hex string
     * @returns descrypted object
     */
    public decrypt(payload: any) {

        let data: any = decodeURIComponent(payload);
        let textParts = data.split(':');
        let iv = new Buffer(textParts.shift(), 'hex');
        let encryptedText = new Buffer(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return JSON.parse(decrypted.toString());
    }


}

export default new CryptoService();