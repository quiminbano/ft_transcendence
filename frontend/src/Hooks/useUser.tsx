import { createContext, useState, useContext } from "react";
import { UserProps } from "../Props/User";

const UserContext = createContext();

export const UserProvider = (props: {user: UserProps, children: JSX.Element}) => {
	const [user, setUser] = useState(props.user);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{props.children}
		</UserContext.Provider>
	);
};

const useUser = () => useContext(UserContext);
export default useUser;
