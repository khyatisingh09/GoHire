import {
  IconBookmarkFilled,
  IconBookmarkPlus,
  IconCalendarClock,
} from "@tabler/icons-react";
import { Button, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";

const JobCards = (props: any) => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const handleSaveJob = () => {
    const savedJobs = Array.isArray(profile.savedJobs)
      ? [...profile.savedJobs]
      : [];
    if (savedJobs.includes(props.id)) {
      const updatedJobs = savedJobs.filter((id) => id !== props.id);
      dispatch(changeProfile({ ...profile, savedJobs: updatedJobs }));
    } else {
      const updatedJobs = [...savedJobs, props.id];
      dispatch(changeProfile({ ...profile, savedJobs: updatedJobs }));
    }
  };

  return (
    <div className="bg-mine-shaft-900 p-3 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-bright-sun-400">
      <div className="flex justify-evenly">
        <div className="flex gap-2 items-justify">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">
              <Link className="hover:text-mine-shaft-200" to="/company">
                {props.company}
              </Link>{" "}
              &bull; {props.applicants?.length || 0} Applicants
            </div>
          </div>
        </div>
        {Array.isArray(profile.savedJobs) &&
        profile.savedJobs.includes(props.id) ? (
          <IconBookmarkFilled
            onClick={handleSaveJob}
            className="text-mine-shaft-300 cursor-pointer  hover:text-bright-sun-400"
            stroke={1.5}
          />
        ) : (
          <IconBookmarkPlus
            onClick={handleSaveJob}
            className="text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer"
            stroke={1.5}
          />
        )}
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>
      <Text
        className="!text-xs text-justify !text-mine-shaft-300"
        lineClamp={3}
        dangerouslySetInnerHTML={{ __html: props.description }}
      ></Text>
      <Divider size="xs" color="bright-sun.7" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          &#8377;{props.packageOffered} LPA
        </div>
        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconCalendarClock className="h-5 w-5" stroke={1.5} />
          Posted {timeAgo(props.postTime)}
        </div>
      </div>
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="bright-sun" variant="outline">
          View Jobs
        </Button>
      </Link>
    </div>
  );
};

export default JobCards;
