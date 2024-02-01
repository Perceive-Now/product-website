import Button from "../../../reusable/button";
import KeywordSelected from "../KeywordSelected";
import IPUseCase from "../components/use-case";

import { useCallback } from "react";
import EditIcon from "../../../icons/miscs/Edit";
import { useAppSelector } from "../../../../hooks/redux";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPReview({ changeActiveStep }: Props) {
  const answer_select = useAppSelector((state) => state.ipData) ?? "";

  const onContinue = useCallback(() => {
    changeActiveStep(10);
  }, [changeActiveStep]);

  return (
    <div className="space-y-2.5 w-full shrink-0">
      <KeywordSelected />
      <IPUseCase changeActiveStep={changeActiveStep} />
      <div className="w-full">
        <div>
          <h5 className="text-xl font-semibold text-appGray-600">
            These are the answers you provided.
          </h5>
          <p className="text-base text-secondary-800">Please review your answers and continue.</p>
        </div>
        <div className="mt-7 space-y-2.5 w-full">
          <div className="rounded-lg overflow-hidden">
            <div className="bg-primary-900 font-medium text-white px-2 py-1">
              Introduction and Purpose Identification
            </div>
            <div className="bg-appGray-100">
              <ul className="list-disc px-2.5 ml-2 mr-6 py-1">
                <li>
                  <div className="flex justify-between items-start gap-2.5">
                    <p className="text-secondary-800 font-medium px-">
                      {answer_select.purpose_identification.answer}
                    </p>
                    <button
                      type="button"
                      className="flex-shrink-0"
                      onClick={() => changeActiveStep(1)}
                    >
                      <EditIcon className="w-2 h-2" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="bg-primary-900 font-medium text-white px-2 py-1">
              Novelty and Innovation Aspects
            </div>
            <div className="bg-appGray-100">
              <ul className="list-disc px-2.5 ml-2 mr-6 py-1">
                <li>
                  <div className="flex justify-between items-start gap-2.5">
                    <p className="text-secondary-800 font-medium px-">
                      {answer_select.novelty_aspect.answer}
                    </p>
                    <button
                      type="button"
                      className="flex-shrink-0"
                      onClick={() => changeActiveStep(2)}
                    >
                      <EditIcon className="w-2 h-2" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="bg-primary-900 font-medium text-white px-2 py-1">
              Prior Art Research Findings
            </div>
            <div className="bg-appGray-100">
              <ul className="list-disc px-2.5 ml-2 mr-6 py-1">
                <li>
                  <div className="flex justify-between items-start gap-2.5">
                    <p className="text-secondary-800 font-medium px-">
                      {answer_select.prior_art_research.answer}
                    </p>
                    <button
                      type="button"
                      className="flex-shrink-0"
                      onClick={() => changeActiveStep(3)}
                    >
                      <EditIcon className="w-2 h-2" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="bg-primary-900 font-medium text-white px-2 py-1">
              Technical Field of the Invention
            </div>
            <div className="bg-appGray-100">
              <ul className="list-disc px-2.5 ml-2 mr-6 py-1">
                <li>
                  <div className="flex justify-between items-start gap-2.5">
                    <p className="text-secondary-800 font-medium px-">
                      {answer_select.technical_field_invention.answer}
                    </p>
                    <button
                      type="button"
                      className="flex-shrink-0"
                      onClick={() => changeActiveStep(4)}
                    >
                      <EditIcon className="w-2 h-2" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="bg-primary-900 font-medium text-white px-2 py-1">
              Identification of Inventors and Contributions
            </div>
            <div className="bg-appGray-100">
              <ul className="list-disc px-2.5 ml-2 mr-6 py-1">
                <li>
                  <div className="flex justify-between items-start gap-2.5">
                    <p className="text-secondary-800 font-medium px-">
                      {answer_select.inventor_identification.answer}
                    </p>
                    <button
                      type="button"
                      className="flex-shrink-0"
                      onClick={() => changeActiveStep(5)}
                    >
                      <EditIcon className="w-2 h-2" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="bg-primary-900 font-medium text-white px-2 py-1">
              Potential Applications and Uses
            </div>
            <div className="bg-appGray-100">
              <ul className="list-disc px-2.5 ml-2 mr-6 py-1">
                <li>
                  <div className="flex justify-between items-start gap-2.5">
                    <p className="text-secondary-800 font-medium px-">
                      {answer_select.potential_application.answer}
                    </p>
                    <button
                      type="button"
                      className="flex-shrink-0"
                      onClick={() => changeActiveStep(6)}
                    >
                      <EditIcon className="w-2 h-2" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="bg-primary-900 font-medium text-white px-2 py-1">
              Estimated Market Potential
            </div>
            <div className="bg-appGray-100">
              <ul className="list-disc px-2.5 ml-2 mr-6 py-1">
                <li>
                  <div className="flex justify-between items-start gap-2.5">
                    <p className="text-secondary-800 font-medium px-">
                      {answer_select.estimated_market_potential.answer}
                    </p>
                    <button
                      type="button"
                      className="flex-shrink-0"
                      onClick={() => changeActiveStep(7)}
                    >
                      <EditIcon className="w-2 h-2" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="bg-primary-900 font-medium text-white px-2 py-1">
              Inventive Step or Non-Obviousness Discussion
            </div>
            <div className="bg-appGray-100">
              <ul className="list-disc px-2.5 ml-2 mr-6 py-1">
                <li>
                  <div className="flex justify-between items-start gap-2.5">
                    <p className="text-secondary-800 font-medium px-">
                      {answer_select.inventive_step.answer}
                    </p>
                    <button
                      type="button"
                      className="flex-shrink-0"
                      onClick={() => changeActiveStep(8)}
                    >
                      <EditIcon className="w-2 h-2" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Button htmlType={"button"} rounded={"large"} handleClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
