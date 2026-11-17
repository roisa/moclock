import type { Question } from "../engine/types";
import type { Msg } from "../i18n/types";

export interface PlayerProps<Q extends Question = Question> {
  q: Q;
  /** number of mistakes on this question so far: players show stronger visual help as it grows */
  hints: number;
  /** a mistake: Mo explains (optionally with a custom line) and the child tries again */
  onMiss: (say?: Msg) => void;
  /** solved: optional custom praise line (e.g. an explanation) */
  onSolve: (say?: Msg) => void;
  solved: boolean;
}
export type Of<T extends Question["type"]> = Extract<Question, { type: T }>;
