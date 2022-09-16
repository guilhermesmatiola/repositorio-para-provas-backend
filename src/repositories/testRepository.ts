import prisma from "../databases/database";
import {Test} from "@prisma/client"

export type TypeTest = Omit<Test, "id">;

export async function insertTest(data:TypeTest) {
    await prisma.test.create({data})
}