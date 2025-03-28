import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

//
import Button from "../../../components/reusable/button";
import Input from "../../../components/reusable/input";

/*
 *
 **/
export default function HelpPage() {
  const formInitialValue: IHelpPageFormValues = {
    subject: "",
    comment: "",
  };

  const formResolver = yup.object().shape({
    subject: yup.string().required("Subject is required"),
    comment: yup.string().required("Comment is required"),
  });

  const { register, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
  });

  const { errors, isValid } = formState;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleHelpFormSubmit = (values: IHelpPageFormValues) => {
    // TODO:: Make API call for submit
  };

  return (
    <div className="border border-black rounded-xl my-auto">
      <div className="text-appGray-900 py-3 px-4">
        <div className="font-semibold text-2xl mb-2">Help</div>

        <div className="max-w-[548px]">
          Thank you for your interest in Perceive Now, Inc. Please feel free to reach out to us with
          any questions, comments or interest in getting involved.
        </div>

        <form onSubmit={handleSubmit(handleHelpFormSubmit)} className="mt-4 max-w-[480px]">
          <div className="mb-2">
            <Input
              register={register}
              // name={"subject"}
              label="Subject"
              placeholder="Subject"
              error={errors["subject"]}
            />
          </div>

          <div>
            <Input
              // name={"comment"}
              label="Comment"
              register={register}
              type="textarea"
              placeholder="Enter your comment"
              error={errors["comment"]}
            />
          </div>

          <Button classname="mt-4" disabled={!isValid}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

interface IHelpPageFormValues {
  subject: string;
  comment: string;
}
