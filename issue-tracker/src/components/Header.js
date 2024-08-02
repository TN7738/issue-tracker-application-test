import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    const headerLinks = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "Issue List",
            link: "/issuelist",
        },
        {
            title: "Add New Issue",
            link: "/issuelist/add",
        },
    ];

    return (
        <header className="bg-info py-3">
            <Container>
                <ul className="d-flex gap-3 py-0 my-0 px-0">
                    {headerLinks.map((headerLink) => (
                        <li key={headerLink.title}>
                            <Button variant="dark">
                                <Link
                                    to={headerLink.link}
                                    className="text-white text-decoration-none"
                                >
                                    {headerLink.title}
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </Container>
        </header>
    );
};

export default Header;
