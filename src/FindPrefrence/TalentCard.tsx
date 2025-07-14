import {
  IconCalendarMonth,
  IconMapPins,
  IconUserHeart,
} from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import {
  errorNotificaton,
  successMessage,
} from "../SignupLogin/NotificationService";
import { formateInterviewTime, openBase64PDF } from "../Services/Utilities";

const TalentCard = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [user, setUser] = useState<any>({});
  console.log(props)
  useEffect(() => {
    if (props.applicantId)
      getProfile(props.applicantId)
        .then((res) => {
          // console.log(res);
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else setProfile(props);
  }, [props]);
  const handleOffer = (status: string) => {
    let interview: any = {
      id,
      applicantId: profile?.id,
      applicantStatus: status,
      interviewTime: date,
    };
    if (status == "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview = { ...interview, interviewTime: date };
    }
    changeAppStatus(interview)
      .then((res) => {
        if (status == "INTERVIEWING")
          successMessage(
            "Interview Schedule",
            "Interview schedule Successfully"
          );
        else if (status == "OFFERED")
          successMessage("offered", "Offer had been Accepted");
        else successMessage("Rejected", "application has been rejected");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        errorNotificaton("Error", err.response.date.errorMessage);
      });
  };
  // console.log(profile, props)
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar
              className="h-7"
              size="lg"
              src={
                profile.picture
                  ? `data:image/jpeg;base64,${profile.picture}`
                  : "/Avatar.png"
              }
              alt="-ml-2"
            />
          </div>
          <div>
            <div className="font-semibold size=lg">{props.name}</div>
            <div className="text-xs text-mine-shaft-300">
              {profile.jobTitle}
              &bull; {profile.company}
            </div>
          </div>
        </div>
        <IconUserHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div
        className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800
     [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs"
      >
        {profile.skills?.map(
          (skill: any, index: any) =>
            index < 4 && (
              <div
                key={index}
                className="p-2 py1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs"
              >
                {skill}
              </div>
            )
        )}
      </div>
      <Text
        className="!text-xs text-justify !text-mine-shaft-300"
        lineClamp={3}
      >
        {profile?.about}
      </Text>
      <Divider size="xs" color="bright-sun.7" />
      {props.invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5} /> Interview:{" "}
          {formateInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between">
          <div className=" text-mine-shaft-300">
            Exp:{props.totalExp ? props.totalExp : 1} Year
          </div>
          <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
            <IconMapPins className="h-5 w-5" stroke={1.5} /> {profile?.location}
          </div>
        </div>
      )}
      <Divider size="xs" color="bright-sun.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color="bright-sun-400" variant="outline" fullWidth>
                Profile
              </Button>
            </Link>
            <div className="flex [&>*]:p-1">
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<IconCalendarMonth className="w-5 h-5" />}
                  color="bright-sun-400"
                  variant="light"
                  fullWidth
                >
                  Schedule
                </Button>
              ) : (
                <Button onClick={()=>window.location.href=`mailto:${profile.email}`} color="bright-sun" variant="light" fullWidth>
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              <Button
                color="bright-sun"
                onClick={() => handleOffer("OFFERED")}
                variant="outline"
                fullWidth
              >
                Accept
              </Button>
            </div>
            <div>
              <Button
                color="bright-sun"
                onClick={() => handleOffer("REJECTED")}
                variant="light"
                fullWidth
              >
                reject
              </Button>
            </div>
          </>
        )}
      </div>
      {(props.invited || props.posted) && (
        <Button
          color="bright-sun"
          variant="filled"
          fullWidth
          onClick={openApp}
          autoContrast
        >
          View Application
        </Button>
      )}
      <Modal opened={opened} onClose={close} title="Schedule Interview">
        <div className="flex flex-col gap-4">
          <DateInput
            value={date}
            minDate={new Date()}
            onChange={setDate}
            label="Date"
            placeholder="Enter Date"
          />
          <TimeInput
            label="Time"
            value={time}
            onChange={(event) => setTime(event.currentTarget.value)}
            ref={ref}
            minTime=""
            onClick={() => ref.current?.showPicker()}
          />
          <Button
            onClick={() => handleOffer("INTERVIEW")}
            color="bright-sun"
            variant="light"
            fullWidth
          >
            Schedule
          </Button>
        </div>
      </Modal>
      <Modal opened={app} onClose={close} title="Application">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div>
              Email: &emsp;
              <a
                className="text-bright-sun-400 hover:underline cursor-pointer text-center"
                href={`mailto:${props.email}`}
              >
                {props.email}
              </a>
            </div>
            <div>
              Website: &emsp;
              <a
                target="_blank"
                className="text-bright-sun-400 hover:underline cursor-pointer text-center"
                href={`${props.website}`}
              >
                {props.website}
              </a>
            </div>
            <div>
              Resume: &emsp;
              <span
                className="text-bright-sun-400 hover:underline cursor-pointer text-center"
                onClick={() => openBase64PDF(props.resume)}
              >
                {props.name}
              </span>
            </div>
            <div>
              CoverLetter: &emsp;<div>{props.CoverLetter}</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default TalentCard;
