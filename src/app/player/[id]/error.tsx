"use client";

import Link from "next/link";

import styles from "./error.module.scss";

export default function Error() {
  return (
    <div className={styles.container}>
      <h2 className={styles.errorTitle}>Cant find the requested song!</h2>
      <Link href="/" className={styles.link}>Go back</Link>
    </div>
  );
}
