"use client";

/**
 * Repeating 4-icons background for non-landing pages.
 * Renders multiple cycles so the background never ends as you scroll.
 */
const ICONS = [
  { id: "empathy" },
  { id: "creativity" },
  { id: "perfection" },
  { id: "collaboration" },
];

const CYCLE_COUNT = 4;

export default function PageBgIcons() {
  return (
    <div className="pageBgIconsTop" aria-hidden>
      {Array.from({ length: CYCLE_COUNT }, (_, i) => (
        <div key={i} className="pageBgIconsCycle">
          {ICONS.map((icon) => (
            <span
              key={`${i}-${icon.id}`}
              className="pageBgIcon"
              data-img={icon.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
