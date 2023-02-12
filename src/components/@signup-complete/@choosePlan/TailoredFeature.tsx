import classNames from "classnames";
import { useForm } from "react-hook-form";
import { Disclosure } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//
import { ChevronDown } from "../../icons";
import Button from "../../reusable/button";
import { useAppSelector } from "../../../hooks/redux";

//
const formSchema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

/**
 *
 */
export default function TailoredFeature(props: ITailoredFeatureProps) {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user, "user");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITailoredFeatureForm>({
    resolver: yupResolver(formSchema),
    defaultValues: props.values,
  });

  return (
    <div className="p-2">
      <Disclosure>
        {({ open, close }) => (
          <div>
            <Disclosure.Button onClick={() => !open} className="w-full">
              <div className="flex text-start items-center">
                <div>
                  <div className="font-bold text-2xl mb-1">Looking for Tailored feature set ?</div>

                  <div className="text-xl">
                    Contact us for accessing features only specific to your use cases and for
                    customized diligence.
                  </div>
                </div>

                <div className="mr-2 text-primary-900">
                  <ChevronDown
                    className={classNames({ "rotate-180 transform": open })}
                    width="32px"
                    fontSize={"30px"}
                  />
                </div>
              </div>
            </Disclosure.Button>

            <Disclosure.Panel className={"mt-4"}>
              {/* Name row */}
              <p className="text-lg font-semibold mb-1">Name*</p>

              <div className="grid grid-cols-2 gap-x-3">
                <fieldset className="col-span-1 w-full">
                  <input
                    id="first_name"
                    placeholder="First Name"
                    className={classNames(
                      "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                      errors.first_name
                        ? "outline-red-500 border-red-500"
                        : "focus:outline-primary-500 border-gray-400",
                    )}
                    {...register("first_name")}
                    disabled
                  />
                  <label htmlFor="first_name" className="text-sm">
                    First Name
                  </label>
                </fieldset>

                <fieldset className="col-span-1 w-full">
                  <input
                    id="last_name"
                    placeholder="Last Name"
                    className={classNames(
                      "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                      errors.last_name
                        ? "outline-red-500 border-red-500"
                        : "focus:outline-primary-500 border-gray-400",
                    )}
                    {...register("last_name")}
                    disabled
                  />
                  <label htmlFor="last_name" className="text-sm">
                    Last Name
                  </label>
                </fieldset>
              </div>

              {/* Email row */}
              <p className="text-lg font-semibold mb-1 mt-3">Email Address*</p>

              <div className="grid grid-cols-1">
                <fieldset className="col-span-1 w-full">
                  <input
                    id="email"
                    placeholder="Email"
                    className={classNames(
                      "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                      errors.email
                        ? "outline-red-500 border-red-500"
                        : "focus:outline-primary-500 border-gray-400",
                    )}
                    {...register("email", { value: user?.email })}
                    value={user?.email}
                    disabled
                  />
                </fieldset>
              </div>

              {/* Subject row */}
              <p className="text-lg font-semibold mb-1 mt-3">Subject*</p>

              <div className="grid grid-cols-1">
                <fieldset className="col-span-1 w-full">
                  <input
                    id="subject"
                    placeholder="Subject"
                    className={classNames(
                      "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                      errors.subject
                        ? "outline-red-500 border-red-500"
                        : "focus:outline-primary-500 border-gray-400",
                    )}
                    {...register("subject", { value: "Tailored features Query" })}
                    disabled
                  />
                </fieldset>
              </div>

              {/* Message row */}
              <p className="text-lg font-semibold mb-1 mt-3">Message*</p>

              <div className="grid grid-cols-1">
                <fieldset className="col-span-1 w-full">
                  <textarea
                    id="message"
                    placeholder="Message"
                    className={classNames(
                      "py-1 px-[1.25rem] w-full rounded-lg border bg-white focus:bg-white focus:ring-0",
                      errors.message
                        ? "outline-red-500 border-red-500"
                        : "focus:border-primary-500 focus:border-2 border-gray-400",
                    )}
                    {...register("message")}
                    rows={8}
                  />
                </fieldset>
              </div>

              {/* Actions */}
              <div className="flex justify-start mt-4">
                <Button type="optional" rounded="full" htmlType="submit">
                  Send Message
                </Button>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}

interface ITailoredFeatureProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any;
}

interface ITailoredFeatureForm {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}
