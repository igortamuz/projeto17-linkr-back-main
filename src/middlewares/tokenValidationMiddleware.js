import jwt from "jsonwebtoken";

export async function tokenVerification(req, res, next) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");

	try {
		const dados = jwt.verify(token, process.env.SECRET_TOKEN);
		res.locals.userId = dados.userId;
		next();
	} catch (err) {
		console.log(err);
		res.sendStatus(401);
	}
}
