import { FC, useState } from "react";
import { User } from "../interfaces/User";
import { Button } from "primereact/button";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAppDispatch } from "../hooks/storeHook";
import { logout } from "../features/auth/authSlice";

interface ProfileCardProps {
  user: User;
}

const ProfileCard: FC<ProfileCardProps> = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    setLoading(true);
    await signOut(auth)
    dispatch(logout())
    setLoading(false);
  }

  const {
    user: { photoUrl, email },
  } = props;

  return (
    <>
      <p>{email}</p>
      <p>profile page</p>
      {photoUrl ? <div>there is a photo...</div> : <div>No photo</div>}
      <Button
        onClick={handleLogout}
        disabled={loading}
        type="submit"
        label={loading ? "" : "Logout?.."}
        className="mt-2 text-primary"
      >
        {loading && (
          <span className="p-input-icon-right p-input-icon-left text-primary">
            please wait...
            <i className="pi pi-spin pi-spinner" />
            <span className="p-input-icon-right p-input-icon-left">
              <i className="pi pi-spin pi-spinner">Please wait...</i>
            </span>
          </span>
        )}
      </Button>
    </>
  );
};

export default ProfileCard;