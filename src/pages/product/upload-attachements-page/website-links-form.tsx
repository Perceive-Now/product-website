import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { setWebsiteLinks } from "src/stores/upload-attachments";
import Button from "src/components/reusable/button";
import YellowBackgroundWithIcon from "./yellow-background-with-icon";
import classNames from "classnames";
import { QuestionMarkIcon } from "src/components/icons";

const listContent = [
  "Known Competitor Websites",
  "Relevant Industry Websites",
  "Portfolio Company Websites",
  "Company Website",
  "Other Relevant URLs",
];

export default function WebsiteLinksForm({ isLoading }: { isLoading: boolean }) {
  const dispatch = useAppDispatch();

  const { websiteLinks } = useAppSelector((state) => state.uploadAttachments);

  const formResolver = yup.object().shape({
    websiteLinkInput: yup.string().trim().required("Please provide a link"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      websiteLinkInput: "",
    },
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const addWebsiteLink = ({ websiteLinkInput }: { websiteLinkInput: string }) => {
    dispatch(setWebsiteLinks([...websiteLinks, websiteLinkInput]));
    reset();
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row gap-3 xl:gap-5 mt-6 xl:mt-15 mb-4 xl:mb-[68px] justify-center items-center">
        <form onSubmit={handleSubmit(addWebsiteLink)}>
          <fieldset className="flex flex-col justify-center items-center gap-y-[20px] text-lg font-bold">
            <label>Type or Paste Your URL</label>
            <div className="flex flex-row h-6 w-[480px]">
              <input
                {...register("websiteLinkInput")}
                placeholder="https://www.example.com/"
                className={classNames(
                  "h-full w-full max-w-[400px] border border-appGray-600 rounded-l-lg p-2 placeholder:text-base placeholder:text-appGray-500 placeholder:font-medium font-medium",
                  {
                    " border-appGray-600 ": !errors.websiteLinkInput,
                  },
                  {
                    " border-red-500 ": errors.websiteLinkInput,
                  },
                )}
                disabled={isLoading}
              />
              <Button
                htmlType="submit"
                type="optional"
                classname="rounded-l-none h-full w-[80px]"
                disabled={isLoading}
              >
                Paste
              </Button>
            </div>
          </fieldset>
        </form>

        <div className="flex flex-col items-center">
          <p className="text-lg font-bold">Recommended websites</p>
          <ul className="list-disc flex flex-wrap justify-center xl:flex-col pl-[20px]">
            {listContent.map((content) => (
              <li key={content} className="text-sm max-w-fit pr-[30px] xl:pr-0 w-full">
                {content}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <WhyAddWebsite />
    </div>
  );
}

const WhyAddWebsite = () => {
  return (
    <YellowBackgroundWithIcon>
      <>
        <QuestionMarkIcon className="w-[36px] h-[36px]" />
        <div>
          <p className="font-bold text-lg pl-2 text-heroDark-900 mb-1">Why Add Website?</p>
          <ul className="list-disc pl-[20px] space-y-[4px]">
            <li className="text-sm text-secondary-800">
              <strong>Better Reports:</strong> More data means more accurate reports.
            </li>
            <li className="text-sm text-secondary-800">
              <strong>Relevant Insights:</strong> Get business-specific insights.
            </li>
          </ul>
        </div>
      </>
    </YellowBackgroundWithIcon>
  );
};
