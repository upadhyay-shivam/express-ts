import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigurationService } from '../configuration/configuration.service';
import { Configuration } from '../configuration/config.enum';


const $configurationService = new ConfigurationService();
export const expressAuthentication = async (req: express.Request, securityName: string, scopes?: string[]): Promise<any> => {
    let token: string = req.headers['authorization'] as string;
    const secret = $configurationService.get(Configuration.JWT);
    if (!token) {
        throw new Error("Authentication Failed");
    }
    try {
        token = token.split(' ')[1];
        const decoded = await jwt.verify(token, secret);
        return decoded;
    } catch (e) {
        throw new Error(e);
    }
}

export default expressAuthentication;