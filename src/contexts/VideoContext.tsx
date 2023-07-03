"use client";

import { useRouter } from "next/navigation";
import { createContext, useRef, useState } from "react";

export const VideoContext = createContext({} as any);

export const VideoContextProvider = ({ children }: any) => {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const currentTimeRef = useRef<HTMLTimeElement>(null);
  const seekerRef = useRef<HTMLDivElement>(null);
  const repeatButtonRef = useRef<HTMLButtonElement>(null);
  const shuffleButtonRef = useRef<HTMLButtonElement>(null);

  const [playlist, setPlaylist] = useState<any>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("context");

  const togglePlayVideo = () => {
    if (!videoRef.current) return;

    if (isPaused) videoRef.current.play();
    else videoRef.current.pause();

    setIsPaused(videoRef.current.paused);
  };

  const toggleAudio = () => {
    if (!videoRef.current) return;

    setIsMuted(!videoRef.current.muted);

    videoRef.current.muted = !isMuted;
  };

  const toggleRepeatButton = () => {
    if (!repeatButtonRef.current) return;
    if (
      repeatButtonRef.current.style.color === "var(--background-gray)" ||
      !repeatButtonRef.current.style.color
    )
      repeatButtonRef.current.style.color = "var(--white)";
    else repeatButtonRef.current.style.color = "var(--background-gray)";
  };

  const shufflePlaylist = () => {
    const [currentSong] = playlist.splice(currentIndex, 1);
    const shuffledPlaylist = [
      currentSong,
      ...playlist.sort(() => Math.random() - 0.5),
    ];
    setPlaylist(shuffledPlaylist);
  };

  const updateVolume = (volume: any) => {
    if (!videoRef.current) return;

    videoRef.current.volume = volume / 100;

    if (videoRef.current.volume === 0 && !isMuted) return toggleAudio();
    if (videoRef.current.volume > 0 && isMuted) return toggleAudio();
  };

  const calculateCurrentTime = (currentTime: any) => {
    if (!videoRef.current) return;
    const currentMinute = Math.floor(currentTime / 60);
    const currentSeconds = (currentTime % 60).toFixed();
    const currentTimeFormatted = `${String(currentMinute).padStart(
      2,
      "0"
    )}:${String(currentSeconds).padStart(2, "0")}`;

    return currentTimeFormatted;
  };

  const clearButtons = () => {
    setIsPaused(false);
    setIsMuted(false);
  };

  function seekInTimeline(e: any) {
    if (!videoRef.current || !seekerRef.current) return;

    const percent = e.nativeEvent.offsetX / seekerRef.current.offsetWidth;
    videoRef.current.currentTime = percent * videoRef.current.duration;
  }

  const calculatePercentPlayed = () => {
    if (!timelineRef.current || !videoRef.current) return;

    const timePlayed = (
      videoRef.current.currentTime / videoRef.current.duration
    ).toFixed(2);

    const percentagePlayed = Number(timePlayed) * 100;

    timelineRef.current.style.width = `${percentagePlayed}%`;
  };

  const updateProgressBar = () => {
    if (!currentTimeRef.current) return;
    currentTimeRef.current.innerHTML =
      calculateCurrentTime(videoRef.current?.currentTime) || "00:00";
    calculatePercentPlayed();
  };

  const navigateToPreviousSong = () => {
    const id =
      playlist[currentIndex - 1]?.song_id ||
      playlist[playlist.length - 1].song_id;

    router.push(`./${id}`);
  };

  const navigateToNextSong = () => {
    const id =
      playlist[currentIndex + 1]?.song_id ||
      playlist[playlist.length - 1 - currentIndex].song_id;

    router.push(`./${id}`);
  };

  const resetSong = () => {
    seekInTimeline({ nativeEvent: { offsetX: 0 } });
    videoRef.current?.play();
  };

  const endSong = () => {
    if (repeatButtonRef.current?.style.color === "var(--white)") resetSong();
    else navigateToNextSong();
  };

  return (
    <VideoContext.Provider
      value={{
        setPlaylist,
        setCurrentIndex,
        currentIndex,
        videoRef,
        currentTimeRef,
        timelineRef,
        seekerRef,
        repeatButtonRef,
        shuffleButtonRef,
        isPaused,
        isMuted,
        playlist,
        togglePlayVideo,
        toggleAudio,
        toggleRepeatButton,
        shufflePlaylist,
        updateVolume,
        updateProgressBar,
        seekInTimeline,
        navigateToPreviousSong,
        navigateToNextSong,
        clearButtons,
        endSong,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
