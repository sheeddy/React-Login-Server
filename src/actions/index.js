import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
 } from './types';

const ROOT_URL = 'http://localhost:3002';

export function signupUser({email, password}){
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    })
    .catch(({response})=> {
      /* console.log('el error 2 es:'+ response.data.error) */
      dispatch(authError(response.data.error))
    });
  }
}

export function signinUser({email, password}){
  return (dispatch) =>  {
    // submit email/password
    axios.post(`${ROOT_URL}/signin`, {email, password})
    .then(response => {
      // update state to indicat user is authenticated
      dispatch({ type: AUTH_USER });
      // Save  the Token
      localStorage.setItem('token', response.data.token);
      // redirect to route
      browserHistory.push('/feature');
    })
    .catch((error) => {
      // if error
      dispatch(authError('Bad Login Info'))
    })
  };
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      console.log(response)
      console.log(response.data.message)
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
    })
  }
}