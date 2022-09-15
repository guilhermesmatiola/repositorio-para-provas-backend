import * as teachersDisciplinesRepository from "../repositories/teacherDisciplineRepository.js";

export async function findByNames(discipline: string, teacher: string) {
	const teacherDiscipline = await teachersDisciplinesRepository.findByNames(discipline,teacher);

	if (!teacherDiscipline)
		throw {	code: "NotFound", message: "Professor não encontrado para essa disciplina"};

	return teacherDiscipline;
}