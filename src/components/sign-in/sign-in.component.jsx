import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, SignInWithGoogle, SignInWithTwitter } from "../../firebase/firebase.utils";

import { ReactComponent as GoogleLogo } from '../../assets/google.svg';
import { ReactComponent as TwitterLogo } from '../../assets/twitter.svg';
import { ReactComponent as FacebookLogo } from '../../assets/facebook.svg';
import { ReactComponent as GitHubLogo } from '../../assets/github.svg';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch (err) {
            console.error(err)
        }
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }


    render() {
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit} >
                    <FormInput
                        name="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <div className="sign-in-options">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <span>Or login using...</span>
                        <div className="sign-in-firebase">
                            <CustomButton type="button" onClick={SignInWithGoogle} isGoogleSignIn>
                                <GoogleLogo className="logo" />
                            </CustomButton>
                            <CustomButton type="button" onClick={SignInWithTwitter}>
                                <TwitterLogo className="logo" />
                            </CustomButton>
                            <CustomButton>
                                <FacebookLogo className="logo" />
                            </CustomButton>
                            <CustomButton>
                                <GitHubLogo className="logo" />
                            </CustomButton>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn