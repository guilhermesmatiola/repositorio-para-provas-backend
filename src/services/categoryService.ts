import * as categoryRepository from "../repositories/categoryRepository";

export async function findByNameCategory(name: string) {
	const category = await categoryRepository.findByName(name);

	if (!category)
		throw { code: "NotFound", message: "Categoria não encontrada!" };

	return category;
}