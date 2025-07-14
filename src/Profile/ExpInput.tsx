import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useEffect, useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../Slices/ProfileSlice";
import { successMessage } from "../SignupLogin/NotificationService";

const ExpInput = (props: any) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  useEffect(() => {
    if (!props.add)
      form.setValues({
        title: props.title,
        company: props.comapny,
        location: props.location,
        description: props.description,
        startDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        working: props.working,
      });
  }, []);
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      working: false,
    },
    validate: {
      title: isNotEmpty("title is required"),
      company: isNotEmpty("company is required"),
      location: isNotEmpty("location is reqired"),
      description: isNotEmpty("description is required"),
    },
  });
  const handleSave = () => {
    try {
      form.validate();
    //   if (!form.isValid()) return;
    //   console.log("test")
      let exp = [...profile.experiences];
      if (props.add) {
        exp.push(form.getValues());
        exp[exp.length - 1].startDate =
          exp[exp.length - 1].startDate.toISOString();
        exp[exp.length - 1].endDate = exp[exp.length - 1].endDate.toISOString();
      } else {
        exp[props.index] = form.getValues();
        exp[exp.length - 1].startDate =
          exp[exp.length - 1].startDate.toISOString();
        exp[exp.length - 1].endDate = exp[exp.length - 1].endDate.toISOString();
      }
      let updatedProfile = { ...profile, experiences: exp };
      props.setEdit(false);
      dispatch(changeProfile(updatedProfile));
      successMessage(
        "Skills",
        `Experiences ${props.add ? "Added" : "Updated"} successfully.`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {props.add ? "Add" : "Edit"} Experience
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea
        {...form.getInputProps("description")}
        withAsterisk
        className="my-3"
        label="summary"
        autosize
        minRows={3}
        placeholder="Enter your experience"
      />
      <div className="flex_gap-10 [&:w-1/2 my-3]">
        <MonthPickerInput
          {...form.getInputProps("startDate")}
          maxDate={form.getValues().endDate || undefined}
          withAsterisk
          label="Start Date"
          placeholder="Pick date"
        />
        <MonthPickerInput
          {...form.getInputProps("endDate")}
          disabled={form.getValues().working}
          minDate={form.getValues().startDate || undefined}
          maxDate={new Date()}
          withAsterisk
          label="End Date"
          placeholder="Pick date"
        />
      </div>
      <Checkbox
        checked={form.getValues().working}
        onChange={(event) =>
          form.setFieldValue("working", event.currentTarget.checked)
        }
        autoContrast
        color="bright-sun.5"
        label="Currenty working here"
      />
      <div className="flex gap-5">
        <Button onClick={handleSave} color="bright-sun.5" variant="light">
          Save
        </Button>
        <Button
          color="red.8"
          onClick={() => props.setEdit(false)}
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default ExpInput;
