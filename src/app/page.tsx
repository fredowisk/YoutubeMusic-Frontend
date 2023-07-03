import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Music | Home",
};

import { Carousel } from "@/components/Carousel";

import styles from "./page.module.scss";

export default async function Home() {
  const response = await fetch("http://localhost:3001/songs");

  const songs = await response.json();

  console.log('home')
  
  return (
    <div className={styles.container}>
      <h2>Songs</h2>

      <Carousel songs={songs} />
    </div>
  );
}
