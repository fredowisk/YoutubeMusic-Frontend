import { cache } from "react";
import "server-only";

export const preloadSongs = (): void => {
  void getSongs();
};

export const getSongs = cache(async (): Promise<Song[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs`);

  const songs = (await response.json()) as Song[];

  return songs;
});
