import prisma from "../databases/database";

export async function findByDiscipline() {
    return await prisma.term.findMany({
        include:{
            discipline:{
                include:{
                    teachersDisciplines:{
                        include:{
                            teacher:true,
                            test:true
                        }
                    }
                }
            }
        }
    });
}