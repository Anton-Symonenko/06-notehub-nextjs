import css from "./EmptyState.module.css";

export default function EmptyState() {
  return <p className={css.message}>No notes found</p>;
}
