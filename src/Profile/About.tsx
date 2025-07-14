import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successMessage } from "../SignupLogin/NotificationService";

const About = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState(profile?.about || ""); // Initialize with profile data

  const handleClick = () => {
    if(!edit){
      setEdit(true);
      setAbout(profile.about);
    }
    else setEdit(false);
  }

  const handleSave = () => {
    setEdit(false);
    let updatedProfile={...profile, about:about};
      dispatch(changeProfile(updatedProfile));
      console.log(updatedProfile);
      successMessage("success", "About updated successfully.");  // Exit edit mode
    // Add logic here to save 'about' data if needed (e.g., update the profile)
    // Example: dispatch(updateProfile({ ...profile, about }));
  };
  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
        <div className="flex gap-2">
          {edit && (
            <ActionIcon
              color="bright-sun.5"
              onClick={handleSave}
              variant="subtle"
              aria-label="Save"
            >
              <IconCheck className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={handleClick}
            variant="subtle"
            aria-label="Edit"
            color={edit ? "red.8" : "bright-sun"}
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" stroke={1.5} />
            ) : (
              <IconEdit className="w-4/5 h-4/5" stroke={2} />
            )}
          </ActionIcon>
        </div>
      </div>
      {edit ? (
        <Textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          autosize
          minRows={2}
          placeholder="Enter about yourself"
        />
      ) : (
        <div className="text-sm text-mine-shaft-300 text-justify">
          {profile?.about || about} {/* Display current about info */}
        </div>
      )}
    </div>
  );
};
export default About;

