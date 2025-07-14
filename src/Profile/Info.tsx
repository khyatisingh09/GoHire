import { ActionIcon, NumberInput } from "@mantine/core";
import {
  IconFilePlus,
  IconEdit,
  IconBriefcase,
  IconMapPins,
  IconCheck,
  IconX,
  IconBriefcase2,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successMessage } from "../SignupLogin/NotificationService";

const Info = () => {
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);

  const form = useForm({
    mode: "controlled",
    initialValues: { jobTitle: "", company: "", location: "", totalExp : 1 },
  });

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile?.jobTitle || "",
        company: profile?.company || "",
        location: profile?.location || "",
        totalExp: profile?.totalExp || ""
      });
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    console.log(form.getValues());
    let updatedProfile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedProfile));
    console.log(updatedProfile);
    successMessage("success", "Profile updated successfully.");
  };

  return user ? ( // Check if `user` exists
    <>
      <div className="px-3 mt-16 py-5">
        <div className="text-3xl font-semibold flex justify-between">
          {user?.name || "User"} {/* Use fallback value */}
          <div>
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
        {edit && (
          <>
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput form={form} name="jobTitle" {...select[0]} />
              <SelectInput form={form} name="company" {...select[1]} />
            </div>
            <div>
                <SelectInput form={form} name="location" {...select[2]} />
                <NumberInput  label = "Exprience" withAsterisk hideControls clampBehavior="strict" min={1} max={50} {...form.getInputProps('totalExp')} />
            </div>
            
          </>
        )}
        <div className="text-xl flex gap-1 items-center">
          <IconBriefcase className="h-5 w-5" stroke={1.5} /> {profile?.jobTitle || "Not specified"} {/* Fallback value */}
          &bull; {profile?.company || "Not specified"}
        </div>
        <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
          <IconMapPins className="h-5 w-5" stroke={1.5} /> {profile?.location || "Not specified"} {/* Fallback value */}
        </div>
        <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
          <IconBriefcase className="h-5 w-5" stroke={1.5} />Experience: {profile?.totalExp || "Not specified"} {/* Fallback value */}
        </div>
      </div>
    </>
  ) : (
    <div className="px-3 mt-16 py-3 text-center">
      <p className="text-xl text-gray-500">Please log in to view your profile information.</p>
    </div>
  );
};

export default Info;
