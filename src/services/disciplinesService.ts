import * as disciplineRepository from "../repositories/disciplineRepository.js"

export async function findByName(name:string) {
    const discipline = await disciplineRepository.findByName(name);

    if(!discipline)
        throw { code: "NotFound", message: "Essa disciplina não está cadastrada."}

    return discipline;
}