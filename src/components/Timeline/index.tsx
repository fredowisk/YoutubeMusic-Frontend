"use client";

import { useContext } from "react";

import { VideoContext } from "@/contexts/VideoContext";

import styles from "./styles.module.scss";

export function Timeline() {
  const { timelineRef, seekerRef, seekInTimeline } = useContext(VideoContext);

  console.log("timeline");

  return (
    <div className={styles.container}>
      <div className={styles.timeline}>
        <div
          className={styles.seeker}
          onClick={seekInTimeline}
          ref={seekerRef}
        >
          <div className={styles.percentage} ref={timelineRef}></div>
        </div>
      </div>
    </div>
  );
}
