import React, { Component } from "react";
import Authform from "./Authform";
import mutation from "../mutations/Signup";
import { graphql } from "react-apollo";
import Header from "./Header";
import query from "../queries/CurrentUser";
import hashHistory from "react-router";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    // this.props // the old current set of props
    // nextProps //the next set of props that will be in place
    // when component rerenders
    if (nextProps.data.user && !this.props.data.user) {
      //  redirect to dashboard
      hashHistory.push("/dashboard");
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <Header />
        <h3>Signup</h3>
        <Authform
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(SignupForm));
