const UsersDatabase = [
	{
		name: "André Miranda",
		username: "andrferr",
		password: "0123456789",
		TwoFactAuth: true
	},
];

const getUsers = async (username: string) => {
	const user = UsersDatabase.find(u => u.username === username);
	return user;
};

const loginAPITest = {
	getUsers,
};

export default loginAPITest;