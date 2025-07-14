import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experiences from "./Experiences";
import { Certificate } from "./Certificate";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { successMessage } from "../SignupLogin/NotificationService";
import { getBase64 } from "../Services/Utilities";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const handleFileChange = async (image: any) => {
    let picture: any = await getBase64(image);
    console.log(picture);
    let updatedProfile = { ...profile, picture: picture.split(",")[1] };
    dispatch(changeProfile(updatedProfile));
    successMessage("Success", "profile picture updated successfully");
  };
  const [] = useState([
    "React",
    "SpringBoot",
    "MongoDB",
    "HTML",
    "CSS",
    "JavaScript",
    "Node.js",
    "Express",
    "MySQL",
    "Python",
    "Django",
    "Figma",
    "Sketch",
    "Docker",
    "AWS",
  ]);
  const [] = useState([false, false, false, false]);
  const [] = useState(false);
  const { hovered, ref } = useHover();

  return (
    <div className="w-4/5 mx-auto">
      <div className="">
        <div className="relative">
          <img className="rounded-t-2xl" src="/profile/banner.jpg" alt="" />
          <div
            ref={ref}
            className="absolute flex items-center justify-center -bottom-1/3 left-3"
          >
            <Avatar
              className="!w-48 !h-48 boarder-mine-shfat-950 boarder-8 rounded-full"
              src={
                profile.picture
                  ? `data:image/jpeg;base64,${profile.picture}`
                  : "/Avatar.png"
              }
              alt=""
            />
            {hovered && (
              <Overlay
                className="!rounded-full"
                color="#000"
                backgroundOpacity={0.75}
              />
            )}
            {hovered && <IconEdit className="absolute z-[300] !w-6 !h-6" />}
            {hovered && (
              <FileInput
                onChange={handleFileChange}
                className="absolute [&_*]: !rounded-full z-[301] [&_*]:!h-full !h-full w-full"
                variant="transparent"
                accept="image/png,image/jpeg"
              />
            )}
          </div>
        </div>
      </div>
      <Info />
      <Divider ms="xs" size="xs" my="xl" color="bright-sun.7" />
      <About />
      <Divider ms="xs" size="xs" my="xl" color="bright-sun.7" />
      <Skills />
      <Divider ms="xs" size="xs" my="xl" color="bright-sun.7" />
      <Experiences />
      <Divider ms="xs" size="xs" my="xl" color="bright-sun.7" />
      <Certificate />
    </div>
  );
};
export default Profile;
