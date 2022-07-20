import { getMusicUrl } from "@/utils/request/api";
import Icon from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { IconPlaying, IconStopPlaying } from "../Icons";

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

    // 添加监听
    audio.addEventListener("play", play);
    audio.addEventListener("pause", pause);

    // 注销监听
    return () => {
      audio.removeEventListener("play", play);
      audio.removeEventListener("pause", pause);
    };
  }, [audioRef.current]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleKeyDonw = (e: any) => {
      if (e.code === "Space") handleToggle();
    };
    // 增加全局空格控制音乐
    window.addEventListener("keydown", handleKeyDonw);
    return () => window.removeEventListener("keydown", handleKeyDonw);
  }, []);
  return (
    <div className="flex items-center h-full">
      <audio ref={audioRef}>
        <source src={getMusicUrl(513360721)} />
      </audio>
      <Icon
        style={{ width: 32, height: 32 }}
        component={isPlaying ? IconStopPlaying : IconPlaying}
        onClick={handleToggle}
      />
    </div>
  );
};

export default MusicPlayer;
