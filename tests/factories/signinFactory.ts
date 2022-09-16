import {faker} from "@faker-js/faker";

export default function loginUserFactory() {

    const newUserEmail: string = faker.internet.email();
    const newUserPassword: string = faker.random.alpha(10);
    const body = {
        email: newUserEmail,
        password: newUserPassword,
        confirmPassword: newUserPassword,
        };
        
    return body;
}