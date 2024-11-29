import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_ISSUE } from "../mutations/issueMutation";
import { GET_ISSUES } from "./IssueList";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";

const IssueAdd = () => {
    const [id, setId] = useState("");
    const [status, setStatus] = useState("");
    const [owner, setOwner] = useState("");
    const [effort, setEffort] = useState(0);
    const [created, setCreated] = useState("");
    const [due, setDue] = useState("");
    const [title, setTitle] = useState("");

    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const options = ["New", "Pending", "Assigned", "Completed"];

    const [addIssue] = useMutation(ADD_ISSUE, {
        variables: {
            status: status,
            owner: owner,
            effort: parseInt(effort),
            created: created,
            due: due,
            title: title,
        },
        // onCompleted: (newIssue) => {
        //     setId(newIssue.addIssue.id);
        // },
        update: (cache, { data: { addIssue } }) => {
            const { issues } = cache.readQuery({
                query: GET_ISSUES,
                variables: {
                    status: status,
                    owner: owner,
                    effort: parseInt(effort),
                    created: created,
                    due: due,
                    title: title,
                },
            });
            cache.writeQuery({
                query: GET_ISSUES,
                data: { issues: issues.concat([addIssue]) },
            });
        },
    });

    const clearForm = () => {
        setStatus("");
        setOwner("");
        setEffort(0);
        setCreated("");
        setDue("");
        setTitle("");
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (
            status === "" ||
            owner === "" ||
            effort === 0 ||
            created === "" ||
            title === ""
        ) {
            setIsError(true);
        } else {
            setIsError(false);
            addIssue();
            clearForm();
            navigate("/issuelist");
        }
    };

    return (
        <>
            <h4>Create New Issue</h4>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="p-4 border border-info rounded w-50 d-flex flex-column gap-2"
            >
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="status">
                        Status: <span className="star">*</span>
                    </label>
                    <Dropdown variant="secondary">
                        <Dropdown.Toggle variant="secondary">
                            {status === "" ? "Status" : status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {options.map((option) => (
                                <Dropdown.Item
                                    key={option}
                                    href="#"
                                    onClick={() => setStatus(option)}
                                    active={status === option}
                                >
                                    {option}
                                </Dropdown.Item>
                            ))}
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => setStatus("")}>
                                Reset Filter
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="owner">
                        Owner: <span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        className="rounded border border-dark px-3 py-1 w-100"
                        id="owner"
                        name="owner"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    ></input>
                </div>
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="effort">
                        Effort: <span className="star">*</span>
                    </label>
                    <input
                        type="number"
                        className="rounded border border-dark px-3 py-1 w-100"
                        id="effort"
                        name="effort"
                        value={effort}
                        onChange={(e) => setEffort(e.target.value)}
                    ></input>
                </div>
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="created">
                        Created: <span className="star">*</span>
                    </label>
                    <input
                        type="date"
                        className="rounded border border-dark px-3 py-1 w-100"
                        id="created"
                        name="created"
                        value={created}
                        onChange={(e) => setCreated(e.target.value)}
                    ></input>
                </div>
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="due">Due:</label>
                    <input
                        type="date"
                        className="rounded border border-dark px-3 py-1 w-100"
                        id="due"
                        name="due"
                        value={due}
                        onChange={(e) => setDue(e.target.value)}
                    ></input>
                </div>
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="title">
                        Title: <span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        className="rounded border border-dark px-3 py-1 w-100"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                {isError && (
                    <p className="error">All required fields are mandatory</p>
                )}
                <Button
                    as="input"
                    type="submit"
                    value="Submit"
                    className="w-100 mt-3"
                />
            </form>
        </>
    );
};

export default IssueAdd;
