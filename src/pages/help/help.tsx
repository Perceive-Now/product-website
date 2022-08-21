import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../components/reusable/button";
import Input from "../../components/reusable/input";
import { useForm } from "react-hook-form";

export default function Help() {
  const formInitialValue: IHelpFormValues = {
    fullname: "",
    email: "",
    subject: "",
    comment: "",
  };

  const formResolver = yup.object().shape({
    fullname: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
    subject: yup.string().required("Subject is required"),
    comment: yup.string().required("Comment is required"),
  });
  const { watch, register, formState, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
  });

  const { errors } = formState;

  const handleHelpFormSubmit = (values: IHelpFormValues) => {
    console.log(values, "values");

    // TODO:: Make API call for submit
  };

  const fullnameValue = watch("fullname");
  const emailValue = watch("email");
  const subjectValue = watch("subject");
  const commentValue = watch("comment");

  return (
    <div className="pt-16 text-appGray-900">
      <div className="font-semibold text-2xl mb-2">Help</div>
      <div className="max-w-[548px]">
        Thank you for your interest in Perceive Now, Inc. Please feel free to
        reach out to us with any questions, comments or interest in getting
        involved.
      </div>
      <form
        onSubmit={handleSubmit(handleHelpFormSubmit)}
        className="mt-7 max-w-[480px]"
      >
        <div className="mb-4">
          <Input
            name={"fullname"}
            label="Full Name"
            placeholder="John Doe"
            register={register}
            error={errors["fullname"]}
          />
        </div>
        <div className="mb-4">
          <Input
            name={"email"}
            register={register}
            label="Email Address"
            type="email"
            placeholder="JohnDoe@abc.com"
            error={errors["email"]}
          />
        </div>
        <div className="mb-4">
          <Input
            register={register}
            name={"subject"}
            label="Subject"
            placeholder="Subject"
            error={errors["subject"]}
          />
        </div>
        <div className="mb-4">
          <Input
            name={"comment"}
            label="Comment"
            register={register}
            type="textarea"
            placeholder="example@gmail.com"
            error={errors["comment"]}
          />
        </div>
        <Button
          disabled={
            !fullnameValue || !emailValue || !subjectValue || !commentValue
          }
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

interface IHelpFormValues {
  fullname: string;
  email: string;
  subject: string;
  comment: string;
}
