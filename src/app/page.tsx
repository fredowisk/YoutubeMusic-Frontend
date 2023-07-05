import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Music | Home",
};

import { getSongs, preloadSongs } from "@/utils/getSongs";
import { registerViews } from "@/utils/registerViews";

import { Carousel } from "@/components/Carousel";

import styles from "./page.module.scss";

export const revalidate = 60 * 60 * 24 * 365; //one year;

export default async function Home() {
  preloadSongs();
  
  const songs = await getSongs();
  
  await registerViews();

  return (
    <div className={styles.container}>
      <h2>Songs</h2>

      <Carousel songs={songs} />
    </div>
  );
}
