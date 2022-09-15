import * as teacherDiscipline from "../repositories/teacherRepository.js"

export async function findByName(name:string) {
    const teacherName = await teacherDiscipline.findByName(name);

    if(!teacherName)
        throw { code: "NotFound", message: "Esse professor não está cadastrado."}

    return teacherName;
}