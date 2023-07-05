import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Music | Music Player",
};

import { getSongs, preloadSongs } from "@/utils/getSongs";

import { VideoPlayer } from "@/components/VideoPlayer";
import { PlaylistSongs } from "@/components/PlaylistSongs";
import { VideoPanel } from "@/components/VideoPanel";

import styles from "./styles.module.scss";
import Error from "./error";

interface PlayerPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 60 * 60 * 24 * 365; //one year;

export default async function PlayerPage({ params: { id } }: PlayerPageProps) {
  preloadSongs();

  const numberId = Number(id);

  const songs = await getSongs();

  const song = songs.find(({ song_id }) => song_id === numberId);

  if (!song) return <Error />;

  return (
    <div className={styles.container}>
      <VideoPlayer id={numberId} />
      <PlaylistSongs songs={songs} id={numberId} />
      <VideoPanel song={song} />
    </div>
  );
}
