import { useState } from "react";
import FormLinkComponent from "./FormLink.component";
import PlayerComponent from "./Player.component";

const AudioComponent = () => {
  const [isHideForm, setHideForm] = useState(false);
  const [link, setLink] = useState("");

  const onExitPlayer = () => setHideForm(false);

  const callbackForm = (link: string) => {
    setLink(link);
    setHideForm(true);
  };

  return (
    <div className="flex-auto flex justify-center items-center font-space-grotesk">
      {!isHideForm && <FormLinkComponent callback={callbackForm} />}
      {isHideForm && <PlayerComponent url={link} callbackExit={onExitPlayer} />}
    </div>
  );
};

export default AudioComponent;
