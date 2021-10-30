import useAuth from "./../Contexts/useAuth";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ children, ...rest }) {
  const { loggedIn, loading } = useAuth();
  if (loading) {
    return (
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute;
