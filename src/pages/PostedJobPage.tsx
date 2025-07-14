import { Divider } from "@mantine/core";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDecs from "../PostedJob/PostedJobDesc";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getJobPostedBy } from "../Services/JobService";
import JobDesc from "../JobDescription/JobDesc";

const PostedJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>({});

  useEffect(() => {
    if (!user || !user.id) return;

    window.scrollTo(0, 0);
    getJobPostedBy(user.id)
      .then((res) => {
        setJobList(res);
        if (res && res.length > 0 && Number(id) === 0) {
          navigate(`/posted-jobs/${res[0].id}`);
        }
        const foundJob = res.find((item: any) => item.id == id);
        if (foundJob) setJob(foundJob);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, user, navigate]);

  // Optional: Display a loading state while user or job list is not ready
  if (!user || !user.id) return <div>Loading user...</div>;

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <Divider size="xs" />
      <div className="flex gap-5">
        <PostedJob JobDesc={JobDesc} jobList={jobList} />
        <PostedJobDecs {...JobDesc} />
      </div>
    </div>
  );
};

export default PostedJobPage;
