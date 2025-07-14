import { Avatar, Button, Indicator, NavLink } from "@mantine/core";
import { IconBellPlus, IconSettingsCode, IconZoomCodeFilled } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user && user.profileId) {
      getProfile(user.profileId)
        .then((res) => {
          dispatch(setProfile(res));
        })
        .catch((err) => console.log(err));
    }
  }, [user, dispatch]);

  const location = useLocation();

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="w-full bg-mine-shaft-950 px-6 text-white h-20 flex justify-between
      items-center font-['poppins']">
      <div className="flex gap-1 items-center text-bright-sun-400">
        <IconZoomCodeFilled className="h-8 w-8" stroke={1.25} />
        <div className="text-3xl font-semibold">Go  Hire</div>
      </div>
      {NavLinks()}
      <div className="flex gap-3 item-center">
        <div className="flex items-center gap-2">
          {user && user.profileId ?  <ProfileMenu />: 
            <Link to="/login">
              <Button variant="subtle" color="text-bright-sun-400"> Login</Button>
            </Link>
          }
          {user ? <NotiMenu /> : <></>}
        </div>
      </div>
    </div>
  ) : 
    <></>  
};
export default Header;
