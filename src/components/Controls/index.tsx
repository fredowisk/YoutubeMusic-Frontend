"use client";

import { useContext, useEffect, useState } from "react";

import {
  MdSkipPrevious,
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdVolumeUp,
  MdVolumeOff,
  MdShuffle,
  MdRepeat,
} from "react-icons/md";

import { VideoContext } from "@/contexts/VideoContext";

import styles from "./styles.module.scss";

interface ControlsProps {
  song: Song;
}

export function Controls({
  song: { thumbnail, duration, title, user },
}: ControlsProps) {
  const {
    repeatButtonRef,
    shuffleButtonRef,
    navigateToPreviousSong,
    navigateToNextSong,
    currentTimeRef,
    isPaused,
    isMuted,
    volume,
    togglePlayVideo,
    toggleAudio,
    toggleRepeatButton,
    shufflePlaylist,
    updateVolume,
    clearButtons,
  } = useContext(VideoContext);

  useEffect(() => {
    clearButtons();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftButtons}>
        <button
          onClick={navigateToPreviousSong}
          className={styles.previousButton}
        >
          <MdSkipPrevious title="Previous" />
        </button>
        <button className={styles.startButton} onClick={togglePlayVideo}>
          {isPaused ? <MdPlayArrow title="Play" /> : <MdPause title="Pause" />}
        </button>
        <button onClick={navigateToNextSong} className={styles.nextButton}>
          <MdSkipNext title="Next" />
        </button>
      </div>
      <div className={styles.playerTimer}>
        <time className={styles.currentTime} ref={currentTimeRef}>
          0:00
        </time>
        <span>/</span>
        <time className={styles.songDuration}>{duration}</time>
      </div>
      <div className={styles.songContainer}>
        <img src={thumbnail} alt={title} />
        <div className={styles.songInfo}>
          <h3>{title}</h3>
          <h4>{user}</h4>
        </div>
      </div>
      <div className={styles.rightButtons}>
        <input
          type="range"
          className={styles.songVolume}
          onChange={(e) => updateVolume(Number(e.target.value))}
          min="0"
          max="100"
          value={volume}
        />
        <button className={styles.songAudio} onClick={toggleAudio}>
          {isMuted ? <MdVolumeOff title="Mute" /> : <MdVolumeUp title="Unmute" />}
        </button>

        <button
          className={styles.repeat}
          onClick={toggleRepeatButton}
          ref={repeatButtonRef}
        >
          <MdRepeat title="Repeat" />
        </button>
        <button
          className={styles.shuffle}
          onClick={shufflePlaylist}
          ref={shuffleButtonRef}
        >
          <MdShuffle title="Shuffle"/>
        </button>
      </div>
    </div>
  );
}
