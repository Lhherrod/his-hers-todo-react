import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useAppSelector } from "../hooks/storeHook";
import { useDispatch } from "react-redux";
import { openLogin } from "../features/auth/authSlice";

function Auth() {
  const { isOpened, isClosed } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      dispatch(openLogin());
    }, 1000);
  }, []);

  return (
    <div className="my-auto flex items-center justify-center h-screen">
      {isLoading && <p>Loading... 😀 Please wait...</p>}

      {!isLoading && (
        <div className="w-full">
          {isOpened && (
            <div>
              <Login />
            </div>
          )}

          {isClosed && (
            <div>
              <Register />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Auth;