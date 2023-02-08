import { useRef } from "react";
import style from "./Player.module.scss";
import { useAudioPlayer } from "../../hooks/audioPlayer";

interface Props {
  url: string;
  callbackExit: Function;
}

const PlayerComponent = ({ url, callbackExit }: Props) => {
  const refAudio = useRef<HTMLAudioElement>(null);
  const {
    onChangeTimeTrack,
    onChangeVolume,
    onLoadTrack,
    onPauseTrack,
    timeStamp,
    timeTrack,
    onPlayTrack,
    onSetTimestamp,
    showPauseIcon,
    volume,
    showPlayIcon,
    isHidePreload,
    isPlayMusic,
  } = useAudioPlayer({ url, refAudio });

  const onExitPlayer = () => {
    onLoadTrack();
    callbackExit();
  };

  return (
    <div className="flex-[0_1_620px] flex flex-col gap-y-5">
      <audio onPause={showPauseIcon} onPlay={showPlayIcon} onTimeUpdate={onSetTimestamp} ref={refAudio}></audio>
      <h2 className="text-player-title pb-0 text-ellipsis overflow-hidden max-w-[620px] text-2xl whitespace-nowrap">
        {url}
      </h2>
      <div className="bg-player-bg w-full h-full flex flex-col p-5 gap-y-[38px] relative overflow-hidden">
        {!isHidePreload && <div className={style.preload}></div>}
        {!isPlayMusic && (
          <button onClick={onPlayTrack} type="button" className="w-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -20 40 40" width="40px" height="40px">
              <path d="M 0 -2 L -35 -20 L -40 -20 L -40 20 L -35 20 L 0 2 L 0 -2" fill="#FFF" />
            </svg>
          </button>
        )}
        {isPlayMusic && (
          <button onClick={onPauseTrack} type="button" className="h-10 w-10 flex flex-row ml-1 items-center gap-x-6">
            <div className="w-1 h-full bg-white"></div>
            <div className="w-1 h-full bg-white"></div>
          </button>
        )}
        <input
          style={{ backgroundSize: `${timeStamp}% 100%` }}
          onChange={onChangeTimeTrack}
          className={`${style["range"]} ${style["range-time"]} range`}
          min={0}
          max={100}
          value={timeStamp}
          type="range"
        />
        <div className="flex flex-row justify-between items-center">
          <h4 className="">
            {timeTrack.min}:{timeTrack.sec}
          </h4>
          <div className="flex justify-center items-center">
            <input
              style={{ backgroundSize: `${volume}% 100%` }}
              onChange={onChangeVolume}
              className={`${style["range"]} ${style["range-volume"]} range`}
              min={0}
              max={100}
              value={volume}
              type="range"
            />
          </div>
        </div>
      </div>
      <button onClick={onExitPlayer} className="flex flex-row items-center gap-x-[7px]" type="button">
        <div className={`${style.arrow} arrow`}>
          <div>
            <div></div>
          </div>
        </div>
        <div className="first-letter:uppercase">back</div>
      </button>
    </div>
  );
};

export default PlayerComponent;
