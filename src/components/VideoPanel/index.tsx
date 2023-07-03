import { Controls } from "../Controls";
import { Timeline } from "../Timeline";

import styles from "./styles.module.scss";

export function VideoPanel({ song }: any) {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Timeline />
        <Controls song={song} />
      </div>
    </div>
  );
}
