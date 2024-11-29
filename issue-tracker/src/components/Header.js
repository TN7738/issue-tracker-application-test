import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <Container>
                <ul className="d-flex px-2 py-3 gap-3">
                    <li>
                        <Button variant="outline-primary">
                            <Link to="/">Home</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="outline-primary">
                            <Link to="/issuelist">Issue List</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="outline-primary">
                            <Link to="/issuelist/issueadd">Add New Issue</Link>
                        </Button>
                    </li>
                </ul>
            </Container>
        </header>
    );
};

export default Header;
