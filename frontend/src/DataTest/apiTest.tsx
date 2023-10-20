const UsersDatabase = [
	{
		name: "André Miranda",
		username: "andrferr",
		password: "0123456789",
		twoFactAuth: true
	},
];

const getUsers = async (username: string) => {
	const user = UsersDatabase.find(u => u.username === username);
	if (!user)
		return null;
	return user;
};
const isCodeCorrect = (code: string) => {
	if (code === "123456")
		return true;
	return false;
};

const loginAPITest = {
	getUsers,
	isCodeCorrect
};

export default loginAPITest;
