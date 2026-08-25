"use client";

import { useState } from "react";
import { Chip } from "@/components/Chip";
import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/SectionHead";
import { GOODS, SHOP_TABS } from "@/lib/data/landing";
import styles from "./CatalogTabs.module.css";

/**
 * Souvenir/grocery catalog (spec §4.1 §6 / §5.3). Filtering HIDES
 * non-matching cards via CSS `display: none` rather than removing them from
 * the DOM/reordering — the grid must not reflow into ragged rows.
 */
export function CatalogTabs() {
  const [shop, setShop] = useState<string>("all");

  return (
    <section className={styles.section}>
      <div className="gutter">
      <div className={styles.head}>
        <SectionHead
          eyebrow="Supermarket & souvenir field guide"
          title="What to put in the backpack"
          lead={
            <>
              Restaurants are the fastest way to burn a budget here; supermarkets are the
              slowest. These are the shelf items worth knowing by name — half of them double as
              the souvenir you were going to overpay for at the airport.
            </>
          }
        />
        <div className={styles.tabs}>
          {SHOP_TABS.map((tab) => (
            <Chip
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              pressed={shop === tab.id}
              onClick={() => setShop(tab.id)}
            />
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {GOODS.map((good) => (
          <div
            key={good.name}
            className={styles.card}
            style={shop !== "all" && shop !== good.tab ? { display: "none" } : undefined}
          >
            <div className={styles.swatch} style={{ background: good.swatch }}>
              <Icon d={good.icon} size={66} strokeWidth={1.1} color={good.ink} className={styles.icon} />
              <div className={styles.kind} style={{ color: good.ink }}>
                {good.kind}
              </div>
            </div>
            <div className={styles.body}>
              <div className={`serif ${styles.name}`}>{good.name}</div>
              <div className={styles.note}>{good.note}</div>
              <div className={styles.footer}>
                <div className={styles.price}>{good.price}</div>
                <div className={styles.where}>
                  <Icon d="M4 6h16l-1.4 10.4a2 2 0 01-2 1.6H7.4a2 2 0 01-2-1.6zM9 6V4.5A3 3 0 0115 4.5V6" size={15} strokeWidth={1.7} />
                  {good.where}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.disclaimer}>
        Prices are rough supermarket ballparks in Swiss francs and move around — check before you
        budget.
      </div>
      </div>
    </section>
  );
}
