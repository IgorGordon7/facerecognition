import React, {Component} from 'react';
import {connect} from "react-redux";
import {setSignInDataEmail, setSignInDataForSubmit, setSignInDataPassword} from "../../actions";


const mapStateToProps = (state) => {
    return {
        signInEmail: state.getSignInDataEmail.signInEmail,
        signInPassword: state.getSignInDataPassword.signInPassword,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEmailChange: (event) => dispatch(setSignInDataEmail(event.target.value)),
        onPasswordChange: (event) => dispatch(setSignInDataPassword(event.target.value)),
        onSubmitSignIn: (signInEmail, signInPassword) => dispatch(setSignInDataForSubmit(signInEmail, signInPassword))
    }
}


class Signin extends Component {

    render() {
        const {onSubmitSignIn, onEmailChange, onPasswordChange} = this.props
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={() => onSubmitSignIn(this.props.signInEmail, this.props.signInPassword)}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);