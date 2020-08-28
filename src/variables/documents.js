const loginAPI = () => {
	const data = {
		name: "LOGIN",
		method: "POST",
		path: "/api/login",
		des: "Login website",
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

const getUserInfoAPI = () => {
	const data = {
		name: "GET USER INFO",
		method: "GET",
		path: "/api/user",
		des: "Get user information on website",
		header: {
			Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
		},
		body: {

		},
		success: {
			_id: "exampleID",
			email: "example@tma.com",
			password: "example",
			name: "example Name",
			timestamp: "example Time",
			__v: 0
		},
		error: {

		}
	};
	return data;
}

module.exports = {
	loginAPI,
	getUserInfoAPI,
};