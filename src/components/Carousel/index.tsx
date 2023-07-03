"use client";

import Link from "next/link";

import { useRef } from "react";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import styles from "./styles.module.scss";

interface CarouselProps {
  songs: Song[];
}

export function Carousel({ songs }: CarouselProps) {
  const carouselRef = useRef<HTMLUListElement>(null);

  let currentIndex = 0;

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
          {songs.map(({ song_id, thumbnail, title }) => (
            <li key={song_id}>
              <Link href={`/player/${song_id}`} prefetch={false}>
                <img src={thumbnail} alt={title} />
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
