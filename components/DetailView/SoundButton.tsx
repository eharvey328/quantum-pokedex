import { Button, Icon } from "@components/shared";
import styles from "./DetailView.module.scss";

export interface SoundButton {
  src: string;
}

export const SoundButton = ({ src }: SoundButton) => {
  const audio = new Audio(src);

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
