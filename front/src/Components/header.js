import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'solid 2px brown'
    }
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            signUpModalIsOpen: false,
            loginModalIsOpen: false,
            loginModal2IsOpen: false,
            email: '',
            pwd: '',
            FN: '',
            LN: '',
            isLoggedIn: false, userName: undefined
        }
    }

    signUp = () => {
        this.setState({ signUpModalIsOpen: true });
    }

    login = () => {
        this.setState({ loginModalIsOpen: true });
    }

    handleCancelSignUp = () => {
        this.setState({ signUpModalIsOpen: false });
    }

    handleCancelLogin = () => {
        this.setState({ loginModalIsOpen: false });
    }
    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }

    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }
    handleModal = (state, value) => {
        this.setState({ [state]: value })
    }

    handleSignUp = () => {
        const { email, pwd, FN, LN } = this.state;
        const signUpObj = {
            email: email,
            password: pwd,
            firstname: FN,
            lastname: LN
        };
        axios({
            method: 'POST',
            url: 'http://localhost:1234/signUp',
            headers: { 'Content-Type': 'application/json' },
            data: signUpObj
        })
            .then(response => {
                if (response.data.message == 'User signed up ') {
                    this.setState({
                        signUpModalIsOpen: false,
                        email: '',
                        pwd: '',
                        FN: '',
                        LN: ''
                    });
                    alert(response.data.message);
                }
            })
            .catch(err => console.log(err))
    }
   

    handleLogin = () => {
        const { email, pwd } = this.state;
        const loginObj = {
            email: email,
            password: pwd
        };
        axios({
            method: 'GET',
            url: 'http://localhost:1234/login',
            headers: { 'Content-Type': 'application/json' },
            data: loginObj
        })
            .then(response => {

                if (response.data.message == 'User Authenticated ') {
                this.setState({
                    isLoggedIn: response.data.isauthenticated,
                    loginModalIsOpen: false,
                    email: '',
                    pwd: '',
                                            });
                 console.log(email);

            }                
                sessionStorage.setItem('isLoggedIn', response.data.isauthenticated);
            })
            .catch(err => console.log(err))
    }

    handleLogo = () => {
        this.props.history.push('/');  
    }    
   

    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined });
    }

    render() {
        const { signUpModalIsOpen, loginModalIsOpen,loginModal2IsOpen,isLoggedIn, userName, email, pwd, FN, LN } = this.state;
        return (
            <div className="header">
                <div className="s-logo" onClick={this.handleLogo}>
                    <p>e!</p>
                </div>
              
                {isLoggedIn ? <div className="header-user">
                        <div className="login">{userName}</div>
                        <div className="signUp" onClick={this.handleLogout}>Logout</div>
                    </div> :
                        <div className="header-user">
                            <div className="login" onClick={this.login}>Login</div>
                            <div className="signUp" onClick={this.signUp}>Create an account</div>
                        </div>}
             
                <Modal
                isOpen={signUpModalIsOpen}

                    style={customStyles}
                >
                    <div>
                    <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('signUpModalIsOpen', false)}></div>
                            <form>
                        <h3>SignUp </h3>
                        <div><label class="form-label">Email</label><input type="text" class="form-control" value={email} onChange={(event) => this.handleChange(event, 'email')} /></div>
                        <div><label class="form-label">password</label><input type="password" class="form-control" value={pwd} onChange={(event) => this.handleChange(event, 'pwd')} /></div>
                        <div><label class="form-label">Firstname</label><input type="text" class="form-control" value={FN} onChange={(event) => this.handleChange(event, 'FN')} /></div>
                        <div><label class="form-label">Lastname</label><input type="text" class="form-control" value={LN} onChange={(event) => this.handleChange(event, 'LN')} /></div>
                        <button  style={{  marginTop: '5px' }} onClick={this.handleSignUp} class="btn btn-sm btn-primary ">SignUp</button>
                        <button style={{  margin: '5px 0px 0px 10px' }} class="btn btn-sm btn-danger" onClick={this.handleCancelSignUp}>Cancel</button>
                        </form>   </div>
                </Modal>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                    <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
         
                        <div class="login-heading">Login</div>
                        <div style={{ marginBottom: '2px' }}>
                            <GoogleLogin
                                clientId="745717577080-5uo0jrq7g23qqioe155h28u94a0co1cj.apps.googleusercontent.com"
                                buttonText="Continue with Gmail"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                className="btn google"
                                cookiePolicy={'single_host_origin'}
                            /></div>
                       
                        <button className="btn normal-login"  onClick={() => {this.handleModal('loginModal2IsOpen',true); 
                         this.handleModal('loginModalIsOpen', false)}}>
                            <span className="glyphicon glyphicon-user user-icon"></span>
                            Login with Credentials</button>
                        <hr />
                        <div>Don't have account? <span style={{ color: 'red' }} >SignUp</span></div>
                    </div>
                </Modal>
                <Modal
                isOpen={loginModal2IsOpen}

                    style={customStyles}
                >
                    <div>
                    <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('loginModal2IsOpen', false)}></div>
                            <form>
                        <h3>SignUp </h3>
                        <div><label class="form-label">Email</label><input type="text" class="form-control" value={email} onChange={(event) => this.handleChange(event, 'email')} /></div>
                        <div><label class="form-label">password</label><input type="password" class="form-control" value={pwd} onChange={(event) => this.handleChange(event, 'pwd')} /></div>
                       
                        <button  style={{  marginTop: '5px' }} onClick={this.handleLogin} class="btn btn-sm btn-primary ">Login</button>
                        <button style={{  margin: '5px 0px 0px 10px' }} class="btn btn-sm btn-danger" onClick={() => this.handleModal('loginModal2IsOpen', false)}>Cancel</button>
                        </form>   </div>
                </Modal>
             
               
            </div>
        )
    }
}

export default withRouter(Header);