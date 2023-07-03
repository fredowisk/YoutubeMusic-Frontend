"use client";

import Link from "next/link";

import { useRef } from "react";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import styles from "./styles.module.scss";

export function Carousel({ songs }: any) {
  const carouselRef = useRef<HTMLUListElement>(null);

  let currentIndex = 0;

  console.log("carousel");

  function slideTo(index: number) {
    if (carouselRef.current)
      carouselRef.current.style.transform = `translateX(-${
        (carouselRef.current.offsetWidth / 3) * index
      }px)`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        <ul ref={carouselRef} className={styles.carousel}>
          {songs.map((song: any) => (
            <li key={song.song_id}>
              <Link href={`/player/${song.song_id}`} prefetch={false}>
                <img src={song.thumbnail} alt={song.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.prevButton}
          onClick={() => {
            if (currentIndex > 0) {
              currentIndex--;
              slideTo(currentIndex);
            }
          }}
        >
          <MdArrowBackIos />
        </button>
        <button
          className={styles.nextButton}
          onClick={() => {
            if (currentIndex < (carouselRef.current?.children.length || 0)) {
              currentIndex++;
              slideTo(currentIndex);
            }
          }}
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
}
