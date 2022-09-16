import { Disclosure, Transition } from "@headlessui/react";

//
import ExpandBtn from "../../expand-btn";
import DisclosureHead from "../disclosure-head";

/**
 *
 */
export default function DisclosureSummary({
  id,
  title,
  description,
}: IDisclosureSummary) {
  return (
    <div className="shadow pt-2 pb-3 px-3 w-full rounded-2xl mb-3">
      <Disclosure>
        {({ open, close }) => (
          <div>
            <Disclosure.Button>
              <DisclosureHead
                open={open}
                title={title}
                description={description}
              />
            </Disclosure.Button>

            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="text-appGray-900 border-t-2 border-appGray-300 mx-3 mt-4">
                <div className="mx-3 py-4">
                  <div className="mb-2 font-bold">
                    Publication/Patent number:{" "}
                    <span className="font-normal">[0005]</span>
                  </div>

                  <div className="mb-2">
                    Personal protective equipment (PPE) such as e.g., face
                    masks, face shields, etc. are widely used to, inter alia,
                    prevent the spread of germs and/or exposure to toxic
                    substances. Further, PPE are used to prevent contamination
                    of sensitive equipment and/or materials from particulate
                    matter sloughed from human bodies and clothing. Thus, in
                    healthcare settings, PPE may be worn by surgeons, doctors,
                    nurses, anesthesiologists, technicians, assistants, and
                    other persons permitted into an operating room or other
                    healthcare facility. Additionally, they may be worn during
                    general examinations especially of contagious or potentially
                    contagious persons or animals (e.g., Avian Flu, Ebola virus)
                    and/or immunodeficient persons or animals. Further, persons
                    tasked with environmental clean-up and inspection may wear
                    PPE to protect against environmental exposure to infectious
                    and/or toxic substances. Furthermore, personnel working in
                    clean room settings may be required to wear PPE to protect
                    sensitive equipment and materials from contamination due to
                    particulate matter (e.g., dead skin cells, hair, clothing
                    particles, etc.). Further still, in recent years, worldwide
                    outbreaks of certain serious and highly contagious diseases
                    have prompted individuals to wear PPE masks in daily life
                    (i.e., outside of hospitals and medical treatment
                    facilities). Moreover, individuals in highly air-polluted
                    regions (such as portions of Japan and China) routinely wear
                    a mask in an attempt to filter out harmful airborne
                    substances, or even for some level of protection against
                    ingestion or inhalation of biological agents such as
                    allergens.
                  </div>

                  <div>
                    <div className="flex mb-2">
                      <div className="mr-2 font-bold">Type:</div>
                      <div>CPCI</div>
                    </div>

                    <div className="flex mb-2">
                      <div className="mr-2 font-bold">Filed:</div>
                      <div>2021-10-08</div>
                    </div>

                    <div className="flex mb-2">
                      <div className="mr-2 font-bold">Publicaiton date:</div>
                      <div>2022-04-10</div>
                    </div>

                    <div className="flex mb-2">
                      <div className="mr-2 font-bold">Applicant:</div>
                      <div>Micheal J. O'Leary</div>
                    </div>

                    <div className="flex mb-2">
                      <div className="mr-2 font-bold">Assignee:</div>
                      <div>3M Innovative Properties Company</div>
                    </div>

                    <div className="flex mb-2">
                      <div className="mr-2 font-bold">Inventor(s):</div>
                      <div>Micheal J. O'Leary</div>
                    </div>

                    <div className="flex mb-2">
                      <div className="mr-2 font-bold">IPC:</div>
                      <div>A 41 D 31/102</div>
                    </div>

                    <div className="flex mb-2">
                      <div className="mr-2 font-bold">Location:</div>
                      <div>Del Mar, CA, United States</div>
                    </div>
                  </div>
                </div>

                <div>
                  <ExpandBtn
                    isExpanded={true}
                    handleExpandToggle={() => close()}
                  />
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
}

interface IDisclosureSummary {
  title: string;
  description: string;
  id: string;
}
