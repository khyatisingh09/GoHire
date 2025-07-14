import { Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ApplicationForm } from "./ApplicationForm";
import { timeAgo } from "../Services/Utilities";

const ApplyJobComp = (props:any) => {
  const navigate = useNavigate();

  // Ensure the component returns JSX properly
  return (
    <div className="w-2/3 mx-auto">
      <div className="w-2/3 mx-auto">
        <div className="flex gap-2 items-justify">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img className="h-14" src={`/Icons/${props.company}.png`} alt="Company logo" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300">
              {props.company} &bull; {timeAgo(props.postTime)} &bull; {props.applicants? props.applicants.lenght:0}Applicants
            </div>
          </div>
        </div>
        <Divider my="xl" color="bright-sun-400" />
        <ApplicationForm/>
      </div>
    </div>
  );
};

export { ApplyJobComp };
