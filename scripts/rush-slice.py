#!/usr/bin/env python3
"""Slice a ChatGPT-generated image into game-ready WebP for Baby Mo Time Rush.

  python3 scripts/rush-slice.py art-src/rush/p23-trees.png        # a pack: 3 x 2 grid of six things
  python3 scripts/rush-slice.py some.png my-id --grid 4x2         # any sheet → one animation strip
  python3 scripts/rush-slice.py some.png my-id --still            # one item

Packs (scripts/rush-packs.json, written by `npm run docs:rush`): item / pose packs
become one WebP per cell (named as in the pack); animation packs become one
strip per clip (e.g. the jump pack → mo-jump-prep, mo-jump-air, mo-land).

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

def trim_scale(cell, max_side=512):
    b = bbox(cell)
    if not b: return None
    t = cell.crop(b)
    k = min(1, max_side / max(t.size))
    return t.resize((max(1, round(t.width * k)), max(1, round(t.height * k))), Image.LANCZOS) if k < 1 else t

def align(cells, height, baseline):
    """put frames on one canvas size with a common ground line and centre of mass"""
    crops = []
    for cell in cells:
        b = bbox(cell)
        if b: crops.append((cell.crop(b), cx(cell) - b[0]))
    H = max(t.height for t, _ in crops); W = max(t.width for t, _ in crops)
    fw, fh = int(W * 1.1), int(H / baseline * 1.02)
    scale = height / fh; fw2 = round(fw * scale)
    out = []
    for t, mx in crops:
        f = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
        f.alpha_composite(t, (int(fw / 2 - mx), int(fh * baseline - t.height)))
        out.append(f.resize((fw2, height), Image.LANCZOS))
    return out

def pack_mode(src, pack_id, atlas):
    packs = json.load(open(os.path.join(os.path.dirname(__file__), "rush-packs.json")))
    if pack_id not in packs: raise SystemExit(f"unknown pack {pack_id}; known: {', '.join(packs)}")
    pk = packs[pack_id]
    im = key_white(Image.open(src))
    c, r = pk["grid"]
    cw, ch = im.width // c, im.height // r
    cells = [im.crop((x * cw, y * ch, (x + 1) * cw, (y + 1) * ch)) for y in range(r) for x in range(c)]
    if pk["clips"]:
        frames = align(cells, 360, 0.92)
        for clip in pk["clips"]:
            fr = frames[clip["from"]: clip["to"] + 1]
            strip = Image.new("RGBA", (fr[0].width * len(fr), fr[0].height), (0, 0, 0, 0))
            for i, f in enumerate(fr): strip.alpha_composite(f, (i * f.width, 0))
            strip.save(os.path.join(OUT, clip["id"] + ".webp"), quality=88, method=6)
            atlas[clip["id"]] = {"w": fr[0].width, "h": fr[0].height, "frames": len(fr), "fps": clip["fps"], "loop": clip["loop"], "baseline": 0.92}
            print(" ", clip["id"], len(fr), "frames")
    else:
        for cid, cell in zip(pk["cells"], cells):
            t = trim_scale(cell, 1024 if pk["grid"] == [1, 1] else 512)
            if t is None: print("  (empty cell)", cid); continue
            t.save(os.path.join(OUT, cid + ".webp"), quality=90, method=6)
            atlas[cid] = {"w": t.width, "h": t.height, "frames": 1}
            print(" ", cid, t.size)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src"); ap.add_argument("id", nargs="?", default=None)
    ap.add_argument("--grid", default=None, help="CxR, e.g. 4x2")
    ap.add_argument("--still", action="store_true")
    ap.add_argument("--height", type=int, default=360, help="output frame height")
    ap.add_argument("--baseline", type=float, default=0.92)
    ap.add_argument("--frames", type=int, default=None, help="use only the first N cells")
    a = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    atlas_p = os.path.join(OUT, "atlas.json")
    atlas = json.load(open(atlas_p)) if os.path.exists(atlas_p) else {}
    if not a.grid and not a.still:
        pack_mode(a.src, a.id or os.path.splitext(os.path.basename(a.src))[0], atlas)
        json.dump(atlas, open(atlas_p, "w"), indent=1, sort_keys=True)
        return
    if not a.id: raise SystemExit("give an id with --grid / --still")
    im = key_white(Image.open(a.src))
    if a.still:
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
