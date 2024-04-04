import joi from "joi";

const signupSchema = joi.object({
	name: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	picture: joi.string().uri().required(),
});

const publishSchema = joi.object({
	url: joi
		.string()
		.required()
		.trim()
		.pattern(
			/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
		)
		.message({ "string.pattern.base": "invalid url format" }),
	text: joi.string().empty("").max(250),
});

export function signupMiddleware(req, res, next) {
	const user = req.body;
	const userValidation = signupSchema.validate(user);

	if (userValidation.error) {
		res.status(422).send(userValidation.error.details[0].message);
		return;
	}

	res.locals.user = req.body;

	next();
}

export function publishMiddleware(req, res, next) {
	const { url, text } = req.body;
	const validation = publishSchema.validate(req.body, { abortEarly: false });

	if (validation.error) {
		const err = validation.error.details.map((detail) => detail.message);
		return res.status(422).send(err);
	}

	res.locals.publish = req.body;

	next();
}
