import { InfoToSignProps } from "./Login";
import { ButtonFor42Register } from "./SignIn";
import { FieldErrors, FieldValues, UseFormRegister, useForm } from "react-hook-form";

interface SignUpFormProps {
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>
}

export const SignUp = (props: InfoToSignProps) : JSX.Element => {

	const { register, handleSubmit, formState: { errors } } = useForm();
	const signUp = (data: FieldValues) : void => {
		console.log(data);
		props.setIsLoading(true);
	};
	return (
		<div className="container-fluid">
			<SignUpTitle />
			<div className="row my-4">
				<div className="col-12 col-md-10 offset-md-1">
					<p>Register with</p>
					<ButtonFor42Register />
				</div>
			</div>
			<div className="col-12 col-md-10 offset-md-1 d-flex align-items-center justify-content-center">
				<div className="row">
					<div className="col-12 col-md-10 offset-md-1">
						<p>or</p>
						<form onSubmit={handleSubmit(data => signUp(data))}>
							<SignUpForm register={register} errors={errors}/>
							<SignUpButton />
						</form>
						<div className="row">
							<AlreadyRegistered isLogin={props.isLogin} setIsLogin={props.setIsLogin}
								isLoading={props.isLoading} setIsLoading={props.setIsLoading}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const SignUpTitle = () : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12 mb-3">
				<h2>Create account</h2>
			</div>
		</div>
	);
};

const SignUpForm = (props: SignUpFormProps) : JSX.Element => {
	
	return (
		<>
			<div className="row">
				<div className="col-12 col-md-10 offset-md-1 my-1">
					<input
						className="form-control"
						placeholder="Username"
						type="text"
						{...props.register("username", {
							required: "Username is required",
							minLength: {
								value: 6,
								message: "Username must be at least 6 characters long"
							}
						} )}
					/>
				</div>
				{props.errors["username"]?.message && <p className="form-error-text">{props.errors["username"]?.message}</p>}
				<div className="col-12 col-md-10 offset-md-1 my-1">
					<input
						className="form-control"
						placeholder="Email"
						type="email"
						{...props.register("email", {
							required: "Email is required",
						})}
					/>
				</div>
				{props.errors["email"]?.message && <p className="form-error-text">{props.errors["email"]?.message}</p>}
				<div className="col-12 col-md-10 offset-md-1 my-1">
					<input
						className="form-control"
						placeholder="Password"
						type="password"
						{...props.register("password", {
							required: "Password is required",
							minLength: {
								value: 10,
								message: "Password must be at least 10 characters long"
							}
						})}
					/>
				</div>
				{props.errors["password"]?.message && <p className="form-error-text">{props.errors["password"]?.message}</p>}
			</div>
		</>
	);
};

const SignUpButton = () : JSX.Element | null => {

	return (
		<div className="row">
			<div className="col-12 col-md-10 offset-md-1">
				<button
					type="submit"
					className="mt-4 btn btn-success w-100">SIGN UP</button>
			</div>
		</div>
	);
};

const AlreadyRegistered = (props: InfoToSignProps) : JSX.Element | null => {
	const changeToSignInForm = () => {
		props.setIsLogin(true);
	};
	return (
		<div className="only-phone col-12">
			<button
				onClick={()=>changeToSignInForm()}
				className="mt-4 btn btn-secondary w-80">Already registered? Login here</button>
		</div>
	);
};
