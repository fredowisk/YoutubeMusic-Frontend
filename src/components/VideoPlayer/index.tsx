"use client";

import { useContext } from "react";
import styles from "./styles.module.scss";
import { VideoContext } from "@/contexts/VideoContext";

export function VideoPlayer({ id }: any) {
  const {
    videoRef,
    togglePlayVideo,
    updateProgressBar,
    endSong,
  } = useContext(VideoContext);

  console.log("videoPlayer");

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        src={`http://localhost:3001/song?watch=${id}`}
        autoPlay
        onClick={togglePlayVideo}
        onTimeUpdate={updateProgressBar}
        onEnded={endSong}
      ></video>
    </div>
  );
}
