import 'dotenv/config';
import express, { Application, NextFunction, Request, Response } from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';
import { HttpStatusCode } from './constants/httpStatusCode.const';
import { HTTPBadRequestError, HTTPForbiddenError } from './error/httpError';
import { configs } from './configs/configs';
import { Baby, QueryResponse } from './types';
import { BabiesService } from './services/babies.service';

const app: Application = express();
const port = 3000;

app.use(cors()); // Browserから叩けるようにする
app.use(express.json()); // bodyをjavascriptのobjectに変換
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
	console.log(configs.test);
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

/**
 * 特にフィルターなく出力する
 */
app.get(
	'/baby_names',
	async (
		req: Request<
			{},
			{},
			{},
			{ cursor?: string; colmuns?: string; maxResults?: number }
		>,
		res: Response<QueryResponse<Baby>>,
		next: NextFunction
	) => {
		try {
			const cursor = req.query.cursor;
			const colmunsArray = req.query.colmuns?.split(';');
			const maxResults = Number(req.query.maxResults);

			const babies = await BabiesService.listData({
				cursor,
				colmuns: colmunsArray,
				maxResults,
			});
			return res.status(HttpStatusCode.OK).send(babies);
		} catch (e) {
			next(e);
		}
	}
);

/**
 * Genderごとに出力する
 */
app.get(
	'/baby_names/gender/:gender',
	async (
		req: Request<
			{ gender: 'male' | 'female' },
			{},
			{},
			{ cursor?: string; colmuns?: string; maxResults?: number }
		>,
		res: Response<QueryResponse<Baby>>,
		next: NextFunction
	) => {
		try {
			const gender = req.params.gender;
			if (gender !== 'female' && gender !== 'male')
				throw new HTTPBadRequestError('gender should be `male` or `female`');
			const cursor = req.query.cursor;
			const colmunsArray = req.query.colmuns?.split(';');
			const maxResults = Number(req.query.maxResults);

			const babies = await BabiesService.listDataByGender(
				gender === 'male' ? 'M' : 'F',
				{
					cursor,
					colmuns: colmunsArray,
					maxResults,
				}
			);
			return res.status(HttpStatusCode.OK).send(babies);
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
