import ProfileCard from "../components/ProfileCard";
import { useAppSelector } from "../hooks/storeHook";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  
  return <>{user && <ProfileCard user={user} />}</>;
};

export default Profile;