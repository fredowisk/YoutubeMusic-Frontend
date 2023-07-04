"use client";

import { useContext } from "react";

import { VideoContext } from "@/contexts/VideoContext";

import styles from "./styles.module.scss";

export function Timeline() {
  const { timelineRef, seekInTimeline, progress } = useContext(VideoContext);

  return (
    <div className={styles.container}>
      <div className={styles.timeline}>
        <div className={styles.percentage} ref={timelineRef}></div>
        <input
          className={styles.seekerRange}
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => {
            const value = Number(e.currentTarget.value);
            seekInTimeline(value);
          }}
        />
      </div>
    </div>
  );
}
