import React from "react";
import styled from "styled-components";
import Icon from "../components/Icon";
import useStore, { tips, validateUrl } from "../useStore";


const Form = styled.div`
    width: 70%;
    margin: auto;

    @media (max-width: 960px) {
        width: 100%;
    }
`

const InputForm = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5em;

    @media (max-width: 767px) {
        flex-direction: column;
        align-items: flex-start;

        >* {
            width: 100%;
        }
    }

    > span {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 200px;

        >div {
            width: 30px !important;
            height: 30px !important;
        }
    }

    > input { 
        flex: 1;
        font-size: 1em;
        height: 40px;
        padding: 10px 10px;
        border: 1px solid #333;
        outline: 0;
        border-radius: 5px;
        background: black;
        color: var(--color);
        transition: all ease-in 0.3s;

        &:hover, &:focus {
            box-shadow: 0px 0px 5px 3px rgba(255, 255, 255, 0.1);
        }

        &:disabled {
            background: #222222 !important;
        }
    }

    .btn-group {
        display: flex;
        gap: 10px;
        width: 200px;

        >button {
            flex: 1;
            font-size: 1em;
            max-width: 90px;
            height: 40px;
            padding: 10px 10px;
            outline: 0;
            border-radius: 2px;
            color: var(--color);
            transition: all ease-in 0.3s;
            cursor: pointer;
    
            &:hover {
                box-shadow: 0px 0px 5px 3px rgba(255, 255, 255, 0.1);
                opacity: 0.5;
            }

            &.btn-primary{
                border: 1px solid #337ab7;
                background: #337ab7;
            }
            &.btn-success{
                border: 1px solid #4cae4c;
                background: #4cae4c;
            }
            &.btn-danger{
                border: 1px solid #d43f3a;
                background: #d43f3a;
            }
        }
    }
`

interface ItemType {
    label: string
    icon: any
    value: string
    enable: boolean
}

const items = {
    extension: {
        label: "Chrome Extension",
        icon: <Icon icon="Chrome" />,
        value: "",
        enable: false,
    },
    iphone: {
        label: "IOS App",
        icon: <Icon icon="App" />,
        value: "",
        enable: false,
    },
    android: {
        label: "Android App",
        icon: <Icon icon="GooglePlay" />,
        value: "",
        enable: false,
    }
} as {[key: string]: ItemType}

const Wallets = () => {
    const { sendJson, showLoading } = useStore();
    const [data, setData] = React.useState<{[key: string]: ItemType}>(items);

    const getData = async () => {
        showLoading(true);
        const res = await sendJson("get-wallet");

        if (res.result) {
            const d = {} as {[key: string]: ItemType}
            for (let k in res.result) {
                d[k] = {...data[k], value: res.result[k]};
            }
            setData(d);
        }
        showLoading(false);
    }

    const setWallet = async (key: string) => {
		showLoading(true);
        if (!validateUrl(data[key].value)) {
            tips(`Invalid url`);
        } else {
            const res = await sendJson("set-wallet", key, data[key].value);
    
            if (res.result) {
                tips(`Set ${key} successfully`);
                setData({...data, [key]: {...data[key], enable: false}});
            } else {
                console.log(res.error);
            }
        }
		showLoading(false);
    }

    React.useLayoutEffect(() => {
        getData();
    }, []);

    return (
        <div className="side-container">
            <h2>Download Wallet</h2>
            <Form>
                {Object.keys(data).map(k=>(
                    <InputForm key={k}>
                        <span>{data[k].icon}{data[k].label}</span>
                        <input type="text" value={data[k].value} onChange={(e) => setData({ ...data, [k]: {...data[k], value: e.target.value} })} disabled={!data[k].enable} />
                        <div className="btn-group">
                            {!data[k].enable ? (
                                <button className="btn btn-primary" onClick={() => setData({ ...data, [k]: {...data[k], enable: true} })}>Set</button>
                            ) : (
                                <>
                                    <button className="btn btn-success" onClick={() => setWallet(k)}>Save</button>
                                    <button className="btn btn-danger" onClick={() => setData({ ...data, [k]: {...data[k], enable: false} })}>Cancel</button>
                                </>
                            )}
                        </div>
                    </InputForm>
                ))}
            </Form>
        </div>
    )
}

export default Wallets;