// Cross-cutting types shared by more than one page.
// Domain-specific shapes live next to their data in lib/data/*.

/** Scene placeholder variant, e.g. "sky-mist t-emerald" — a sky palette crossed
 *  with a rock tone (spec §2.6). The class pair is the brief for the real
 *  photograph that must replace it before launch. */
export type SceneVariant = string;

/** One filter chip definition. `icon` is a stroke path on a 24px viewBox. */
export interface FilterDef {
  id: string;
  label: string;
  icon: string;
}

/** A pin on a MapExplorer map. x/y are percentages of the map box (spec §5.2). */
export interface MapPlace {
  name: string;
  x: string;
  y: string;
  /** Filter ids this place matches. */
  tags: string[];
  scene: SceneVariant;
  image: string;
  /** Eyebrow above the name in the detail card (canton or place kind). */
  eyebrow: string;
  body: string;
  /** Icon + text fact rows under the body. */
  facts: { icon: string; text: string }[];
}

/** Legend entries under a map — must explain every rendered pin state (spec §5.2). */
export interface MapLegendItem {
  kind: 'selected' | 'match' | 'dimmed' | 'dash' | 'lake';
  label: string;
}
