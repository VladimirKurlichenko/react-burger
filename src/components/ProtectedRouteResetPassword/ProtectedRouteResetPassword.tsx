import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from '../../types/hooks';

interface IProtectedRoute extends RouteProps {
  children?: React.ReactNode;
}

export function ProtectedRouteResetPassword({ children, ...rest }: IProtectedRoute) {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const forgotPassword = useSelector((store) => store.forgotPassword);
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