import { Fragment, FunctionComponent, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  show: boolean;
  handleShow: () => void;
}

const SidebarTransition: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  show,
  handleShow,
}) => {
  return (
    <div>
      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="relative" onClose={handleShow}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed z-10 inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 flex z-10 ">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              {children}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default SidebarTransition;
