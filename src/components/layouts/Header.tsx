import React from "react";
import { FaBars } from "react-icons/fa";

import user from "../../assets/images/user.jpg";
import useStore, { tips } from "../../useStore";
import Modal from "../Modal";

interface PasswordStatus {
    curPass: string
    newPass: string
    rePass: string
}

const initPass = {
    curPass: "",
    newPass: "",
    rePass: ""
}

export default function Header(props: any) {
    const { logout, account, navigate, sendJson, showLoading } = useStore();
    const { ToggleSidebar } = props;
    const [flag, setFlag] = React.useState(false);
    const [modal, setModal] = React.useState(false);

    const [pass, setPass] = React.useState<PasswordStatus>(initPass);

    const ToggleActive = () => {
        setFlag(!flag);
    };

    const Logout = async () => {
        logout();
    };

    const submit = async () => {
        showLoading(true);
        if (pass.newPass === "") {
            tips("Please enter your password");
        } else if (pass.newPass !== pass.rePass) {
            tips("Password not match");
        } else {
            const res = await sendJson("reset-password", account.email, pass.curPass, pass.newPass);
            if (res.result) {
                tips("Set password successful");
                setPass(initPass);
                setModal(false);
            } else {
                if (res.error === 20010) {
                    tips("Password incorrect");
                } else {
                    tips("Network error");
                    console.log(res.error);
                }
            }
        }
        showLoading(false);
    }

    React.useLayoutEffect(() => {
        if (account === null) {
            navigate("/login");
        }
    }, [])

    return (
        <>
            {account && (
                <div className="header">
                    <nav className="navbar">
                        <button onClick={ToggleSidebar}>
                            <FaBars />
                        </button>
                        <span>
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                            />
                        </span>
                        <div onBlur={() =>
                            setTimeout(() => {
                                setFlag(false);
                            }, 400)
                        }>
                            <button onClick={ToggleActive}>
                                <img src={user} alt="" />
                                <span>{account.name}</span>
                            </button>

                            <div
                                style={
                                    flag ? { display: "block" } : { display: "none" }
                                }
                                onFocus={() => setFlag(true)}
                            >
                                <button onClick={() => setModal(true)}>Reset Password</button>
                                <button onClick={Logout}>Log Out</button>
                            </div>
                        </div>
                    </nav>
                </div>
            )}

            {modal && (
                <Modal onClose={() => setModal(false)}>
                    <div>
                        <label className="input-form">
                            <span>Current Password</span>
                            <input type="password" value={pass.curPass} onChange={(e) => setPass({ ...pass, curPass: e.target.value })} />
                        </label>
                        <label className="input-form">
                            <span>New Password</span>
                            <input type="password" value={pass.newPass} onChange={(e) => setPass({ ...pass, newPass: e.target.value })} />
                        </label>
                        <label className="input-form">
                            <span>Confirm Password</span>
                            <input type="password" value={pass.rePass} onChange={(e) => setPass({ ...pass, rePass: e.target.value })} />
                        </label>
                        <div className="text-right">
                            <button className="btn-default mr2" onClick={submit}>OK</button>
                            <button className="btn-default mr2" onClick={() => setModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
