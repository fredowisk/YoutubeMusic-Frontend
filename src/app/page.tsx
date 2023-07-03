import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Music | Home",
};

import { Carousel } from "@/components/Carousel";

import styles from "./page.module.scss";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs`);

  const songs = await response.json();

  return (
    <div className={styles.container}>
      <h2>Songs</h2>

      <Carousel songs={songs} />
    </div>
  );
}
