import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../constants/httpStatusCode.const';
import { BaseError } from '../error/baseError';

const isExpectedError = (err: Error) => {
	if (err instanceof BaseError) return err.isUnexpected;
	return false;
};

export const errorMiddleware = async (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (isExpectedError(err)) {
		return res
			.status((err as BaseError).httpCode)
			.send({ statusText: err.name, message: err.message });
	}

	console.error('Unexpected Error', err);
	return res
		.send(HttpStatusCode.INTERNAL_SERVER_ERROR)
		.send({ statusText: 'internal server error', message: err.message });
};
