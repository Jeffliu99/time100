"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./CompanionBreathingAvatar.module.css";

type CompanionBreathingAvatarProps = {
  name: string;
  avatar: string;
  size?: number;
  variant?: "idle" | "welcome";
  showHalo?: boolean;
  className?: string;
};

export function CompanionBreathingAvatar({
  name,
  avatar,
  size = 96,
  variant = "idle",
  showHalo = true,
  className = "",
}: CompanionBreathingAvatarProps) {
  const containerSize = Math.round(size * 1.45);
  const style = {
    width: containerSize,
    height: containerSize,
    "--avatar-size": `${size}px`,
  } as CSSProperties;

  return (
    <div
      className={`${styles.wrapper} ${styles[variant]} ${className}`}
      style={style}
      role="img"
      aria-label={`${name} companion`}
    >
      {showHalo && (
        <div className={styles.halos} aria-hidden="true">
          <span className={`${styles.halo} ${styles.haloOne}`} />
          <span className={`${styles.halo} ${styles.haloTwo}`} />
          <span className={`${styles.halo} ${styles.haloThree}`} />
          <span className={styles.coreGlow} />
        </div>
      )}

      <div className={styles.avatarMotion}>
        <Image
          src={avatar}
          alt=""
          width={size}
          height={size}
          priority={variant === "welcome"}
          className={styles.avatar}
        />
      </div>
    </div>
  );
}
