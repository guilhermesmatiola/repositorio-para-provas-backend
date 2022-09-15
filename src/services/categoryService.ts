import * as categoryRepository from "../repositories/categoryRepository.js";

export async function findByName(name: string) {
	const category = await categoryRepository.findByName(name);

	if (!category)
		throw { code: "NotFound", message: "Categoria não encontrada!" };

	return category;
}