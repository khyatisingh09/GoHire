import { timeAgo } from "../Services/Utilities";

const PostedJobCard = ({ job, onSelect }: any) => {
    return (
      <div
        onClick={() => onSelect(job)}
        className="rounded-xl p-2 w-52 border-l-2 hover:bg-opacity-80 cursor-pointer border-l-bright-sun-400 bg-mine-shaft-900 text-mine-shaft-300"
      >
        <div className="text-sm font-semibold">{job.jobTitle}</div>
        <div className="text-xs font-medium">{job.location}</div>
        <div className="text-xs">
          {job.jobStatus == "DRAFT" ? "Drafted" : job.jobStatus == "CLOSED" ? "Closed" : "Posted"}
           {timeAgo(job.postTime)}
        </div>
      </div>
    );
  };
  
  export default PostedJobCard;
  
  