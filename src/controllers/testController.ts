import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function newTest(req: Request, res: Response) {
	const data = req.body;

	await testService.newTest(data);

	res.sendStatus(201);
}

export async function getAllTestsByDiscipline(req: Request, res: Response) {
  const testsByDiscipline = await testService.findTestsByDiscipline();
  res.status(200).send(testsByDiscipline);
}

export async function getAllTestsByTeacher(req:Request, res: Response) {
  const testsByTeacher =  await testService.findTestsByTeacher();
  res.status(200).send(testsByTeacher);
}