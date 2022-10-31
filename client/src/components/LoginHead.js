import classes from "./LoginHead.module.scss";

function LoginHead() {
	return (
		<div>
			<title className={classes.loginTitle}>Login</title>
			<div>Please enter your Username and Password</div>
		</div>
	);
}

export default LoginHead;