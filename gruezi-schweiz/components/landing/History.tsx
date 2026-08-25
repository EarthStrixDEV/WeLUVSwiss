import { Icon } from "@/components/Icon";
import { Scene } from "@/components/Scene";
import { TIMELINE } from "@/lib/data/landing";
import styles from "./History.module.css";

/** History section (spec §4.1 §2): 12-col grid, 4/4/4 — intro, timeline,
 *  scene image with a placeholder caption. Below 760px only `mobile: true`
 *  timeline rows show (spec §4.1 mobile abridged six-entry timeline). */
export function History() {
  return (
    <>
      <section className={`${styles.section} gutter`}>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <div className={`eyebrow ${styles.eyebrow}`}>Chapter one</div>
            <h2 className={`serif ${styles.title}`}>
              A country
              <br />
              built on a
              <br />
              promise
            </h2>
            <p className={styles.lead}>
              Switzerland did not begin as a kingdom. It began as an alliance between valley
              communities who wanted to be left alone — and then spent six centuries negotiating
              what that meant. Understanding the timeline explains almost everything a traveller
              notices: the four languages, the flags on every building, the referendums, and a
              timetable the whole country arranges itself around.
            </p>
            <div className={styles.readMore}>
              <Icon d="M4 19V6a2 2 0 012-2h5v15H6a2 2 0 00-2 2z M20 19V6a2 2 0 00-2-2h-5v15h5a2 2 0 012 2z" size={18} strokeWidth={1.7} />
              Read the long version
            </div>
          </div>

          <div className={styles.timeline}>
            {TIMELINE.map((ev) => (
              <div
                key={ev.year}
                className={`${styles.row} ${ev.mobile ? styles.mobileRow : ""}`}
              >
                <div className={`serif ${styles.year}`}>{ev.year}</div>
                <div>
                  <div className={styles.evTitle}>{ev.title}</div>
                  <div className={styles.evBody}>{ev.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.imageCol}>
            <Scene variant="sky-mist t-slate" image="/images/home/rutli-meadow.png" className={styles.scene} />
            <div className={styles.caption}>
              The Rütli meadow above Lake Lucerne, where the founding cantons are said to have
              sworn the 1291 alliance. <span className={styles.placeholder}>[replace with photograph]</span>
            </div>
          </div>
        </div>
      </section>
      <div className={`${styles.ruleWrap} gutter`}>
        <hr className={styles.rule} />
      </div>
    </>
  );
}
