import prisma from "../databases/database";

export async function findByName(name:string) {
    return await prisma.teacher.findFirst({where: {name}})
}