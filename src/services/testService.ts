import * as testRepository from "../repositories/testRepository.js";
import * as teacherDisciplineService from "../services/correTeacherDiscipline.js";
import * as teacherService from "../services/teacherService.js";
import * as disciplineService from "../services/disciplinesService.js";
import * as categoryService from "../services/categoryService.js";
import * as termsRepository from "../repositories/termsRepository.js"
import * as disciplineRepository from "../repositories/disciplineRepository.js"

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
	const assignmentsData =
	  await disciplineRepository.getTestsByDiscipline();
  
	return assignmentsData;
  }