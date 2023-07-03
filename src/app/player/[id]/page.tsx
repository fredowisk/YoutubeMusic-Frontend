import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Music | Music Player",
};

import { VideoPlayer } from "@/components/VideoPlayer";
import { PlaylistSongs } from "@/components/PlaylistSongs";
import { VideoPanel } from "@/components/VideoPanel";

import styles from "./styles.module.scss";

export default async function PlayerPage({ params: { id } }: any) {
  const response = await fetch("http://localhost:3001/songs");

  const songs = await response.json();

  const numberId = Number(id);

  const song = songs.find(({ song_id }: any) => song_id === numberId);

  console.log("PlayerPage");

  return (
    <div className={styles.container}>
      <VideoPlayer id={numberId} />
      <PlaylistSongs songs={songs} id={numberId} />
      <VideoPanel song={song} />
    </div>
  );
}
