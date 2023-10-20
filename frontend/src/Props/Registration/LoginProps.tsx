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

export interface CodeAreaProps {
	code: number[];
	updateAtIndex: (index: number, value: string) => void;
}

export interface SqaureProps {
	index: number;
	updateAtIndex: (index: number, value: string) => void;
}

export interface PhoneAuthProps {
	setAuthType: (value: TwoFactEnum) => void;
}
