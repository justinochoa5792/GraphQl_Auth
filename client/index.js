import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, hashHistory, Route, IndexRoute } from "react-router";

const networkInterface = createNetworkInterface({
  uri: "/graphql",
  opts: {
    credentials: "same-origin",
  },
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return <div>HI</div>;
};

ReactDOM.render(<Root />, document.querySelector("#root"));
