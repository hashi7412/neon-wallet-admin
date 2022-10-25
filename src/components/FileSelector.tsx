import React from "react";

interface Props {
    onChange?: any
}

interface Status {
    name: string
    value: string
}

const FileButton = ({ onChange }: Props) => {
    const [status, setStatus] = React.useState<Status>({
        name: "",
        value: ""
    });

    const onSelectFile = () => {
        setStatus({
            name: "Felix",
            value: "us"
        });
    }

    return (
        <label className="file-button">
            <input type="file" onChange={() => onSelectFile} />
            <span>
                <span className="text-info">{status.name !== "" ? "" : "Upload file"}</span>
            </span>
        </label>
    )
}

export default FileButton;