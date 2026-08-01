import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import css from "./NoteList.module.css";

import type { Note } from "../../types/note";
import { deleteNote } from "@/lib/api";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onError: (error) => {
      console.log("Error deleting note:", error);
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const isDeleting =
          deleteMutation.isPending && deleteMutation.variables === note.id;
        return (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                type="button"
                onClick={() => deleteMutation.mutate(note.id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
