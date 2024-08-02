import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import IssueList from "./components/IssueList";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Body from "./components/Body";
import Homepage from "./components/Homepage";
import IssueDetails from "./components/IssueDetails";
import IssueAdd from "./components/IssueAdd";
import IssueUpdate from "./components/IssueUpdate";
import "bootstrap/dist/css/bootstrap.min.css";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                issues: {
                    merge: (existing, incoming) => incoming,
                },
            },
        },
    },
});

const client = new ApolloClient({
    uri: "/graphql",
    cache,
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/issuelist",
                element: <IssueList />,
            },
            {
                path: "/issuelist/add",
                element: <IssueAdd />,
            },
            {
                path: "/issuelist/:issueid",
                element: <IssueDetails />,
            },
            {
                path: "/issuelist/update/:issueid",
                element: <IssueUpdate />,
            },
            {
                path: "*",
                element: <p>404 Not Found</p>,
            },
        ],
    },
]);

function App() {
    return (
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    );
}

export default App;
