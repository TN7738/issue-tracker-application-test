import React, { useState } from "react";
import { ADD_ISSUE } from "../mutations/issueMutation";
import { useMutation } from "@apollo/client";
import { GET_ISSUES } from "./IssueList";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { options } from "../utils/dropdownOptions";

const IssueAdd = () => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [status, setStatus] = useState("");
    const [owner, setOwner] = useState("");
    const [effort, setEffort] = useState(0);
    const [created, setCreated] = useState("");
    const [due, setDue] = useState("");
    const [title, setTitle] = useState("");

    const [formError, setFormError] = useState(false);

    const [addIssue] = useMutation(ADD_ISSUE, {
        variables: {
            status: status,
            owner: owner,
            effort: parseInt(effort),
            created: created,
            due: due,
            title: title,
        },
        update: (cache, { data: { addIssue } }) => {
            const { issues } = cache.readQuery({
                query: GET_ISSUES,
                variables: {
                    status: status,
                    owner: owner,
                    effort: effort,
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

    const handleOnSelect = (val) => {
        setStatus(val);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (
            status === "" ||
            owner === "" ||
            effort === "" ||
            created === "" ||
            title === ""
        ) {
            setFormError(true);
        } else {
            setFormError(false);
            addIssue();
            navigate("/issuelist");
            // const newIssue = {
            //     id: id,
            //     status: status,
            //     owner: owner,
            //     effort: effort,
            //     created: created,
            //     due: due,
            //     title: title,
            // };

            // setIssueList((current) => [...current, newIssue]);

            setId("");
            setStatus("");
            setOwner("");
            setEffort(0);
            setCreated("");
            setDue("");
            setTitle("");
        }
    };

    // const arr1 = [1, 2, 3];
    // console.log("arr1", arr1);
    // const arr2 = [...arr1, 4];
    // console.log("arr2", arr2);

    return (
        <div className="add-issue-wrapper">
            <h1>Add a new Issue</h1>
            <form
                className="p-4 border border-info rounded w-50 d-flex flex-column gap-2"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="status">
                        Status:<span>*</span>
                    </label>
                    <Dropdown variant="secondary">
                        <Dropdown.Toggle variant="secondary">
                            {status ? status : "Status"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {options.map((option) => (
                                <Dropdown.Item
                                    key={option}
                                    href="#"
                                    onClick={() => handleOnSelect(option)}
                                    active={status === option}
                                >
                                    {option}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="owner">
                        Owner:<span>*</span>
                    </label>
                    <input
                        id="owner"
                        type="text"
                        value={owner}
                        className="form-control"
                        onChange={(e) => setOwner(e.target.value)}
                    ></input>
                </div>
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="effort">
                        Effort:<span>*</span>
                    </label>
                    <input
                        id="effort"
                        type="number"
                        value={effort}
                        className="form-control"
                        onChange={(e) => setEffort(e.target.value)}
                    ></input>
                </div>
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="created">
                        Created:<span>*</span>
                    </label>
                    <input
                        id="created"
                        type="date"
                        value={created}
                        className="form-control"
                        onChange={(e) => setCreated(e.target.value)}
                    ></input>
                </div>
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="due">Due:</label>
                    <input
                        id="due"
                        type="date"
                        value={due}
                        className="form-control"
                        onChange={(e) => setDue(e.target.value)}
                    ></input>
                </div>
                <div className="form-group d-flex flex-column align-items-start">
                    <label htmlFor="title">
                        Title:<span>*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <p className={`error ${formError ? "show" : ""}`}>
                    All mandatory fields are required.
                </p>
                <Button variant="dark" className="" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default IssueAdd;
