import { Button } from "@mantine/core";
import { IconCalendarTime } from "@tabler/icons-react";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { successMessage } from "../SignupLogin/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";

interface ExpCardProps {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  working: boolean;
  edit?: boolean;
  index: number;
}

const ExpCard = (props: ExpCardProps) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = () => {
    let exp = [...profile.experiences];
    exp.splice(props.index, 1); // Remove the experience at the given index
    let updatedProfile = { ...profile, experiences: exp }; // Update the profile
    dispatch(changeProfile(updatedProfile)); // Dispatch the change
    successMessage("Success", "Experience Deleted Successfully"); // Notify the user
  };
  console.log(props)
  return !edit ? (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.company} &bull; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm mine-shaft-200 justify-center">
          <div className="flex justify-center">
            <IconCalendarTime />
            {formatDate(props.startDate)} -{" "}
            {props.working ? "Present" : formatDate(props.endDate!)}
          </div>
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300 text-justify ">
        {props.description}
      </div>
      {props.edit && (
        <div className="flex gap-5">
          <Button onClick={() => setEdit(true)} color="bright-sun.5" variant="light">
            Edit
          </Button>
          <Button color="red.8" onClick={handleDelete} variant="light">
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput {...props} setEdit={setEdit} />
  );
};

export default ExpCard;
