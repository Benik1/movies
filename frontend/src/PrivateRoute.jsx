import { useEffect } from 'react';
import {Outlet } from 'react-router-dom';
import { getProfile } from './store/user';
import { useDispatch, useSelector } from 'react-redux';

function PrivateRoute(props) {
  const dispatch = useDispatch();
  const { children } = props;

  const user = useSelector(state => state.user);
  const { profile, getProfileLoading  } = user;

  useEffect(() => {
    if(!profile) {
      dispatch(getProfile());
    }
  }, []);

  if(getProfileLoading) {
    return 'Please wait'
  }

  if(profile) {
    return children || <Outlet />;
  }
}

export default PrivateRoute;
