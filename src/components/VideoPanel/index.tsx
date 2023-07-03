import { Controls } from "@/components/Controls";
import { Timeline } from "@/components/Timeline";

import styles from "./styles.module.scss";

interface VideoPanelProps {
  song: Song
}

export function VideoPanel({ song }: VideoPanelProps) {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Timeline />
        <Controls song={song} />
      </div>
    </div>
  );
}
