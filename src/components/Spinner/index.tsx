import styles from "./styles.module.scss";

export function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
      </div>
    </div>
  );
}
