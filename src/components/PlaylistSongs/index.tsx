"use client";

import Link from "next/link";

import { useContext, useEffect, useRef } from "react";

import { VideoContext } from "@/contexts/VideoContext";

import styles from "./styles.module.scss";

export function PlaylistSongs({ songs, id }: any) {
  const { setPlaylist, setCurrentIndex, playlist, shufflePlaylist } =
    useContext(VideoContext);
  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    liRef.current?.scrollIntoView({
      block: "end",
    });
    if (playlist.length) return;

    const [currentSong] = songs.splice(id - 1, 1);
    setPlaylist([currentSong, ...songs]);
  }, []);

  useEffect(() => {
    if (!playlist.length) return;
    const index = playlist.findIndex(({ song_id }: any) => song_id === id);
    console.log(index);
    setCurrentIndex(index);
  }, [playlist]);

  console.log("PlaylistSongs");

  return (
    <div className={styles.container}>
      <h3>up coming</h3>
      <div className={styles.divider}></div>
      <div className={styles.playlistContainer}>
        <ul className={styles.playlist}>
          {playlist.map((song: any, index: any) => (
            <li
              key={song.title + index + song.song_id}
              className={`${styles.song} ${
                song.song_id === id ? styles.active : ""
              }`}
              ref={song.song_id === id ? liRef : undefined}
            >
              <Link
                className={styles.songLink}
                href={`./${song.song_id}`}
                prefetch={false}
              >
                <div className={styles.songContainer}>
                  <img
                    className={styles.thumbnail}
                    src={song.thumbnail}
                    alt={song.title}
                  />
                  <div className={styles.songInfo}>
                    <span>
                      {song.title + "oooooooooooooooooooooooooooooooooooooooo"}
                    </span>
                    <span>{song.user}</span>
                  </div>
                </div>

                <span className={styles.duration}>{song.duration}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
