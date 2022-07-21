import React, { useRef } from "react";
import { useAudio } from "./hook";

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
  const { duration, currentDuration, changeCurrentDuration } =
    useAudio(audioClassName);

  // const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
  //   null
  // );
  // const [length, setLength] = useState<number>(0);
  // const move = (e: any) => {
  //   setLength(e.pageX);
  // };
  // const handleMouseDown = () => {
  //   console.log("按下");
  //   window.addEventListener("mousemove", move);
  //   window.addEventListener("mouseup", handleMouseUp);
  // };

  // const handleMouseUp = () => {
  //   if (!audioElement) return;
  //   console.log("松开", length);
  //   window.removeEventListener("mousemove", move);
  //   window.removeEventListener("mouseup", handleMouseUp);
  // };

  // 设置进度

  return (
    <div
      ref={progressBarRef}
      className="absolute w-full musicPlayer-progressBar flex"
      // @ts-ignore
      style={{ "--musicPlayer-progressBar-height": height }}
      onClick={(e: any) => {
        changeCurrentDuration(
          (e.pageX / (progressBarRef.current as HTMLDivElement).offsetWidth) *
            duration
        );
      }}
    >
      <div
        className="line relative"
        style={{
          // @ts-ignore
          width: `${(currentDuration / duration) * 100}%`,
        }}
      />
      <div
        className="spot"
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default ProgressBar;
