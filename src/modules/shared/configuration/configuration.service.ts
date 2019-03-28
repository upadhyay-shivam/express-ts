import { Configuration } from "./config.enum";
import { get } from 'config';
export class ConfigurationService {
    static connectionString: string = process.env[Configuration.MONGO_URI] || get(Configuration.MONGO_URI);
    private enviromentHosting: string = process.env.NODE_ENV || 'development';
    get(name: string): string {
        return process.env[name] || get(name);
    }
    get isDevelopment(): boolean {
        return this.enviromentHosting === 'development';
    }
    static normalizePort(param: string | number): number | string {
        const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
        if (!isNaN(portNumber)) {
            return param;
        } else if (portNumber >= 0) {
            return portNumber;
        }
    }
}