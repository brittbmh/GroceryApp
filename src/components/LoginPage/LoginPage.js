import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";


class LoginPage extends Component {
    state = {
        username: '',
        password: '',
    };

    login = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'LOGIN',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
        } else {
            this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    } // end login

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                {this.props.errors.loginMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.loginMessage}
                    </h2>
                )}
                <form onSubmit={this.login}>
                    <h1>Login</h1>
                    <div>
                        <label htmlFor="username">
                            username:
              <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChangeFor('username')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="password">
                            password:
              <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChangeFor('password')}
                            />
                        </label>
                    </div>
                    <div>
                        <AwesomeButton type="primary">Login</AwesomeButton>
                        {/* <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            /> */}
                    </div>
                </form>
                <center>
                    <button
                        type="button"
                        className="link-button"
                        onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                    >
                        Register
          </button>
                </center>
            </div>
        );
    }
}

const mapStateToProps = ({ errors }) => ({ errors });
// const mapStateToProps = state => ({
//     errors: state.errors,
// });

export default connect(mapStateToProps)(LoginPage);