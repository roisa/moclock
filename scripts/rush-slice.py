#!/usr/bin/env python3
"""Slice a ChatGPT-generated sheet/still into game-ready WebP for Baby Mo Time Rush.

  python3 scripts/rush-slice.py art-src/rush/mo-ride-loop.png mo-ride-loop --grid 4x2
  python3 scripts/rush-slice.py art-src/rush/env-library.png env-library --still

Sheets: cuts the grid, trims each cell to its alpha bbox, then re-centres every
frame on a common canvas so the lowest opaque row (wheel contact) sits on the
same baseline (92%) and the horizontal centre of mass matches. Writes a single
horizontal strip public/rush/art/<id>.webp and records frame size + count in
public/rush/art/atlas.json (the game reads it to know the frame layout).
Near-white backgrounds (when the generator ignored "transparent") are keyed out.
"""
import argparse, json, os
from PIL import Image

OUT = "public/rush/art"

def key_white(im, tol=18):
    im = im.convert("RGBA"); px = im.load(); w, h = im.size
    if px[0, 0][3] < 250: return im  # already transparent
    bg = px[0, 0][:3]
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            d = max(abs(r - bg[0]), abs(g - bg[1]), abs(b - bg[2]))
            if d < tol: px[x, y] = (r, g, b, 0)
            elif d < tol * 2: px[x, y] = (r, g, b, int(a * (d - tol) / tol))
    return im

def bbox(im):
    return im.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()

def cx(im):
    a = im.getchannel("A"); w, h = im.size; tot = sx = 0
    data = a.load()
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            v = data[x, y]
            if v > 24: tot += v; sx += v * x
    return sx / tot if tot else w / 2

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src"); ap.add_argument("id")
    ap.add_argument("--grid", default=None, help="CxR, e.g. 4x2")
    ap.add_argument("--still", action="store_true")
    ap.add_argument("--height", type=int, default=360, help="output frame height")
    ap.add_argument("--baseline", type=float, default=0.92)
    ap.add_argument("--frames", type=int, default=None, help="use only the first N cells")
    a = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    im = key_white(Image.open(a.src))
    atlas_p = os.path.join(OUT, "atlas.json")
    atlas = json.load(open(atlas_p)) if os.path.exists(atlas_p) else {}
    if a.still or not a.grid:
        b = bbox(im); im = im.crop(b)
        s = min(1, 1024 / max(im.size)); im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
        im.save(os.path.join(OUT, a.id + ".webp"), quality=90, method=6)
        atlas[a.id] = {"w": im.width, "h": im.height, "frames": 1}
    else:
        c, r = map(int, a.grid.lower().split("x"))
        cw, ch = im.width // c, im.height // r
        cells = [im.crop((x * cw, y * ch, (x + 1) * cw, (y + 1) * ch)) for y in range(r) for x in range(c)]
        if a.frames: cells = cells[: a.frames]
        crops = []
        for cell in cells:
            b = bbox(cell)
            if not b: continue
            crops.append((cell.crop(b), cx(cell) - b[0]))
        H = max(t.height for t, _ in crops); W = max(t.width for t, _ in crops)
        fw, fh = int(W * 1.1), int(H / a.baseline * 1.02)
        scale = a.height / fh; fw2, fh2 = round(fw * scale), a.height
        strip = Image.new("RGBA", (fw2 * len(crops), fh2), (0, 0, 0, 0))
        for i, (t, mx) in enumerate(crops):
            f = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
            f.alpha_composite(t, (int(fw / 2 - mx), int(fh * a.baseline - t.height)))
            strip.alpha_composite(f.resize((fw2, fh2), Image.LANCZOS), (i * fw2, 0))
        strip.save(os.path.join(OUT, a.id + ".webp"), quality=88, method=6)
        atlas[a.id] = {"w": fw2, "h": fh2, "frames": len(crops), "baseline": a.baseline}
    json.dump(atlas, open(atlas_p, "w"), indent=1, sort_keys=True)
    print(a.id, atlas[a.id])

if __name__ == "__main__":
    main()
