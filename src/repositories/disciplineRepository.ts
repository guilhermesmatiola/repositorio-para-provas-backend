import prisma from "../databases/database.js";

export async function findByName(name:string) {
  return await prisma.discipline.findFirst({where: {name}})
}

export async function getTestsByDiscipline() {

  const testsByDiscipline = await prisma.term.findMany({
      select:{
        number: true,
        discipline:{
          select:{
            name: true,
            id: true,
            teachersDisciplines:{
              include:{
                teacher:{
                  select:{
                    name:true,
                    id:true
                  },
                },
                test:{
                  include:{
                    category:{
                      select:{
                        name:true,
                        id:true
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
  });
  
  return testsByDiscipline;
}