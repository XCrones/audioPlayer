import { useState } from "react";
import style from "./FormLink.module.scss";

interface Props {
  callback: Function;
}

const FormLinkComponent = ({ callback }: Props) => {
  const [linkValue, setLinkValue] = useState("");
  const [isHideErr, setHideErr] = useState(true);

  const isValidLink = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

  const onsubmit = () => {
    const isValidForm = isValidLink.test(linkValue);
    if (isValidForm) {
      callback(linkValue);
    } else {
      setHideErr(false);
    }
  };

  return (
    <form className="">
      <h3 className="first-letter:uppercase text-5xl text-player-title leading-[52px] mb-5">insert the link</h3>
      <div className="flex flex-row relative">
        <input
          onFocus={() => setHideErr(true)}
          onBlur={() => setHideErr(true)}
          onChange={(event) => setLinkValue(event.target.value)}
          className="text-black px-8 py-4 min-w-[793px] placeholder:text-[#A4A3A4] text-2xl outline-0"
          placeholder="https://"
          type="text"
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            onsubmit();
          }}
          className="h-24 w-24 bg-[#F8D231] relative"
          type="submit"
        >
          <div className={`${style.arrow} arrow`}>
            <div>
              <div></div>
            </div>
          </div>
        </button>
        {!isHideErr && (
          <div className={`${style["exm-point"]} exm-point`}>
            <div></div>
          </div>
        )}
      </div>
      {!isHideErr && <div className="pt-2 text-[#C6A827] first-letter:uppercase">error message here</div>}
    </form>
  );
};

export default FormLinkComponent;
