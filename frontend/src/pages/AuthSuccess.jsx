import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Google login failed');
      navigate('/login');
    } else if (token) {
      localStorage.setItem('token', token);
      setToken(token);
      toast.success('Google login successful');
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, setToken]);

  return <div>Processing...</div>;
};

export default AuthSuccess;
