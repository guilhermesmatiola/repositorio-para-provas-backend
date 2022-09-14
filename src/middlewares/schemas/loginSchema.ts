import joi from "joi";

const loginSchema = joi.object({
	name:joi.string(), //nao é necessario aparentemente
	email: joi.string().email().required(),
	password: joi.string().required()
});

export default loginSchema;