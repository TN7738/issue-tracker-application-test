import { useEffect, useState } from "react";
import IssueAdd from "./IssueAdd";
import IssueSearch from "./IssueSearch";
import IssueTable from "./IssueTable";
import { gql, useMutation, useQuery } from "@apollo/client";
import IssueFilter from "./IssueFilter";
import { Link } from "react-router-dom";
import { FILTERED_ISSUES } from "../mutations/issueMutation";

export const GET_ISSUES = gql`
    query getIssues {
        issues {
            id
            status
            owner
            effort
            created
            due
            title
        }
    }
`;

const IssueList = () => {
    const [issueFilter, setIssueFilter] = useState({
        owner: "",
        status: "",
    });

    const { loading, error, data } = useQuery(GET_ISSUES);

    const [filterIssues] = useMutation(FILTERED_ISSUES, {
        variables: {
            status: issueFilter.status,
            owner: issueFilter.owner,
        },
        update: (cache, { data: { filterIssues } }) => {
            cache.writeQuery({
                query: GET_ISSUES,
                data: { issues: filterIssues },
            });
        },
    });

    const handleSearch = (text) => {
        setIssueFilter((currIssueFilter) => ({
            ...currIssueFilter,
            owner: text,
        }));
    };

    const handleFilter = (status) => {
        setIssueFilter((currIssueFilter) => ({
            ...currIssueFilter,
            status: status,
        }));
    };

    useEffect(() => {
        filterIssues();
    }, [issueFilter]);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) return <p>Error!</p>;

    return (
        <>
            {!loading && !error && (
                <>
                    <div className="d-flex gap-5">
                        <IssueSearch handleSearch={handleSearch} />
                        <IssueFilter handleFilter={handleFilter} />
                    </div>
                    <h2>Issue List</h2>
                    <IssueTable issues={data.issues} />
                </>
            )}
        </>
    );
};

export default IssueList;
