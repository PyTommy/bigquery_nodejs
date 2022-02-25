import { HttpStatusCode } from '../constants/httpStatusCode.const';

export class BaseError extends Error {
	public readonly name: string;
	public readonly httpCode: HttpStatusCode;
	public readonly isUnexpected: boolean;

	constructor(
		name: string,
		httpCode: HttpStatusCode,
		description: string,
		isUnexpected: boolean
	) {
		super(description);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = name;
		this.httpCode = httpCode;
		this.isUnexpected = isUnexpected;

		Error.captureStackTrace(this);
	}
}
