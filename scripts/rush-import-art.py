#!/usr/bin/env python3
"""Turn the approved Time Rush art in art-src/rush/ into game files (public/rush/mo, public/rush/bike).

  python3 scripts/rush-import-art.py

- p04-ride-user.png   6 rear riding frames (3x2) -> mo/ride.webp strip (common crop, same ground line)
- mo-wave-helmet.png  -> mo/wave.webp          - mo-back-stand.png -> mo/back.webp
- p01-mo-turnaround.png (4 views) -> mo/front.webp, mo/face.webp (head crop for speech bubbles)
- bike-side.png -> bike/side-<colour>.webp (frame recoloured: green, blue, yellow, pink, lavender, rainbow)
- p02-bike-views.png (4 views) -> bike/view-<n>.webp for the garage turntable
ChatGPT "transparent" PNGs keep junk colour in fully transparent pixels; only alpha is trusted.
"""
import os
import numpy as np
from PIL import Image

SRC = "art-src/rush"
MO, BIKE = "public/rush/mo", "public/rush/bike"
os.makedirs(MO, exist_ok=True); os.makedirs(BIKE, exist_ok=True)

def clean(im):
    im = im.convert("RGBA")
    a = np.array(im)
    a[a[..., 3] < 16] = 0  # drop near-invisible junk (glow / speckles)
    return Image.fromarray(a)

def bbox(im, thr=24):
    return im.getchannel("A").point(lambda v: 255 if v > thr else 0).getbbox()

def fit_h(im, h):
    return im.resize((round(im.width * h / im.height), h), Image.LANCZOS)

def save(im, path, q=90):
    im.save(path, quality=q, method=6); print(path, im.size)

def split_cols(im, n, windows=None):
    """split a row of n figures at the widest transparent gaps"""
    a = np.array(im.getchannel("A")) > 24
    col = a.any(axis=0)
    gaps, start = [], None
    for x, v in enumerate(col):
        if not v and start is None: start = x
        if v and start is not None: gaps.append((x - start, start, x)); start = None
    cuts = sorted(sorted(gaps, reverse=True)[: n - 1], key=lambda g: g[1])
    xs = [0] + [(g[1] + g[2]) // 2 for g in cuts] + [im.width]
    if len(xs) != n + 1 and windows:  # figures touch: cut at the emptiest column near each expected boundary
        dens = a.sum(axis=0)
        xs = [0] + [int(lo * im.width) + int(np.argmin(dens[int(lo * im.width): int(hi * im.width)])) for lo, hi in windows] + [im.width]
    return [im.crop((xs[i], 0, xs[i + 1], im.height)) for i in range(n)]

# --- riding frames: one crop box for all six so the wheel contact stays put
ride = clean(Image.open(f"{SRC}/p04-ride-user.png"))
cells = [ride.crop(((i % 3) * 512, (i // 3) * 512, (i % 3 + 1) * 512, (i // 3 + 1) * 512)) for i in range(6)]
boxes = [bbox(c) for c in cells]
box = (min(b[0] for b in boxes) - 4, min(b[1] for b in boxes) - 4, max(b[2] for b in boxes) + 4, max(b[3] for b in boxes) + 2)
frames = [fit_h(c.crop(box), 420) for c in cells]
strip = Image.new("RGBA", (frames[0].width * 6, frames[0].height), (0, 0, 0, 0))
for i, f in enumerate(frames): strip.alpha_composite(f, (i * f.width, 0))
save(strip, f"{MO}/ride.webp", 88)

# --- standing poses
for src, name, h in [("mo-wave-helmet.png", "wave", 720), ("mo-back-stand.png", "back", 720)]:
    im = clean(Image.open(f"{SRC}/{src}")); save(fit_h(im.crop(bbox(im)), h), f"{MO}/{name}.webp")
turn = clean(Image.open(f"{SRC}/p01-mo-turnaround.png"))
views = split_cols(turn.crop(bbox(turn)), 4)
front = views[0].crop(bbox(views[0]))
save(fit_h(front, 720), f"{MO}/front.webp")
save(fit_h(front.crop((0, 0, front.width, int(front.height * 0.52))), 300), f"{MO}/face.webp")

# --- bike side view + colour variants (only the green frame is recoloured)
bike = clean(Image.open(f"{SRC}/bike-side.png"))
bike = bike.crop(bbox(bike)); bike = bike.resize((900, round(bike.height * 900 / bike.width)), Image.LANCZOS)
hsv = np.array(bike.convert("RGB").convert("HSV")).astype(np.float32)
alpha = np.array(bike.getchannel("A"))
h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
green = (h > 50) & (h < 110) & (s > 90)  # PIL hue 0..255: green ≈ 60–100
targets = {"green": None, "blue": (148, 1.0, 1.0), "yellow": (38, 1.0, 1.32), "pink": (236, 0.75, 1.1), "lavender": (190, 0.7, 1.08), "rainbow": "rainbow"}
for name, t in targets.items():
    out = hsv.copy()
    if t == "rainbow":
        gx = np.where(green.any(axis=0))[0]
        xs = np.clip((np.arange(bike.width) - gx.min()) / max(1, gx.max() - gx.min()), 0, 1) * 215  # red → violet along the frame
        xs = xs[None, :].repeat(bike.height, 0)
        out[..., 0] = np.where(green, xs, h)
        out[..., 1] = np.where(green, 175, s)
        out[..., 2] = np.where(green, np.clip(v * 1.15, 0, 255), v)
    elif t:
        hue, ks, kv = t
        out[..., 0] = np.where(green, hue, h)
        out[..., 1] = np.where(green, np.clip(s * ks, 0, 255), s)
        out[..., 2] = np.where(green, np.clip(v * kv, 0, 255), v)
    rgb = Image.fromarray(out.astype(np.uint8), "HSV").convert("RGB")
    rgb.putalpha(Image.fromarray(alpha))
    save(rgb, f"{BIKE}/side-{name}.webp")

# --- turntable views
views = clean(Image.open(f"{SRC}/p02-bike-views.png"))
for i, v in enumerate(split_cols(views.crop(bbox(views)), 4, [(0.30, 0.38), (0.54, 0.62), (0.76, 0.85)])):
    v = v.crop(bbox(v)); save(fit_h(v, 420), f"{BIKE}/view-{i}.webp")
