import { createContext, useState, useContext } from "react";
import { UserProps } from "../Props/User";

type ContextType = {
	user: UserProps,
	setUser: (value: UserProps) => void;
};

const defaultUser : UserProps = {
	name: "",
	username: "",
	password: "",
	twoFactAuth: false
};

const UserContext = createContext<ContextType>({
	user:defaultUser,
	setUser: () => {
		return;
	}
});

export const UserProvider = (props: {user: UserProps, children: JSX.Element}) => {
	const [user, setUser] = useState(props.user);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{props.children}
		</UserContext.Provider>
	);
};

const useUser = () => useContext(UserContext) as ContextType;
export default useUser;
