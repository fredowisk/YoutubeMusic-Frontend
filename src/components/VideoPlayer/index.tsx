"use client";

import { useContext, useEffect } from "react";

import { VideoContext } from "@/contexts/VideoContext";

import styles from "./styles.module.scss";

interface VideoPlayerProps {
  id: number;
}

export function VideoPlayer({ id }: VideoPlayerProps) {
  const { videoRef, togglePlayVideo, updateProgressBar, endSong, volume } =
    useContext(VideoContext);

  useEffect(() => {
    console.log(volume)
    if (!videoRef.current) return;
    videoRef.current.volume = volume / 100;
  }, []);

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        src={`${process.env.NEXT_PUBLIC_API_URL}/song?watch=${id}`}
        autoPlay
        onClick={togglePlayVideo}
        onTimeUpdate={updateProgressBar}
        onEnded={endSong}
      ></video>
    </div>
  );
}
