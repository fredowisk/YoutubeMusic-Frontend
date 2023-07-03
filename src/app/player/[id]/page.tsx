import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Music | Music Player",
};

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

export default async function PlayerPage({ params: { id } }: PlayerPageProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs`);

  const songs = (await response.json()) as Song[];

  const numberId = Number(id);

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
