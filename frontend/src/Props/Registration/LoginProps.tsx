import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface InfoToSignProps {
	isLogin: boolean;
	setIsLogin: (value: boolean) => void;
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
	setIsTwoFactAuthRequired: (value: boolean) => void;
	setIsAuth: (value: boolean) => void;
	setTwoFactType: (value: TwoFactEnum) => void;
}

export interface LoginProps {
	isAuthenticated: boolean;
	setIsAuthenticated: (value: boolean) => void;
}

export enum TwoFactEnum { Google, Phone, NULL }

export interface SignInProps {
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	errorMessage: string;
	setErrorMessage: (value: string) => void;
}

export interface TwoFactorAuthProps {
	setIsLoading: (value: boolean)=> void;
	setIsAuthReq: (value: boolean) => void;
	setTwoFactType: (value: TwoFactEnum) => void;
}

export interface AuthProps {
	setAuthType: (value: TwoFactEnum) => void;
	setIsAuth: (value: boolean) => void;
}

export interface CodeStateProps {
	code: string;
	setCode: (value: string) => void;
}

export interface ConfirmCode {
	setIsCodeCorrect: (value: boolean) => void;
	code: string;
	setIsLoading: (value: boolean) => void;
}
