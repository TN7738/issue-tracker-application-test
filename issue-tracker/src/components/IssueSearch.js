import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const IssueSearch = ({ handleSearch }) => {
    const [text, setText] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleSearch(text);
    };

    return (
        <div className="d-flex gap-1">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="rounded border border-dark px-3 py-1"
                    placeholder="Search by Owner name"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></input>
                <Button variant="dark" type="submit">
                    <Search />
                </Button>
            </form>
        </div>
    );
};

export default IssueSearch;
