import type { RegionMapSvg as RegionMapSvgData } from "@/lib/data/regions";

/**
 * Static valley-scale map artwork (ground, lakes, river, rail, ridges) fed
 * into MapExplorer as `mapSvg`. Hand-drawn per region (spec §7, Q7) — the
 * geometry lives in the region's data file, not here.
 */
export function RegionMapSvg({ data }: { data: RegionMapSvgData }) {
  return (
    <svg viewBox={data.viewBox}>
      <path d={data.ground} fill="#241F19" />
      {data.lakes.map((lake) => (
        <ellipse
          key={`${lake.cx}-${lake.cy}`}
          cx={lake.cx}
          cy={lake.cy}
          rx={lake.rx}
          ry={lake.ry}
          transform={`rotate(${lake.rotate} ${lake.cx} ${lake.cy})`}
          fill="#2E4A55"
        />
      ))}
      <path d={data.river} stroke="#2E4A55" strokeWidth={7} fill="none" strokeLinecap="round" />
      <path
        d={data.rail}
        stroke="#4A4036"
        strokeWidth={2}
        fill="none"
        strokeDasharray="6 8"
      />
      <path d={data.ridges} stroke="#332C25" strokeWidth={2} fill="none" strokeLinejoin="round" />
    </svg>
  );
}
