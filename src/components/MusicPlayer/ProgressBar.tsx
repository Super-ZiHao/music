import React, { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  audioClassName: string;
  height?: string;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    proportion: number
  ) => void;
};

const ProgressBar: React.FC<Props> = ({ audioClassName, height, onClick }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [totalDuration, setTotalDuration] = useState<number>(0); // 总时长
  const [currentDuration, setCurrentDuration] = useState<number>(0); // 当前时长
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [length, setLength] = useState<number>(0);
  const move = (e: any) => {
    setLength(e.pageX);
  };
  const handleMouseDown = () => {
    console.log("按下");
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    if (!audioElement) return;
    console.log("松开", length);
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  // 设置进度
  const setMusicRateOfProgress = useCallback(
    (cDuration: number) => {
      if (!audioElement) return;
      audioElement.currentTime = cDuration;
      audioElement.play();
    },
    [audioElement]
  );

  useEffect(() => {
    setAudioElement(
      document.getElementsByClassName(audioClassName)[0] as HTMLAudioElement
    ); // audio 标签
    if (!audioElement) return;
    const getTotalDuration = (e: any) => {
      setTotalDuration(e.target.duration);
    }; // 获取总时长
    const getCurrentDuration = (e: any) => {
      setCurrentDuration(e.target.currentTime);
    }; // 添加监听
    audioElement.addEventListener("play", getTotalDuration);
    audioElement.addEventListener("timeupdate", getCurrentDuration);
    return () => {
      audioElement.removeEventListener("play", getTotalDuration);
      audioElement.removeEventListener("timeupdate", getCurrentDuration);
    };
  }, [audioElement]);

  return (
    <div
      ref={progressBarRef}
      className="absolute w-full musicPlayer-progressBar flex"
      // @ts-ignore
      style={{ "--musicPlayer-progressBar-height": height }}
      onClick={(e: any) => {
        setMusicRateOfProgress(
          (e.pageX / (progressBarRef.current as HTMLDivElement).offsetWidth) *
            totalDuration
        );
      }}
    >
      <div
        className="line relative"
        style={{
          // @ts-ignore
          width: `${(currentDuration / totalDuration) * 100}%`,
        }}
      />
      <div
        className="spot"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default ProgressBar;
