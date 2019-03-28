import { HttpError } from 'http-errors';
import * as express from 'express';


const errorHandler = async (err, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!err) {
        return next(err);
    }
    if (err.message === 'SchemaValidationError') {
        return res.status(400).send(err.fields);
    }

    if (err.name === 'UnauthorizedError' || err.status === 401) {
        return res.status(401).send({ error: 'Authentication failed' });
    }

    if (err.name === 'AuthenticationFailedError') {
        return res.status(401).send({ error: err.message });
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).send({ error: err.message });
    }

    if (err.name === 'BadRequestError' || err instanceof HttpError) {
        return res.status(400).send({ error: err.message });
    }

    const body = { message: 'Internal Server Error' };
    return res.status(500).send(body);
};

export { errorHandler }