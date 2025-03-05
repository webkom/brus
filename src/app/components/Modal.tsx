import { JSXElementConstructor, useState } from "react";

type TriggerProps = {
  toggleOpen: () => void;
};

type ModalProps = {
  Trigger: JSXElementConstructor<TriggerProps>;
  Content: JSXElementConstructor<TriggerProps>;
};

const Modal: React.FC<ModalProps> = ({ Trigger, Content }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prevOpen) => !prevOpen);

  return (
    <>
      <Trigger toggleOpen={toggleOpen} />
      {open && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-[#00000054] flex items-center justify-center"
          onClick={toggleOpen}
        >
          <Content toggleOpen={toggleOpen} />
        </div>
      )}
    </>
  );
};

export default Modal;
