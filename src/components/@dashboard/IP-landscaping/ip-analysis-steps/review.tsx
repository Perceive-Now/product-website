import Button from "../../../reusable/button";
import KeywordSelected from "../KeywordSelected";
import IPUseCase from "../components/use-case";

import { useCallback } from "react";
import EditIcon from "../../../icons/miscs/Edit";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPReview({ changeActiveStep }: Props) {
  const onContinue = useCallback(() => {
    changeActiveStep(10);
  }, [changeActiveStep]);
  return (
    <>
      <div className="space-y-2.5">
        <KeywordSelected />
        <div>
          <IPUseCase />
        </div>
        <div>
          <div>
            <h5 className="text-xl font-semibold text-appGray-600">
              These are the answers you provided.
            </h5>
            <p className="text-base text-secondary-800">Please review your answers and continue.</p>
          </div>
          <div className="mt-7 space-y-2.5">
            <div className="rounded-lg overflow-hidden">
              <div className="bg-primary-900 font-medium text-white px-2 py-1">
                Introduction and Purpose Identification
              </div>
              <div className="bg-appGray-100">
                <ul className="list-disc px-2.5 ml-2 mr-6 py-1">
                  <li>
                    <div className="flex items-start gap-2.5">
                      <p className="text-secondary-800 font-medium px-">
                        I'm aiming to assess the patentability of SkinCheck and identify potential
                        areas where it might face challenges in terms of IP validity. My goal is to
                        strengthen our patent application by preemptively addressing these areas,
                        ensuring that our technology stands out in the competitive field of
                        AI-driven healthcare solutions.
                      </p>
                      <button type="button" className="flex-shrink-0">
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
                    <div className="flex items-start gap-2.5">
                      <p className="text-secondary-800 font-medium px-">
                        I'm aiming to assess the patentability of SkinCheck and identify potential
                        areas where it might face challenges in terms of IP validity. My goal is to
                        strengthen our patent application by preemptively addressing these areas,
                        ensuring that our technology stands out in the competitive field of
                        AI-driven healthcare solutions.
                      </p>
                      <button type="button" className="flex-shrink-0">
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
                    <div className="flex items-start gap-2.5">
                      <p className="text-secondary-800 font-medium px-">
                        I'm aiming to assess the patentability of SkinCheck and identify potential
                        areas where it might face challenges in terms of IP validity. My goal is to
                        strengthen our patent application by preemptively addressing these areas,
                        ensuring that our technology stands out in the competitive field of
                        AI-driven healthcare solutions.
                      </p>
                      <button type="button" className="flex-shrink-0">
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
                    <div className="flex items-start gap-2.5">
                      <p className="text-secondary-800 font-medium px-">
                        I'm aiming to assess the patentability of SkinCheck and identify potential
                        areas where it might face challenges in terms of IP validity. My goal is to
                        strengthen our patent application by preemptively addressing these areas,
                        ensuring that our technology stands out in the competitive field of
                        AI-driven healthcare solutions.
                      </p>
                      <button type="button" className="flex-shrink-0">
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
                    <div className="flex items-start gap-2.5">
                      <p className="text-secondary-800 font-medium px-">
                        I'm aiming to assess the patentability of SkinCheck and identify potential
                        areas where it might face challenges in terms of IP validity. My goal is to
                        strengthen our patent application by preemptively addressing these areas,
                        ensuring that our technology stands out in the competitive field of
                        AI-driven healthcare solutions.
                      </p>
                      <button type="button" className="flex-shrink-0">
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
                    <div className="flex items-start gap-2.5">
                      <p className="text-secondary-800 font-medium px-">
                        I'm aiming to assess the patentability of SkinCheck and identify potential
                        areas where it might face challenges in terms of IP validity. My goal is to
                        strengthen our patent application by preemptively addressing these areas,
                        ensuring that our technology stands out in the competitive field of
                        AI-driven healthcare solutions.
                      </p>
                      <button type="button" className="flex-shrink-0">
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
                    <div className="flex items-start gap-2.5">
                      <p className="text-secondary-800 font-medium px-">
                        I'm aiming to assess the patentability of SkinCheck and identify potential
                        areas where it might face challenges in terms of IP validity. My goal is to
                        strengthen our patent application by preemptively addressing these areas,
                        ensuring that our technology stands out in the competitive field of
                        AI-driven healthcare solutions.
                      </p>
                      <button type="button" className="flex-shrink-0">
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
                    <div className="flex items-start gap-2.5">
                      <p className="text-secondary-800 font-medium px-">
                        I'm aiming to assess the patentability of SkinCheck and identify potential
                        areas where it might face challenges in terms of IP validity. My goal is to
                        strengthen our patent application by preemptively addressing these areas,
                        ensuring that our technology stands out in the competitive field of
                        AI-driven healthcare solutions.
                      </p>
                      <button type="button" className="flex-shrink-0">
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
                    <div className="flex items-start gap-2.5">
                      <p className="text-secondary-800 font-medium px-">
                        I'm aiming to assess the patentability of SkinCheck and identify potential
                        areas where it might face challenges in terms of IP validity. My goal is to
                        strengthen our patent application by preemptively addressing these areas,
                        ensuring that our technology stands out in the competitive field of
                        AI-driven healthcare solutions.
                      </p>
                      <button type="button" className="flex-shrink-0">
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
    </>
  );
}
