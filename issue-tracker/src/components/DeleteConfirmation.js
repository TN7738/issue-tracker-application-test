import React from "react";
import { Button } from "react-bootstrap";

const DeleteConfirmation = ({ setDeleteIssueId, deleteIssue }) => {
    const handleYesClick = () => {
        deleteIssue();
        setDeleteIssueId("");
    };

    const handleNoClick = () => {
        setDeleteIssueId("");
    };

    return (
        <div className="position-fixed d-flex align-items-center justify-content-center top-0 start-0 bottom-0 end-0 bg-dark opacity-75">
            <div className="bg-white p-4 rounded">
                <h4>Are you sure you want to delete issue?</h4>
                <div className="d-flex justify-content-center gap-4 pt-4">
                    <Button
                        variant="primary"
                        className="w-25"
                        onClick={handleYesClick}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="danger"
                        className="w-25"
                        onClick={handleNoClick}
                    >
                        No
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
