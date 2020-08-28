const loginAPI = () => {
	const data = {
		name: "LOGIN",
		method: "GET",
		path: "/api/login",
		des: "API to login the website",
		header: {

		},
		body: {
			email: "example@tma.com",
			password: "example",
		},
		success: {
			auth: "true",
			token: "XXXXX.YYYYY.ZZZZZ",
		},
		error: {

		}
	};
	return data;
};

module.exports = {
	loginAPI,
};