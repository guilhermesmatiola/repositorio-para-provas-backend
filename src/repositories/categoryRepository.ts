import prisma from "../databases/database.js";
import * as categoryRepository from "../repositories/categoryRepository.js";

export async function findByName(name:string) {
    return await prisma.category.findFirst({where: {name}})
}

export async function findByNameCategory(name: string) {
	const category = await categoryRepository.findByName(name);

	if (!category)
		throw { code: "NotFound", message: "Categoria não encontrada!" };

	return category;
}