import { useMemo } from "react";

import { Button, Icon } from "@components/shared";

import styles from "./DetailView.module.scss";

export interface SoundButton {
  src: string;
}

export const SoundButton = ({ src }: SoundButton) => {
  const audio = useMemo(() => new Audio(src), [src]);

  return (
    <Button
      className={styles.sound}
      onClick={() => audio.play()}
      aria-label="pokemon sound"
    >
      <Icon name="sound" />
    </Button>
  );
};
