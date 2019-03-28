import { app } from './app';
import * as http from 'http';
import { ConfigurationService } from './modules/shared/configuration/configuration.service';
import { Configuration } from './modules/shared/configuration/config.enum';
import * as mongoose from 'mongoose';
const $configurationService = new ConfigurationService();

const host: string = $configurationService.get(Configuration.HOST);
const port: number | string = ConfigurationService.normalizePort($configurationService.get(Configuration.PORT));
const isDev: boolean = $configurationService.isDevelopment;

const server = http.createServer(app);

server.listen(port);
mongoose.connect(ConfigurationService.connectionString, { useNewUrlParser: true });

server.on('listening', () => {
    console.info(`Listening on port ${port}`);
});
mongoose.connection.on('open', () => {
    console.info('Connected to mongo');
})

mongoose.connection.on('error', (err: Error) => {
    console.error(err);
})


