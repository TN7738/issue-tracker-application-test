import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_ISSUE } from "./IssueDetails";
import { UPDATE_ISSUE } from "../mutations/issueMutation";
import { Button, Dropdown } from "react-bootstrap";
import { options } from "../utils/dropdownOptions";

const IssueUpdate = () => {
    const navigate = useNavigate();
    const { issueid } = useParams();

    const { error, loading, data } = useQuery(GET_ISSUE, {
        variables: {
            id: issueid,
        },
    });

    const [newIssue, setNewIssue] = useState({});

    const [updateIssue] = useMutation(UPDATE_ISSUE, {
        variables: {
            id: newIssue.id,
            status: newIssue.status,
            owner: newIssue.owner,
            effort: newIssue.effort,
            created: newIssue.created,
            due: newIssue.due,
            title: newIssue.title,
        },
        update: (cache, { data: { updateIssue } }) => {
            const { issue } = cache.readQuery({
                query: GET_ISSUE,
                variables: {
                    id: issueid,
                },
            });
            cache.writeQuery({
                query: GET_ISSUE,
                data: { issue },
            });
        },
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        updateIssue();
        navigate("/issuelist");
    };

    const handleOnSelect = (val) => {
        setNewIssue((currNewIssue) => ({ ...currNewIssue, status: val }));
    };

    useEffect(() => {
        if (data && "issue" in data) {
            setNewIssue({
                id: data.issue.id,
                status: data.issue.status,
                owner: data.issue.owner,
                effort: data.issue.effort,
                created: data.issue.created,
                due: data.issue.due,
                title: data.issue.title,
            });
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error!!!</p>;

    return (
        <>
            {!loading && !error && newIssue.id !== undefined && (
                <div className="add-issue-wrapper">
                    <h1>Create a new Issue</h1>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="p-4 border border-info rounded w-50 d-flex flex-column gap-2"
                    >
                        <div className="form-group d-flex flex-column align-items-start">
                            <label htmlFor="status">
                                Status:<span>*</span>
                            </label>
                            <Dropdown variant="secondary">
                                <Dropdown.Toggle variant="secondary">
                                    {newIssue.status
                                        ? newIssue.status
                                        : "Status"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {options.map((option) => (
                                        <Dropdown.Item
                                            key={option}
                                            href="#"
                                            onClick={() =>
                                                handleOnSelect(option)
                                            }
                                            active={newIssue.status === option}
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
                                value={newIssue.owner}
                                className="form-control"
                                onChange={(e) =>
                                    setNewIssue((currNewIssue) => ({
                                        ...currNewIssue,
                                        owner: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <div className="form-group d-flex flex-column align-items-start">
                            <label htmlFor="effort">
                                Effort:<span>*</span>
                            </label>
                            <input
                                id="effort"
                                type="number"
                                value={newIssue.effort}
                                className="form-control"
                                onChange={(e) =>
                                    setNewIssue((currNewIssue) => ({
                                        ...currNewIssue,
                                        effort: parseInt(e.target.value),
                                    }))
                                }
                            ></input>
                        </div>
                        <div className="form-group d-flex flex-column align-items-start">
                            <label htmlFor="created">
                                Created:<span>*</span>
                            </label>
                            <input
                                id="created"
                                type="date"
                                value={newIssue.created}
                                className="form-control"
                                onChange={(e) =>
                                    setNewIssue((currNewIssue) => ({
                                        ...currNewIssue,
                                        created: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <div className="form-group d-flex flex-column align-items-start">
                            <label htmlFor="due">Due:</label>
                            <input
                                id="due"
                                type="date"
                                value={newIssue.due}
                                className="form-control"
                                onChange={(e) =>
                                    setNewIssue((currNewIssue) => ({
                                        ...currNewIssue,
                                        due: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <div className="form-group d-flex flex-column align-items-start">
                            <label htmlFor="title">
                                Title:<span>*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={newIssue.title}
                                className="form-control"
                                onChange={(e) =>
                                    setNewIssue((currNewIssue) => ({
                                        ...currNewIssue,
                                        title: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <Button variant="dark" className="" type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
};

export default IssueUpdate;
