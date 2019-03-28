import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { requestLoggerMiddleware } from './modules/shared/middlewares/requestLogger';
import { RegisterRoutes } from './routes';
import * as swaggerUi from 'swagger-ui-express';
import { errorHandler } from './modules/shared/middlewares/error.handler';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLoggerMiddleware);

RegisterRoutes(app);
app.use(errorHandler);

try {
    const swaggerDocuments = require('../swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocuments));
} catch (err) {
    console.error(err);
}


export { app };