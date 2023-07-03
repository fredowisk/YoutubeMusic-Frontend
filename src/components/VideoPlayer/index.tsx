"use client";

import { useContext } from "react";

import { VideoContext } from "@/contexts/VideoContext";

import styles from "./styles.module.scss";

interface VideoPlayerProps {
  id: number
}

export function VideoPlayer({ id }: VideoPlayerProps) {
  const {
    videoRef,
    togglePlayVideo,
    updateProgressBar,
    endSong,
  } = useContext(VideoContext);

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
