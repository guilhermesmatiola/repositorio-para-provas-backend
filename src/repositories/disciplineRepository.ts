import prisma from "../databases/database.js";

export async function findByName(name:string) {
    return await prisma.discipline.findFirst({where: {name}})
}