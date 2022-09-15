import prisma from "../databases/database.js";

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