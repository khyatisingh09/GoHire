import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobCard";
import { useEffect, useState } from "react";
import PostedJobDecs from "./PostedJobDesc"; // Import the Job Description component

const PostedJob = (props: any) => {
  const [activeTab, setActiveTab] = useState<string>("ACTIVE");
  const [selectedJob, setSelectedJob] = useState<any>(null); // State to manage selected job details

  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
  }, [props.job]);

  const handleJobSelect = (job: any) => {
    setSelectedJob(job); // Set the selected job when a card is clicked
  };

  return (
    <div className="w-full flex gap-5">
      {/* Left Section: Job Tabs and Cards */}
      <div className="w-1/4">
        <div className="text-2xl font-semibold mb-5">Jobs</div>
        <Tabs
          value={activeTab}
          onChange={(value: string | null) => setActiveTab(value || "ACTIVE")}
          autoContrast
          variant="pills"
        >
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="ACTIVE">
              Active [
              {props.jobList?.filter((job: any) => job?.jobStatus === "ACTIVE")
                .length}
              ]
            </Tabs.Tab>
            <Tabs.Tab value="DRAFT">
              Draft [
              {props.jobList?.filter((job: any) => job?.jobStatus === "DRAFT")
                .length}
              ]
            </Tabs.Tab>
            <Tabs.Tab value="CLOSED">
              Closed [
              {props.jobList?.filter((job: any) => job?.jobStatus === "CLOSED")
                .length}
              ]
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className="flex flex-col gap-2 mt-5">
              {props.jobList
                ?.filter((job: any) => job?.jobStatus === activeTab)
                .map((job: any, index: number) => (
                  <PostedJobCard key={index} job={job} onSelect={handleJobSelect} />
                ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>

      {/* Right Section: Job Description */}
      <div className="w-3/4">
        {selectedJob ? (
          <PostedJobDecs {...selectedJob} />
        ) : (
          <div className="flex justify-center items-center min-h-[70vh] text-xl font-semibold text-gray-500">
            Select a job to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default PostedJob;
