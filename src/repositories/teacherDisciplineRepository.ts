import prisma from "../databases/database.js";

export async function findByNames(discipline: string, teacher: string) {
	return await prisma.teachersDisciplines.findFirst({
		where: { discipline: { name: discipline }, teacher: { name: teacher } },
	});
}