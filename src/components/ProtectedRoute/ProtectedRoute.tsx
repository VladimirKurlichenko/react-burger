import { Route, Redirect, RouteProps} from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from '../../types/hooks';
import { getUserData } from '../../services/actions/auth';

export function ProtectedRoute({ children, ...rest }: RouteProps) {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const user = useSelector((store) => store.user);

  const init = useCallback(async () => {
    await dispatch(getUserData())
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
          user.username ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
      />) : (<div></div>)
  );
}