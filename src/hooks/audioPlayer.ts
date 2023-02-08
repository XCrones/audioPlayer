import { RefObject, SyntheticEvent, useEffect, useState } from "react";

interface Props {
  url: string;
  refAudio: RefObject<HTMLAudioElement>;
}

export const useAudioPlayer = ({ url, refAudio }: Props) => {
  const [isHidePreload, setHidePreload] = useState(true);
  const [volume, setVolume] = useState(100);
  const [timeTrack, setTimeTrack] = useState<{ min: string; sec: string }>({ min: "00", sec: "00" });
  const [timeStamp, setTimeStamp] = useState(0);
  const [isPlayMusic, setPlayMusic] = useState(false);

  const showPlayIcon = () => setPlayMusic(true);
  const showPauseIcon = () => setPlayMusic(false);

  const onPlayTrack = () => {
    const audio = refAudio.current;
    if (!!audio) {
      audio.play();
      setHidePreload(false);
    }
  };

  const onPauseTrack = () => {
    const audio = refAudio.current;
    if (!!audio) {
      audio.pause();
    }
  };

  const onLoadTrack = () => {
    const audio = refAudio.current;
    if (!!audio) {
      audio.load();
    }
  };

  const onChangeVolume = (event: SyntheticEvent<HTMLInputElement, Event>) => {
    const value = event.currentTarget.value;
    event.currentTarget.style.backgroundSize = `${value}% 100%`;
    setVolume(+value);
  };

  const onChangeTimeTrack = (event: SyntheticEvent<HTMLInputElement, Event>) => {
    try {
      const value = event.currentTarget.value;
      event.currentTarget.style.backgroundSize = `${value}% 100%`;
      const audio = refAudio.current;
      if (!!audio) {
        const durationTime = audio.duration;
        const targetTime = Math.floor((durationTime * +value) / 100);
        audio.currentTime = targetTime;
      }
    } catch (e) {}
  };

  const onSetTimestamp = (event: SyntheticEvent<HTMLAudioElement, Event>) => {
    const timestamp = event.currentTarget.currentTime;
    const durationTrack = event.currentTarget.duration;

    try {
      const minutes = Math.floor(timestamp / 60);
      const seconds = Math.floor(timestamp % 60);

      setTimeTrack({
        min: String(minutes).length === 1 ? `0${minutes}` : String(minutes),
        sec: String(seconds).length === 1 ? `0${seconds}` : String(seconds),
      });

      if (!isNaN(durationTrack) && isFinite(durationTrack)) {
        const time = Math.floor(durationTrack);
        const sliderTime = Math.floor((100 * timestamp) / time);
        setTimeStamp(sliderTime);

        if (
          !isHidePreload &&
          Math.floor(event.currentTarget.duration) === Math.floor(event.currentTarget.buffered.end(0))
        ) {
          setHidePreload(true);
        }
      }

      if (event.currentTarget.ended) {
        showPlayIcon();
      }
    } catch (e) {
      setTimeTrack({
        min: "00",
        sec: "00",
      });
    }
  };

  useEffect(() => {
    const audio = refAudio.current;
    if (!!audio) {
      audio.load();
      audio.pause();
      audio.preload = "auto";
      audio.src = url;
      audio.volume = volume / 100;
    }
  }, []);

  useEffect(() => {
    if (!!refAudio.current) {
      refAudio.current.volume = volume / 100;
    }
  }, [volume]);

  return {
    isHidePreload,
    timeTrack,
    timeStamp,
    isPlayMusic,
    volume,
    onPlayTrack,
    onPauseTrack,
    onLoadTrack,
    onChangeVolume,
    onChangeTimeTrack,
    onSetTimestamp,
    showPlayIcon,
    showPauseIcon,
  };
};
