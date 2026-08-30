"use client";
import { useEffect, useState } from "react";
import styles from "./XpGrowthFeedback.module.css";

type Props = { companionName: string; level: number; totalXp: number; gainedXp?: number; triggerKey?: number; message?: string };

export default function XpGrowthFeedback({ companionName, level, totalXp, gainedXp = 0, triggerKey = 0, message = "Nice work." }: Props) {
  const currentXp = totalXp % 100;
  const target = currentXp;
  const previous = Math.max(currentXp - gainedXp, 0);
  const [width, setWidth] = useState(target);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!gainedXp || triggerKey === 0) { setWidth(target); setAnimating(false); return; }
    setAnimating(false);
    setWidth(previous);
    const start = window.setTimeout(() => { setAnimating(true); setWidth(target); }, 80);
    const stop = window.setTimeout(() => setAnimating(false), 3000);
    return () => { window.clearTimeout(start); window.clearTimeout(stop); };
  }, [triggerKey, gainedXp, previous, target]);

  return <section className={styles.card} aria-live="polite">
    <div className={styles.header}><div><strong>{companionName}</strong><p>{message}</p></div><span>Level {level}</span></div>
    <div className={styles.labels}><span>Growth XP</span><span>{currentXp} / 100 XP</span></div>
    <div className={styles.track}>
      {animating && <i className={styles.pulse} aria-hidden="true" />}
      <div className={`${styles.fill} ${animating ? styles.glow : ""}`} style={{ width: `${width}%` }} />
    </div>
    {animating && <div className={styles.reward}><span>✓ Task completed</span><b>+{gainedXp} XP</b></div>}
  </section>;
}
