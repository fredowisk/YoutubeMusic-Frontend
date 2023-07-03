import Link from "next/link";

import styles from "./styles.module.scss";

export function Header() {

  console.log('header');
  
  return (
    <div className={styles.container}>
      <nav className={styles.navigator}>
        <ul className={styles.linksList}>
          <li className={styles.list}>
            <Link href="/" prefetch={false}>Home</Link>
          </li>
          <li className={styles.list}>
            <Link href="#">Explore</Link>
          </li>
          <li className={styles.list}>
            <Link href="#">Media</Link>
          </li>
          <li className={styles.list}>
            <Link href="#">Search</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
