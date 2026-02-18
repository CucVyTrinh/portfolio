import styles from "./ProjectInfoCard.module.css";

/**
 * Reusable project meta block: Role, Tools, Duration.
 * Used on every project detail page (e.g. Mien) in the Overview section.
 */
export default function ProjectInfoCard({ role, tools, duration }) {
  return (
    <aside className={styles.card} aria-label="Project details">
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt className={styles.label}>Role</dt>
          <dd className={styles.value}>{role}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Tools</dt>
          <dd className={styles.value}>{tools}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Duration</dt>
          <dd className={styles.value}>{duration}</dd>
        </div>
      </dl>
    </aside>
  );
}
