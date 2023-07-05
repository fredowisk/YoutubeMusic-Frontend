import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Music | Music Player",
};

import dynamic from "next/dynamic";

import { getSongs, preloadSongs } from "@/utils/getSongs";

import { Spinner } from "@/components/Spinner";

const VideoPlayer = dynamic(
  async () => {
    const { VideoPlayer: Component } = await import("@/components/VideoPlayer");
    return { default: Component };
  },
  {
    loading: () => <Spinner />,
    ssr: false,
  }
);

import { PlaylistSongs } from "@/components/PlaylistSongs";
import { VideoPanel } from "@/components/VideoPanel";

import Error from "./error";

import styles from "./styles.module.scss";

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
