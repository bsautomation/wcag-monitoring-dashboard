import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    var currentTime = new Date().getTime();
    if (currentTime < userToken?.expiresAt){
      return userToken?.token
    }else{
      return undefined;
    }
  };

  const getUser = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.name
  };
  const getimageUrl = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.imageUrl
  };

  const [token, setToken] = useState(getToken());
  const [user] = useState(getUser());
  const [image] = useState(getimageUrl());

  const saveToken = userToken => {
    var date = new Date();
    userToken.expiresAt = date.setDate(date.getDate() + 3);
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
    user,
    image
  }
}