import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function newTest(req: Request, res: Response) {
	const data = req.body;

	await testService.newTest(data);

	res.sendStatus(201);
}