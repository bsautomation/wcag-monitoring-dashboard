import { React, useState } from 'react';
import { useGoogleLogin, GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
const constants = require('../../constants');

function Login({setToken}) {
  const clientId = constants.GOOGLE_CLIENT_ID;

  const onSuccess = (res) => {
    console.log(res)
    setToken({ email: res.profileObj.email, name: res.profileObj.name, token: res.tokenId, imageUrl: res.profileObj.imageUrl})
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  }

  return (
    <section className="login-block">
      <div className="auth-box card">
        <div className="card-block">
          <div className="col-md-12">
            <h1 className="text-center">Log In</h1>
          </div>
          <div className='text-center'>
            <GoogleLogin
              className= "btn-google text-uppercase"
              clientId = {clientId}
              onSuccess = {onSuccess}
              onFailure = {onFailure}
              cookiePolicy = {'single_host_origin'}
              isSignedIn = {true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
Login.propTypes = {
  setToken: PropTypes.func.isRequired
};