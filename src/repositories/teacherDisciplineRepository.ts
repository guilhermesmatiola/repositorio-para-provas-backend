import prisma from "../databases/database.js";

export async function findByNames(discipline: string, teacher: string) {
	return await prisma.teachersDisciplines.findFirst({
		where: { discipline: { name: discipline }, teacher: { name: teacher } },
	});
}

export async function getTestsByInstructors() {
	const result = await prisma.teacher.findMany({
	  select: {
		id: true,
		name: true,
		teachersDisciplines: {
		  include: {
			discipline: true,
			test: {
			  include: {
				category: true,
			  },
			},
		  },
		},
	  },
	});
  
	return result;
  }