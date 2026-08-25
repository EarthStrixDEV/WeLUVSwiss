"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Scene } from "@/components/Scene";
import { Icon } from "@/components/Icon";
import buttons from "@/components/buttons.module.css";
import { SLIDES } from "@/lib/data/landing";
import styles from "./Carousel.module.css";

/**
 * Huge image carousel (spec §4.1 §4 / §5.1). Track width, slide width and the
 * translate offset are all derived from `SLIDES.length` — never hard-coded —
 * so the layout adapts with no code change if the slide count changes.
 * "Previous"/"Next valley" wrap in both directions. Arrow keys move the slide
 * when the carousel region has focus (spec §6). Below 760px the same DOM
 * becomes a scroll-snap card row via CSS; the transform is dropped there.
 */
export function Carousel() {
  const [slide, setSlide] = useState(0);
  const count = SLIDES.length;
  const regionRef = useRef<HTMLDivElement>(null);

  const prev = () => setSlide((s) => (s + count - 1) % count);
  const next = () => setSlide((s) => (s + 1) % count);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section
      ref={regionRef}
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Regions to visit"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className={styles.track}
        style={{
          width: `${count * 100}%`,
          transform: `translateX(${(-100 / count) * slide}%)`,
        }}
      >
        {SLIDES.map((s) => (
          <div key={s.region} className={styles.slide} style={{ width: `${100 / count}%` }}>
            <Scene variant={s.scene} image={s.image} className={styles.scene} />
            <div className={styles.gradient} />
            <div className={styles.slideCopy}>
              <div className={`eyebrow ${styles.eyebrow}`}>{s.region}</div>
              <h2 className={`serif ${styles.title}`}>{s.title}</h2>
              <p className={styles.body}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.buttons}>
          <button type="button" className={`${buttons.btn} ${buttons.ghost} ${styles.round}`} onClick={prev}>
            <Icon d="M15 5l-7 7 7 7" size={18} strokeWidth={1.8} />
            Previous
          </button>
          <button type="button" className={`${buttons.btn} ${buttons.red} ${styles.round}`} onClick={next}>
            Next valley
            <Icon d="M9 5l7 7-7 7" size={18} strokeWidth={1.8} />
          </button>
        </div>
        <div className={styles.dots}>
          {SLIDES.map((s, i) => (
            <button
              key={s.region}
              type="button"
              className={styles.dot}
              aria-current={i === slide}
              aria-label={`Show ${s.region}`}
              onClick={() => setSlide(i)}
            >
              <span className={`${styles.bar} ${i === slide ? styles.barOn : ""}`} />
              <span className={`${styles.region} ${i === slide ? styles.regionOn : ""}`}>{s.region}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
