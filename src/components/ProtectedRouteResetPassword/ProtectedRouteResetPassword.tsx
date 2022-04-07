import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../services/actions/auth';
import { RootState } from '../../services/reducers/index';

interface IProtectedRoute extends RouteProps {
  children?: React.ReactNode;
}

export function ProtectedRouteResetPassword({ children, ...rest }: IProtectedRoute) {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const forgotPassword = useSelector((store: RootState) => store.forgotPassword);
  console.log(forgotPassword, "forgotPassword")

  const init = useCallback(async () => {
    setUserLoaded(true)
  }, [dispatch])

  useEffect(() => {
    init();
  }, [init]);

  if (!isUserLoaded) {
    return null
  }

  return (
    isUserLoaded ? (
      <Route
        {...rest}
        render={({ location }) =>
        forgotPassword.isPasswordForgotten ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/forgot-password'
              }}
            />
          )
        }
      />) : (<div></div>)
  );
}