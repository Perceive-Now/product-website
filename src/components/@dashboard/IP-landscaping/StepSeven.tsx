import { FunctionComponent, useCallback, useState } from "react";
import KeywordSelected from "./KeywordSelected";
import { useForm } from "react-hook-form";
import MultiKeywords from "../../reusable/multiple-keywords";
import Button from "../../reusable/button";
import { useNavigate } from "react-router-dom";

//
interface Props {
  changeActiveStep: (steps: number) => void;
}

/**
 *
 */
const StepSeven: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const [keyword, setKeyword] = useState();

  const navigate = useNavigate();
  //
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    // defaultValues: formInitialValue,
    // resolver: yupResolver(formResolver),
    // mode: "onBlur",
  });

  //
  const onContinue = useCallback(() => {
    changeActiveStep(7);
    navigate("/ip-landscaping/full-report");

    // const three_value = {
    //   organization: checkboxValue || [],
    //   competitor: keyword || [],
    // };
    // ;
    // dispatch(setIPOrganization(three_value));
  }, [changeActiveStep, navigate]);

  return (
    <div className="">
      <KeywordSelected />
      <div className="mt-4">
        <h4 className="text-gray-600 text-4xl	">
          Who are your <b>competitors</b>?
        </h4>
      </div>
      <form onSubmit={handleSubmit(onContinue)}>
        <p className="text-secondary-800 mb-4">
          Select Competitors from the suggestions or enter below
        </p>
        <MultiKeywords
          required
          size="small"
          className="w-full bg-white"
          placeholder={"Enter Competitors Name"}
          changeKeyword={setKeyword}
        />

        <div className=" gap-x-4 mt-4">
          {/* <Button htmlType={"button"} type={"secondary"} handleClick={() => changeActiveStep(2)}>
        Go Backyarn
      </Button> */}
          <Button htmlType={"submit"} rounded={"large"}>
            Generate report summary
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepSeven;
