import classes from "./LoginHead.module.scss";

function SignupHead() {
	return (
		<div>
			<title className={classes.loginTitle}>Signup</title>
			<div>Please fill out the information</div>
		</div>
	);
}

export default SignupHead;