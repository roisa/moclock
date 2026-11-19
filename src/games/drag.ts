/**
 * Pointer-based drag & drop that works the same with touch, mouse and pen,
 * plus tap-to-select for children (and switch users) who can't drag yet.
 *   - press a card and move > 8 px → it follows the finger; release over an
 *     element with [data-drop="<id>"] → onDrop(cardId, dropId)
 *   - press and release without moving → onTap(cardId)
 */
import { useCallback, useRef, useState, type PointerEvent as RPE } from "react";

export interface DragState {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  dx: number;
  dy: number;
}

export function useDrag(opts: { onDrop: (id: string, target: string | null) => void; onTap: (id: string) => void }) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const start = useRef<{ id: string; x: number; y: number; rect: DOMRect; moved: boolean; pid: number } | null>(null);
  const o = useRef(opts);
  o.current = opts;

  const bind = useCallback(
    (id: string) => ({
      onPointerDown: (e: RPE<HTMLElement>) => {
        if (e.button > 0) return;
        const rect = e.currentTarget.getBoundingClientRect();
        start.current = { id, x: e.clientX, y: e.clientY, rect, moved: false, pid: e.pointerId };
        e.currentTarget.setPointerCapture(e.pointerId);
      },
      onPointerMove: (e: RPE<HTMLElement>) => {
        const s = start.current;
        if (!s || s.id !== id) return;
        const dx = e.clientX - s.x, dy = e.clientY - s.y;
        if (!s.moved && Math.hypot(dx, dy) < 8) return;
        s.moved = true;
        setDrag({ id, x: e.clientX, y: e.clientY, w: s.rect.width, h: s.rect.height, dx: s.x - s.rect.left, dy: s.y - s.rect.top });
      },
      onPointerUp: (e: RPE<HTMLElement>) => {
        const s = start.current;
        start.current = null;
        if (!s || s.id !== id) return;
        if (!s.moved) {
          setDrag(null);
          o.current.onTap(id);
          return;
        }
        setDrag(null);
        // find a drop zone under the finger (ignore the dragged ghost itself)
        const els = document.elementsFromPoint(e.clientX, e.clientY);
        const zone = els.map((el) => (el as HTMLElement).closest?.("[data-drop]")).find(Boolean) as HTMLElement | undefined;
        o.current.onDrop(id, zone?.dataset.drop ?? null);
      },
      onPointerCancel: () => {
        start.current = null;
        setDrag(null);
      },
    }),
    [],
  );
  return { drag, bind };
}
