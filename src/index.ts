import express, { Application, NextFunction, Request, Response } from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';
import { HttpStatusCode } from './constants/httpStatusCode.const';
import { HTTPForbiddenError } from './error/httpError';

const app: Application = express();
const port = 3000;

app.use(cors()); // Browserから叩けるようにする
app.use(express.json()); // bodyをjavascriptのobjectに変換
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
	return res.status(HttpStatusCode.OK).send({
		message: 'Hello World!',
	});
});

app.get(
	'/test_error',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			throw new HTTPForbiddenError('アクセスしちゃダメ!');
		} catch (e) {
			next(e);
		}
	}
);

app.get(
	'/baby_names',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			return res.status(HttpStatusCode.OK).send({
				message: 'Hello World!',
			});
		} catch (e) {
			next(e);
		}
	}
);

app.use(errorMiddleware); // ここまで到達したエラーをクライアントに返すよ

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error: any) {
	console.error(`Error occured: ${error.message}`);
}
