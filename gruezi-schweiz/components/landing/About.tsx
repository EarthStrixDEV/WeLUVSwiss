import { Icon } from "@/components/Icon";
import buttons from "@/components/buttons.module.css";
import { FACTS } from "@/lib/data/landing";
import styles from "./About.module.css";

/** About Switzerland (spec §4.1 §8): 5/7 split. The fact grid is built as a
 *  1px-gap grid over a --line background so the gaps read as hairlines. */
export function About() {
  return (
    <section className={`${styles.section} gutter`}>
      <div className={styles.grid}>
        <div className={styles.intro}>
          <div className={`eyebrow ${styles.eyebrow}`}>About Switzerland</div>
          <h2 className={`serif ${styles.title}`}>
            Four languages,
            <br />
            one timetable
          </h2>
          <p className={styles.lead}>
            A federal republic of 26 cantons wedged between the Alps and the Jura, sharing
            borders with Germany, France, Italy, Austria and Liechtenstein. German, French,
            Italian and Romansh are all national languages, and which one you hear can change
            between two stops on the same train.
          </p>
          <p className={styles.lead}>
            It is expensive — there is no way around that — but it is also extraordinarily easy.
            Public transport reaches villages of forty people, tap water is drinkable everywhere,
            including most town fountains, and the marked hiking network runs to tens of
            thousands of kilometres. Plan around the transport first and the rest of the budget
            follows from it.
          </p>
          <div className={styles.ctas}>
            <a href="/rail-passes" className={`${buttons.btn} ${buttons.red}`}>
              <Icon d="M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3" size={18} strokeWidth={1.7} />
              Compare rail passes
            </a>
            <a href="#" className={`${buttons.btn} ${buttons.ink}`}>
              <svg
                viewBox="0 0 24 24"
                width={18}
                height={18}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v18M3 12h18" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              Download the offline guide
            </a>
          </div>
        </div>

        <div className={styles.factsCol}>
          <div className={styles.factsGrid}>
            {FACTS.map((fact) => (
              <div key={fact.label} className={styles.factCard}>
                <Icon d={fact.icon} size={22} strokeWidth={1.6} color="var(--red)" />
                <div className={styles.factLabel}>{fact.label}</div>
                <div className={`serif ${styles.factValue}`}>{fact.value}</div>
                <div className={styles.factNote}>{fact.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
