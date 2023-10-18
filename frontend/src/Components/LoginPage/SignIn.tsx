import "./SignIn.css";
import { InfoToSignProps } from "./Login";
import { FieldErrors, FieldValues, UseFormRegister, useForm } from "react-hook-form";

interface SignInProps {
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
}

export const SignIn = (props: InfoToSignProps) : JSX.Element => {

	const { register, handleSubmit, formState: { errors } } = useForm();
	const signIn = (data: FieldValues) => {
		console.log(data);
		if (data.username.length > 0 && data.password.length > 0)
			props.setIsLoading(true);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12">
					<h2>Sign in to Ft-Transcendence</h2>
				</div>
			</div>
			<div className="row mt-5">
				<ButtonFor42Register />
				<div className="col-12 col-md-8 offset-md-2">
					<form onSubmit={handleSubmit(data => signIn(data))}>
						<SignInInputs register={register} errors={errors}/>
						<SignInButton />
						<ForgotPasssword />
					</form>
				</div>
				<SwitcherPanel />
			</div>
		</div>
	);
};

export const ButtonFor42Register = () : JSX.Element => {
	return (
		<div className="col-12">
			<div className="row">
				<div className="col-12 col-md-8 offset-md-2">
					<button className="btn btn-outline-secondary w-100">
						<img alt="42 school logo" id="logo-42-school" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/800px-42_Logo.svg.png"></img>
					</button>
				</div>
			</div>
		</div>
	);
};

const SignInInputs = (props: SignInProps) : JSX.Element => {

	return (
		<div className="row mt-5">
			<div className="col-12">
				<p>or use your email account</p>
				<div className="input-group mb-3">
					<input type="text" className="form-control" placeholder="Username"
						{...props.register("username", {
							required: "This field is required",
							minLength:  {
								value: 6,
								message: "Username must be at least 6 characters long"
							} })}
					/>
				</div>
				<p className="form-error-text">{props.errors["username"]?.message}</p>
				<div className="input-group mb-3">
					<input type="password" className="form-control" placeholder="Password"
						{...props.register("password",{
							required: "Password is required",
							minLength: {
								value: 10,
								message: "Password must be at least 10 characters long"
							} })}
					/>
				</div>
				<p className="form-error-text">{props.errors.password?.message}</p>
			</div>
		</div>
	);
};

const SignInButton = () : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12">
				<button className="btn btn-success w-100" type="submit">SIGN IN</button>
			</div>
		</div>
	);
};

const ForgotPasssword = () : JSX.Element => {
	return (
		<div className="row mt-3">
			<div className="col-12">
				<button className="btn btn-link">Forgot your password?</button>
			</div>
		</div>
	);
};

const SwitcherPanel = () : JSX.Element => {
	return (
		<div className="row only-phone mt-4">
			<div className="col-8 offset-2">
				<button
					type="submit"
					className="btn btn-secondary w-100">Not registered? Sign up here
				</button>
			</div>
		</div>
	);
};
