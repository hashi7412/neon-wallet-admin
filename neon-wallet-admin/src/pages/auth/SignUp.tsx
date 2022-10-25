import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthObject } from "../../components/interfaces";
import useStore, { tips, validateEmail } from "../../useStore";
import { Toast } from "../../utils/message";

export default function Register() {
    const { T, sendJson, navigate, getError } = useStore();
    const [data, setdata] = useState<AuthObject>({
        name:               "",
        email:              "",
        password:           "",
        repassword:         "",
    });

    const HandleSignUp = async () => {
        try {
            if (data.name?.trim() === "") {
                tips(getError("00000", "Username"));
            } else if (data.email.trim() === "") {
                tips(getError("00000", "Email"));
            } else if (!validateEmail(data.email.trim())) {
                tips(getError("00100", "Email"));
            } else if (data.password === "") {
                tips(getError("00000", "Password"));
            } else if (data.password !== data.repassword) {
                tips(getError("10002"));
            } else {
                let res = await sendJson("signup", data.name, data.email, data.password);
                console.log(res);

                if (res.result) {
                    tips(T("register.success"));
                    navigate("/login");
                } else {
                    tips(getError(res.error));
                }
            }
        } catch (err) {
            console.log(err);
            Toast("Network Error", "error");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row middle center" style={{ minHeight: "100vh" }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="sign">
                        <div className="flex center middle">
                            <h3 className="text-primary">Sign Up</h3>
                        </div>
                        <div className="flex column">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={data.name}
                                onChange={(e: any) =>
                                    setdata({
                                        ...data,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={data.email}
                                onChange={(e: any) =>
                                    setdata({
                                        ...data,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={data.password}
                                onChange={(e: any) =>
                                    setdata({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm password"
                                value={data.repassword}
                                onChange={(e: any) =>
                                    setdata({
                                        ...data,
                                        repassword: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex middle justify-between">
                            <button
                                className="btn-primary"
                                onClick={HandleSignUp}
                            >
                                Sign Up
                            </button>
                        </div>
                        <div className="text-center">
                            <small>Already have an Account?{" "}</small>
                            <Link to="/login">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
