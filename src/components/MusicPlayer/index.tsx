import { getMusicUrl } from "@/utils/request/api";
import Icon from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { IconPlaying, IconStopPlaying } from "../Icons";
import ProgressBar from "./ProgressBar";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const handleToggle = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);

    audio.addEventListener("playing", play);
    audio.addEventListener("pause", pause);
    // 注销监听
    return () => {
      audio.removeEventListener("playing", play);
      audio.removeEventListener("pause", pause);
    };
  }, [audioRef.current]);

  // // 全局空格
  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
  //   const handleKeyDonw = (e: any) => {
  //     if (e.code === "Space") handleToggle();
  //   };
  //   // 增加全局空格控制音乐
  //   window.addEventListener("keydown", handleKeyDonw);
  //   return () => window.removeEventListener("keydown", handleKeyDonw);
  // }, []);
  return (
    <div className="flex items-center h-full pl-24 pr-24 relative">
      <audio
        ref={audioRef}
        className="music"
        src={getMusicUrl(513360721)}
      ></audio>
      {/* 进度条 */}
      <ProgressBar audioClassName="music" />
      {/* 播放按钮 */}
      <Icon
        style={{ width: 32, height: 32 }}
        component={isPlaying ? IconStopPlaying : IconPlaying}
        onClick={handleToggle}
      />
    </div>
  );
};

export default MusicPlayer;
