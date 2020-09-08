//Type: "USER"
const login = {
	id: "login",
	type: "USER",
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

const getUserInfo = {
	id: "userinfo",
	type: "USER",
	name: "USER INFO",
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

const addUser = {
	id: "adduser",
	type: "USER",
	name: "ADD USER",
	method: "POST",
	path: "/api/user",
	des: "Add new user",
	header: {

	},
	body: {
		email: "example@tma.com",
		password: "example123",
		name: "Example"
	},
	success: {
		status: "ok"
	},
	error: {
		status: "fail"
	}
};

const updateUser = {
	id: "updateuser",
	type: "USER",
	name: "UPDATE USER",
	method: "PUT",
	path: "/api/user/id/:user_id",
	des: "Update user infomation",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {
		email: "example@tma.com",
		password: "example123",
		name: "Example"
	},
	success: {

	},
	error: {

	}
};

const deleteUser = {
	id: "deleteuser",
	type: "USER",
	name: "DELETE USER",
	method: "DELETE",
	path: "/api/user",
	des: "Delete user information",
	header: {

	},
	body: {
		user_id: "5f3c9ee33f4d723450f7b53c"
	},
	success: {

	},
	error: {

	}
};


//Type: DEVICE
const getListDevices = {
	id: "listdevices",
	type: "DEVICE",
	name: "LIST OF DEVICES",
	method: "GET",
	path: "/api/device",
	des: "Get list of devices",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {

	},
	success: [
		{
			_id: "example123",
			license_plate: "123example",
			driver: "example",
			timestamp: "2020-08-20T10:35:10.390Z",
			__v: 0,
			line: "example"
		},
		{
			_id: "example123",
			license_plate: "123example",
			driver: "example",
			timestamp: "2020-08-20T10:35:10.390Z",
			__v: 0,
			line: "example"
		},
	],
	error: {

	}
};

const getDeviceInfo = {
	id: "deviceinfo",
	type: "DEVICE",
	name: "DEVICE INFORMATION",
	method: "GET",
	path: "/api/device/id/:device_id",
	des: "Get information of the device",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {

	},
	success: {
		_id: "example123",
		license_plate: "123example",
		driver: "example",
		timestamp: "2020-08-20T10:35:10.390Z",
		__v: 0,
		line: "example"
	},
	error: {

	}
};

const createDevice = {
	id: "createdevice",
	type: "DEVICE",
	name: "CREATE DEVICE",
	method: "POST",
	path: "/api/device",
	des: "Create new device",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {
		license_plate: "AB78TTF5121",
		driver: "ThanhPhan",
		line: "Tokyo"
	},
	success: {
		status: "ok"
	},
	error: {
		status: "fail"
	}
};

const updateDevice = {
	id: "updatedevice",
	type: "DEVICE",
	name: "UPDATE DEVICE",
	method: "PUT",
	path: "/api/device/id/:device_id",
	des: "Update device information",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {
		license_plate: "UpdatedPlate",
		driver: "UpdatedName",
		line: "UpdatedLine"
	},
	success: {

	},
	error: {

	}
};

const deleteDevice = {
	id: "deletedevice",
	type: "DEVICE",
	name: "DELETE DEVICE",
	method: "DELETE",
	path: "/api/device/",
	des: "Delete device information",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {
		id: "DeviceIDExample"
	},
	success: {

	},
	error: {

	}
};

//Type: BLUEPRINT


//Type: BUSCOUNTER
const getBusCounter = {
	id: "buscounter",
	type: "BUSCOUNTER",
	name: "BUSCOUNTER",
	method: "GET",
	path: "/api/buscounter/",
	des: "List of buscounters",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {

	},
	success: [
		{
			_id: "5f3f3ee16a5133717510ffc9",
			state: "up",
			image: "avt.jpg",
			lat: 56.5678443,
			long: 25.445364,
			age: 20,
			gender: false,
			device_id: {
				_id: "5f3e51de0021dd1450cd4c13",
				license_plate: "BB5HDG4",
				driver: "YASUO",
				timestamp: "2020-08-20T10:35:10.390Z",
				__v: 0,
				line: "duong"
			},
			timestamp: "2020-08-21T03:26:25.660Z",
			__v: 0
		},
		{
			_id: "5f3f3ee16a5133717510ffc9",
			state: "up",
			image: "avt.jpg",
			lat: 56.5678443,
			long: 25.445364,
			age: 20,
			gender: false,
			device_id: {
				_id: "5f3e51de0021dd1450cd4c13",
				license_plate: "BB5HDG4",
				driver: "YASUO",
				timestamp: "2020-08-20T10:35:10.390Z",
				__v: 0,
				line: "duong"
			},
			timestamp: "2020-08-21T03:26:25.660Z",
			__v: 0
		}
	],
	error: {

	}
};

const getBusCounterInfo = {
	id: "buscounterinfo",
	type: "BUSCOUNTER",
	name: "BUSCOUNTER INFORMATION",
	method: "GET",
	path: "/api/buscounter/id/:bus_id",
	des: "Get information of the buscounter",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {

	},
	success: {
		_id: "5f3f3ee16a5133717510ffc9",
		state: "up",
		image: "avt.jpg",
		lat: 56.5678443,
		long: 25.445364,
		age: 20,
		gender: false,
		device_id: {
			_id: "5f3e51de0021dd1450cd4c13",
			license_plate: "BB5HDG4",
			driver: "YASUO",
			timestamp: "2020-08-20T10:35:10.390Z",
			__v: 0,
			line: "duong"
		},
		timestamp: "2020-08-21T03:26:25.660Z",
		__v: 0
	},
	error: {

	}
};

const getBusCounterBasedOnDevice = {
	id: "busondevice",
	type: "BUSCOUNTER",
	name: "BUSCOUNTER ON DEVICE",
	method: "GET",
	path: "/api/buscounter/device_id/:device_id",
	des: "Get buscounters based on specific device",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {

	},
	success: [
		{
			_id: "5f3f3ee16a5133717510ffc9",
			state: "up",
			image: "avt.jpg",
			lat: 56.5678443,
			long: 25.445364,
			age: 20,
			gender: false,
			device_id: {
				_id: "5f3e51de0021dd1450cd4c13",
				license_plate: "BB5HDG4",
				driver: "YASUO",
				timestamp: "2020-08-20T10:35:10.390Z",
				__v: 0,
				line: "duong"
			},
			timestamp: "2020-08-21T03:26:25.660Z",
			__v: 0
		},
		{
			_id: "5f3f3ee16a5133717510ffc9",
			state: "up",
			image: "avt.jpg",
			lat: 56.5678443,
			long: 25.445364,
			age: 20,
			gender: false,
			device_id: {
				_id: "5f3e51de0021dd1450cd4c13",
				license_plate: "BB5HDG4",
				driver: "YASUO",
				timestamp: "2020-08-20T10:35:10.390Z",
				__v: 0,
				line: "duong"
			},
			timestamp: "2020-08-21T03:26:25.660Z",
			__v: 0
		}
	],
	error: {

	}
};

const getBusCounterOnDate = {
	id: "busondate",
	type: "BUSCOUNTER",
	name: "BUSCOUNTER ON DATE",
	method: "GET",
	path: "/api/buscounter/date/2020-08-21",
	des: "Get buscounters based on specific date",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {

	},
	success: [
		{
			_id: "5f3f3ee16a5133717510ffc9",
			state: "up",
			image: "avt.jpg",
			lat: 56.5678443,
			long: 25.445364,
			age: 20,
			gender: false,
			device_id: {
				_id: "5f3e51de0021dd1450cd4c13",
				license_plate: "BB5HDG4",
				driver: "YASUO",
				timestamp: "2020-08-20T10:35:10.390Z",
				__v: 0,
				line: "duong"
			},
			timestamp: "2020-08-21T03:26:25.660Z",
			__v: 0
		},
		{
			_id: "5f3f3ee16a5133717510ffc9",
			state: "up",
			image: "avt.jpg",
			lat: 56.5678443,
			long: 25.445364,
			age: 20,
			gender: false,
			device_id: {
				_id: "5f3e51de0021dd1450cd4c13",
				license_plate: "BB5HDG4",
				driver: "YASUO",
				timestamp: "2020-08-20T10:35:10.390Z",
				__v: 0,
				line: "duong"
			},
			timestamp: "2020-08-21T03:26:25.660Z",
			__v: 0
		}
	],
	error: {

	}
};

const getBusCounterOnMonth = {
	id: "busonmonth",
	type: "BUSCOUNTER",
	name: "BUSCOUNTER ON MONTH",
	method: "GET",
	path: "/api/buscounter/month/2020-08",
	des: "Get buscounters based on specific month",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {

	},
	success: [
		{
			_id: "5f3f3ee16a5133717510ffc9",
			state: "up",
			image: "avt.jpg",
			lat: 56.5678443,
			long: 25.445364,
			age: 20,
			gender: false,
			device_id: {
				_id: "5f3e51de0021dd1450cd4c13",
				license_plate: "BB5HDG4",
				driver: "YASUO",
				timestamp: "2020-08-20T10:35:10.390Z",
				__v: 0,
				line: "duong"
			},
			timestamp: "2020-08-21T03:26:25.660Z",
			__v: 0
		},
		{
			_id: "5f3f3ee16a5133717510ffc9",
			state: "up",
			image: "avt.jpg",
			lat: 56.5678443,
			long: 25.445364,
			age: 20,
			gender: false,
			device_id: {
				_id: "5f3e51de0021dd1450cd4c13",
				license_plate: "BB5HDG4",
				driver: "YASUO",
				timestamp: "2020-08-20T10:35:10.390Z",
				__v: 0,
				line: "duong"
			},
			timestamp: "2020-08-21T03:26:25.660Z",
			__v: 0
		}
	],
	error: {

	}
};

const createBuscounter = {
	id: "createbuscounter",
	type: "BUSCOUNTER",
	name: "CREATE BUSCOUNTER",
	method: "POST",
	path: "/api/buscounter",
	des: "Create new buscounter",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {
		state: "down",
		image: "customer2.png",
		lat: 56.5678453,
		long: 25.445364,
		age: 20,
		gender: false,
		device_id: "5f3e51de0021dd1450cd4c13",
		timestamp: "2020-08-27T00:00:00.000Z"
	},
	success: {
		status: "ok"
	},
	error: {
		status: "fail"
	}
};

const updateBuscounter = {
	id: "updatebuscounter",
	type: "BUSCOUNTER",
	name: "UPDATE BUSCOUNTER",
	method: "PUT",
	path: "/api/buscounter/id/:buscounter_id",
	des: "Update specific buscounter information",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {
		state: "down",
		image: "customer3.png",
		lat: 56.5678453,
		long: 25.445364,
		age: 11,
		gender: false,
		device_id: "5f3e51de0021dd1450cd4c13",
		timestamp: "2020-08-27T00:00:00.000Z"
	},
	success: {

	},
	error: {

	}
};

const deleteBuscounter = {
	id: "deletebuscounter",
	type: "BUSCOUNTER",
	name: "DELETE BUSCOUNTER",
	method: "DELETE",
	path: "/api/buscounter/",
	des: "Delete buscounter information",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {
		id: "BuscounterIDExample"
	},
	success: {

	},
	error: {

	}
};

//Type: STATISTIC
const getBuscounterStatsOnDay = {
	id: "busstatsonday",
	type: "STATISTIC",
	name: "BUSCOUNTER STATS ON DAY",
	method: "GET",
	path: "/api/buscounter/statistic/customer_on_day",
	des: "Get buscounter stats based on day",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {

	},
	success: [
		{
			_id: "2020-08-21",
			count: 26
		},
		{
			_id: "2020-08-24",
			count: 2
		},
		{
			_id: "2020-08-25",
			count: 2
		}
	],
	error: {

	}
};

const getBuscounterStatsOnMonth = {
	id: "busstatsonmonth",
	type: "STATISTIC",
	name: "BUSCOUNTER STATS ON MONTH",
	method: "GET",
	path: "/api/buscounter/statistic/customer_on_month",
	des: "Get buscounter stats based on month",
	header: {
		Authorization: "Bearer XXXXX.YYYYY.ZZZZ"
	},
	body: {

	},
	success: [
		{
			_id: "2020-08",
			count: 30
		},
		{
			_id: "2020-09",
			count: 653
		}
	],
	error: {

	}
};

//Export all APIs
const APIList = [
	login,
	getUserInfo,
	addUser,
	updateUser,
	deleteUser,
	getListDevices,
	getDeviceInfo,
	createDevice,
	updateDevice,
	deleteDevice,
	getBusCounter,
	getBusCounterInfo,
	getBusCounterBasedOnDevice,
	getBusCounterOnDate,
	getBusCounterOnMonth,
	createBuscounter,
	updateBuscounter,
	deleteBuscounter,
	getBuscounterStatsOnDay,
	getBuscounterStatsOnMonth
];

export default APIList;