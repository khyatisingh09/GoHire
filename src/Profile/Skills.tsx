import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";
import { changeProfile } from "../Slices/ProfileSlice";
import { successMessage } from "../SignupLogin/NotificationService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skills } from "../Data/JobDescData";

const SkillsComp = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const [Skills, setSkills] = useState<string[]>(profile.skills || []); // Initialize with profile data

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile.about);
    } else setEdit(false);
  };

  useEffect(() => {
    setSkills(profile.skills);
  }, [profile.skills]);

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, skills: Skills };
    dispatch(changeProfile(updatedProfile));
    console.log(updatedProfile);
    successMessage("Skills", "skills updated successfully."); // Exit edit mode
    // Add logic here to save 'about' data if needed (e.g., update the profile)
    // Example: dispatch(updateProfile({ ...profile, about }));
  };
  console.log(Skills);
  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills
        <div>
          {edit && (
            <ActionIcon
              color="bright-sun.5"
              onClick={handleSave}
              variant="subtle"
              aria-label="Settings"
            >
              <IconCheck className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={handleClick}
            variant="subtle"
            aria-label="Settings"
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
        <TagsInput
          placeholder="Add skill"
          value={Skills || []}
          onChange={setSkills}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {Skills?.map((skill: any, index: number) => (
            <div
              key={index}
              className="bg-bright-sun-300 rounded-3xl px-3 py-1 text-sm font-medium bg-opacity=15 text-bright-sun-400"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SkillsComp;
