import * as testRepository from "../repositories/testRepository";
import * as teacherDisciplineService from "../services/correTeacherDiscipline";
import * as teacherService from "../services/teacherService";
import * as disciplineService from "../services/disciplinesService";
import * as categoryService from "../services/categoryService";
import * as termsRepository from "../repositories/termsRepository";
import * as disciplineRepository from "../repositories/disciplineRepository";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository"

export async function newTest(data: {
	name: string;
	pdfUrl: string;
	category: string;
	discipline: string;
	teacher: string;
}) {
	const { id: categoryId } = await categoryService.findByNameCategory(data.category);

	await teacherService.findByName(data.teacher);

	await disciplineService.findByName(data.discipline);

	const { id: teacherDisciplineId } =
		await teacherDisciplineService.findByNames(data.discipline, data.teacher);

	await testRepository.insertTest({
		name: data.name,
		pdfUrl: data.pdfUrl,
		categoryId,
		teacherDisciplineId,
	});
}

export async function findTestsByDiscipline() {
	const data = await disciplineRepository.getTestsByDiscipline();
  
	return data;
}


export async function findTestsByTeacher() {
	const data = await teacherDisciplineRepository.getTestsByInstructors();
  
	return data;
}