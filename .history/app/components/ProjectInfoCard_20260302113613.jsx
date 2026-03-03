import styles from "./ProjectInfoCard.module.css";

function ValueLines({ items }) {
  const arr = Array.isArray(items)
    ? items
    : typeof items === "string"
      ? items.split("\n").filter(Boolean)
      : [String(items)];
  return (
    <>
      {arr.map((item, i) => (
        <span key={i} className={styles.valueLine}>{item}</span>
      ))}
    </>
  );
}

/**
 * Reusable project meta block: Role, Tools, Duration.
 * Used on every project detail page (e.g. Mien) in the Overview section.
 * role and tools can be strings or arrays (array = one item per row).
 */
export default function ProjectInfoCard({ role, tools, duration, team }) {
  return (
    <aside className={styles.card} aria-label="Project details">
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt className={styles.label}>Roles</dt>
          <dd className={styles.value}><ValueLines items={role} /></dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Tools</dt>
          <dd className={styles.value}><ValueLines items={tools} /></dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Duration</dt>
          <dd className={styles.value}>{duration}</dd>
        </div>
        {team && (
          <div className={styles.row}>
            <dt className={styles.label}>Team</dt>
            <dd className={styles.value}><ValueLines items={team} /></dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
