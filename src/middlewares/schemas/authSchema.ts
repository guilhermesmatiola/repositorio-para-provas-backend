import joi from "joi";

const authSchema = joi.object({
	name:joi.string(), //nao é necessario aparentemente
	email: joi.string().email().required(),
	password: joi.string().required(),    
	confirmPassword:joi.string().required().valid(joi.ref('password'))

});

export default authSchema;