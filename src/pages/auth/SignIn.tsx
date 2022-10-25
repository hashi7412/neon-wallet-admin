import React from "react";
import { Link } from "react-router-dom";
import useStore, { tips, validateEmail } from "../../useStore";
import { Toast } from "../../utils/message";

interface Status {
	email: string
	password: string
}

export default function Login() {
	const { account, sendJson, navigate, getError, setCookie, showLoading } = useStore();

	const [status, setStatus] = React.useState<Status>({
		email: "",
		password: ""
	});

	const onSignIn = async () => {
		showLoading(true);
		try {
			if (status.email.trim() === "") {
				tips(getError("00000", "Email"));
			}
			else if (!validateEmail(status.email)) {
				tips(getError("00100", "Your"));
			}
			else if (status.password === "") {
				tips(getError("00000", "Password"));
			} else {
				const res = await sendJson("signin", status.email, status.password);

				if (res.result) {
					setCookie({ account: { name: res.result.name, email: res.result.email } });
					navigate("/");
				} else {
					tips(getError(res.error));
				}
			}
		} catch (err) {
			console.log(err);
			Toast("Network Error", "error");
		}
		showLoading(false);
	};

	React.useLayoutEffect(() => {
		if (account !== null) {
			navigate("/");
		}
	}, []);

	return (
		<div className="container-fluid">
			<div className="row middle center" style={{ minHeight: "100vh" }}>
				<div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
					<div className="sign">
						<div className="flex center middle" style={{marginBottom: '2em'}}>
							<h3 className="text-primary">NeonLink Dashboard</h3>
						</div>
						<div className="flex column">
							<input
								type="email"
								className="form-control"
								placeholder="Email"
								value={status.email}
								onChange={(e) =>
									setStatus({
										...status,
										email: e.target.value,
									})
								}
							/>
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								value={status.password}
								onChange={(e) =>
									setStatus({
										...status,
										password: e.target.value,
									})
								}
							/>
						</div>
						<div className="flex middle justify-between">
							<button className="btn-primary" onClick={onSignIn}>Sign In</button>
						</div>
						{/* <div className="text-center">
							<small>Create one account{" "}</small>
							<Link to="/register">Sign Up</Link>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
