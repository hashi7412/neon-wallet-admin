import React from "react";

interface Props {
    children?: JSX.Element | null
    onClose: any
}

const Modal = ({ children, onClose }: Props) => {
    return (
        <div className="modal">
            <div className="modal-container">
                <div className="modal-header">
                    <span className="modal-cancel-btn" onClick={onClose}>&times;</span>
                </div>
                <div className="modal-content">
                    {children}
                </div>
                <div className="modal-footer"></div>
            </div>
        </div>
    )
}

export default Modal;