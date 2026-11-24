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

# ---------------------------------------------------------------- animation packs (same framing as the riding sheet)
from PIL import ImageDraw

def drop_block(cell):
    """the bump sheet draws a toy block at Mo's lower right: remove its blue edges and yellow star / side
    (only right of the wheel and low in the cell, where Mo has nothing blue or yellow)"""
    arr = np.array(cell)
    b = bbox(cell); w = b[2] - b[0]
    low = arr[..., 3] > 0
    lowrows = np.arange(arr.shape[0])[:, None] > b[1] + (b[3] - b[1]) * 0.62
    wx = wheel_x(cell)
    right = np.arange(arr.shape[1])[None, :] > wx + 0.12 * w
    hsv = np.array(cell.convert("RGB").convert("HSV")).astype(int)
    h, sat = hsv[..., 0], hsv[..., 1]
    blockish = (((h > 125) & (h < 180)) | ((h > 18) & (h < 50))) & (sat > 70)
    arr[..., 3] = np.where(low & lowrows & right & blockish, 0, arr[..., 3])
    # whatever is left of the block (its cream face) sits right of Mo's green shoe: clear that corner
    green = (h > 55) & (h < 115) & (sat > 90) & (arr[..., 3] > 60) & lowrows & right
    if green.any():
        shoe_x = np.where(green.any(axis=0))[0].max()
        beyond = np.arange(arr.shape[1])[None, :] > shoe_x + 3
        arr[..., 3] = np.where(lowrows & beyond, 0, arr[..., 3])
    return Image.fromarray(arr)

def wheel_x(cell):
    """x of the rear wheel: centre of the opaque pixels in the bottom 12% of the figure"""
    a = np.array(cell.getchannel("A")) > 60
    ys, xs = np.where(a)
    y0 = ys.max() - (ys.max() - ys.min()) * 0.12
    sel = xs[ys >= y0]
    # the wheel is the narrow run nearest the middle of the figure
    mid = (xs.min() + xs.max()) / 2
    near = sel[np.abs(sel - mid) < (xs.max() - xs.min()) * 0.2]
    return float(np.median(near if len(near) else sel))

def keep_main(cell):
    """keep only the part connected to the helmet (drops props / motion marks drawn beside Mo)"""
    cell = drop_block(cell)
    a = np.array(cell.getchannel("A")) > 40
    ys, xs = np.where(a)
    top = ys.min() + 25  # inside the helmet
    xs_top = np.sort(xs[ys == top])
    seed = (int(xs_top[len(xs_top) // 2]), int(top))  # a real helmet pixel
    # grow from the seed inside the mask (geodesic reconstruction) until nothing changes
    mask = Image.fromarray((a * 255).astype(np.uint8))
    cur = Image.new("L", mask.size, 0); cur.putpixel(seed, 255)
    from PIL import ImageChops
    while True:
        nxt = ImageChops.darker(cur.filter(ImageFilter.MaxFilter(9)), mask)
        if ImageChops.difference(nxt, cur).getbbox() is None: break
        cur = nxt
    keep = np.array(cur) > 0
    keep = np.array(Image.fromarray((keep * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0  # keep soft edges
    out = np.array(cell); out[..., 3] = np.where(keep, out[..., 3], 0)
    return Image.fromarray(out)

from PIL import ImageFilter
RIDE_FW, RIDE_FH = frames[0].size  # the in-game frame size (from the riding sheet)
ride_w = np.median([b[2] - b[0] for b in boxes])  # Mo + bike width in the riding sheet (cell px)
ride_scale = RIDE_FH / (box[3] - box[1])

PACK_FW = round(RIDE_FW * 1.45)  # animation frames get a wider canvas (arms, the package) — same scale and anchor

def pack_frames(src, use, clean_props=False):
    im = clean(Image.open(f"{SRC}/{src}"))
    cells = [im.crop(((i % 3) * 512, (i // 3) * 512, (i % 3 + 1) * 512, (i // 3 + 1) * 512)) for i in range(6)]
    cells = [cells[i] for i in use]
    if clean_props: cells = [keep_main(c) for c in cells]
    bbs = [bbox(c) for c in cells]
    ground = max(b[3] for b in bbs)
    k = ride_scale * ride_w / np.median([b[2] - b[0] for b in bbs])  # match Mo's on-screen size to the riding sheet
    FH = max(RIDE_FH, int(np.ceil((ground - min(b[1] for b in bbs)) * k)) + 6)  # taller canvas for airborne frames
    out = []
    for c, b in zip(cells, bbs):
        cx = wheel_x(c)
        sc = c.resize((round(512 * k), round(512 * k)), Image.LANCZOS)
        f = Image.new("RGBA", (PACK_FW, FH), (0, 0, 0, 0))
        # rear wheel on the frame's centre line and the shared ground line; airborne frames keep their lift
        f.alpha_composite(sc, (round(PACK_FW / 2 - cx * k), round(FH - 2 - ground * k)))
        out.append(f)
    return out

def save_strip(fr, name):
    fw = fr[0].width
    strip = Image.new("RGBA", (fw * len(fr), fr[0].height), (0, 0, 0, 0))
    for i, f in enumerate(fr): strip.alpha_composite(f, (i * fw, 0))
    save(strip, f"{MO}/{name}.webp", 88)

# jump: frame 4 (legs splayed) left out on purpose
save_strip(pack_frames("p07-jump.png", [0, 1, 2, 4, 5]), "jump")      # prep 0-1, air 2, land 3-4
save_strip(pack_frames("p08-boost.png", range(6)), "boost")
save_strip(pack_frames("p09-pickup.png", range(6)), "pickup")
# bump: frame 3 (over-stretched leg) left out; the toy block / motion marks drawn beside Mo are removed
save_strip(pack_frames("p11-wobble.png", [0, 1, 3, 4, 5], clean_props=True), "wobble")

# celebration (front view, for the Delivered screen)
cel = clean(Image.open(f"{SRC}/p15-celebrate.png"))
cc = [cel.crop(((i % 3) * 512, (i // 3) * 512, (i % 3 + 1) * 512, (i // 3 + 1) * 512)) for i in range(6)]
cbs = [bbox(c) for c in cc]
cb = (min(b[0] for b in cbs) - 6, min(b[1] for b in cbs) - 6, max(b[2] for b in cbs) + 6, max(b[3] for b in cbs) + 2)
cf = [fit_h(c.crop(cb), 480) for c in cc]
st = Image.new("RGBA", (cf[0].width * 6, cf[0].height), (0, 0, 0, 0))
for i, f in enumerate(cf): st.alpha_composite(f, (i * cf[0].width, 0))
save(st, f"{MO}/celebrate.webp", 88)

# obstacles → game sprites (replace the drawn placeholders)
ART = "public/rush/art"; os.makedirs(ART, exist_ok=True)
import json
ob = clean(Image.open(f"{SRC}/p29-obstacles.png"))
atlas_p = os.path.join(ART, "atlas.json")
atlas = json.load(open(atlas_p)) if os.path.exists(atlas_p) else {}
for i, name in enumerate(["log", "boxes", "blocks", "puddle", "ramp", "boost"]):
    c = ob.crop(((i % 3) * 512, (i // 3) * 512, (i % 3 + 1) * 512, (i // 3 + 1) * 512))
    c = c.crop(bbox(c, 60))
    if max(c.size) > 420: c = c.resize((round(c.width * 420 / max(c.size)), round(c.height * 420 / max(c.size))), Image.LANCZOS)
    save(c, f"{ART}/{name}.webp")
    atlas[name] = {"w": c.width, "h": c.height, "frames": 1}
json.dump(atlas, open(atlas_p, "w"), indent=1, sort_keys=True)

# ---------------------------------------------------------------- opponents, Mo + Ais moments, packages
def cells_of(src):
    im = clean(Image.open(f"{SRC}/{src}"))
    return [im.crop(((i % 3) * 512, (i // 3) * 512, (i % 3 + 1) * 512, (i // 3 + 1) * 512)) for i in range(6)]

def rider_strip(src, name, height):
    """a rear riding sheet framed exactly like Mo's: one crop box for all six frames"""
    cs = cells_of(src)
    bs = [bbox(c) for c in cs]
    b = (min(x[0] for x in bs) - 4, min(x[1] for x in bs) - 4, max(x[2] for x in bs) + 4, max(x[3] for x in bs) + 2)
    fr = [fit_h(c.crop(b), height) for c in cs]
    st = Image.new("RGBA", (fr[0].width * 6, fr[0].height), (0, 0, 0, 0))
    for i, f in enumerate(fr): st.alpha_composite(f, (i * f.width, 0))
    save(st, f"{MO}/{name}.webp", 88)

# twins are the same height; Kak Adam a little taller (family height rule)
rider_strip("p39-ais-ride.png", "ais-ride", 420)
rider_strip("p41-adam-ride.png", "adam-ride", 462)

def stills(src, names, h=600, haze=16):
    for c, n in zip(cells_of(src), names):
        if not n: continue
        if haze > 16:  # some sheets carry a faint backdrop haze: drop the weak alpha
            arr = np.array(c); arr[arr[..., 3] < haze] = 0; c = Image.fromarray(arr)
        save(fit_h(c.crop(bbox(c, max(24, haze))), h), f"{MO}/{n}.webp")

stills("p38-ais-ref.png", ["ais-front", None, None, "ais-back", "ais-wave", "ais-bike"])
stills("p40-adam-ref.png", ["adam-front", "adam-cheer", None, "adam-back", "adam-wave", "adam-cool"], 660, haze=90)
stills("p42-mo-ais-moments.png", ["pair-gifts", "pair-cheer", "pair-jump", "pair-highfive", "pair-smile", "pair-thumbs"])
# Mo + Ais riding toward the viewer: a short bouncy loop for the splash / home
cs = cells_of("p42b-mo-ais-riding-front.png")
bs = [bbox(c) for c in cs]
b = (min(x[0] for x in bs) - 4, min(x[1] for x in bs) - 4, max(x[2] for x in bs) + 4, max(x[3] for x in bs) + 2)
fr = [fit_h(c.crop(b), 480) for c in cs]
st = Image.new("RGBA", (fr[0].width * 6, fr[0].height), (0, 0, 0, 0))
for i, f in enumerate(fr): st.alpha_composite(f, (i * f.width, 0))
save(st, f"{MO}/pair-ride.webp", 88)

# packages: the storybook bundle and the gift replace the placeholders in the game
pk = cells_of("p19-packages.png")
atlas = json.load(open(atlas_p)) if os.path.exists(atlas_p) else {}
for c, name in zip(pk, ["books", "gift", "pkg-box", "pkg-letter", "pkg-basket", "carrot-bag"]):
    c = c.crop(bbox(c, 60))
    if max(c.size) > 360: c = c.resize((round(c.width * 360 / max(c.size)), round(c.height * 360 / max(c.size))), Image.LANCZOS)
    save(c, f"{ART}/{name}.webp")
    atlas[name] = {"w": c.width, "h": c.height, "frames": 1}
json.dump(atlas, open(atlas_p, "w"), indent=1, sort_keys=True)

# ---------------------------------------------------------------- Kak Adam's bike: green frame → sky blue
ad = Image.open(f"{MO}/adam-ride.webp").convert("RGBA")
hsv = np.array(ad.convert("RGB").convert("HSV")).astype(np.float32)
al = np.array(ad.getchannel("A"))
h, s_, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
grn = (h > 50) & (h < 115) & (s_ > 70) & (al > 0)
hsv[..., 0] = np.where(grn, 143, h)            # sky blue (PIL hue 0..255)
hsv[..., 1] = np.where(grn, np.clip(s_ * 0.85, 0, 255), s_)
hsv[..., 2] = np.where(grn, np.clip(v * 1.08, 0, 255), v)
rgb = Image.fromarray(hsv.astype(np.uint8), "HSV").convert("RGB"); rgb.putalpha(Image.fromarray(al))
save(rgb, f"{MO}/adam-ride.webp", 88)

# ---------------------------------------------------------------- clocks, roadside, power-ups, packages, road scenes
def items(src, names, maxside=360, thr=60):
    out = {}
    for c, n in zip(cells_of(src), names):
        if not n: continue
        c = c.crop(bbox(c, thr))
        if max(c.size) > maxside: c = c.resize((round(c.width * maxside / max(c.size)), round(c.height * maxside / max(c.size))), Image.LANCZOS)
        save(c, f"{ART}/{n}.webp"); atlas[n] = {"w": c.width, "h": c.height, "frames": 1}; out[n] = c
    return out

atlas = json.load(open(atlas_p)) if os.path.exists(atlas_p) else {}
clk = items("p28-clocks.png", ["balloon-0", "balloon-1", "balloon-2", "pocketclock", "icon-calendar", "icon-hourglass"])
# where each balloon's clock face is (the game paints its own face + hands there, so the time is always right)
for n in ["balloon-0", "balloon-1", "balloon-2"]:
    c = clk[n]; a = np.array(c.convert("RGB")).astype(int); al2 = np.array(c.getchannel("A"))
    cream = (a.min(axis=2) > 215) & (al2 > 200)
    ys, xs = np.where(cream)
    cx, cy = np.median(xs), np.median(ys)
    r = (np.percentile(xs, 97) - np.percentile(xs, 3)) / 2
    atlas[n].update({"fx": round(cx / c.width, 3), "fy": round(cy / c.height, 3), "fr": round(r / c.width, 3)})
atlas["balloon-2"].update({"fx": 0.5, "fy": 0.43, "fr": 0.3})  # star frame confuses the cream-face finder
items("p24-roadside.png", ["bench", "busstop", "fruitcart", "signpost", "flowerarch", "fountain"])
items("p35-powerups.png", ["coin", "pw-clock", "wingshoe", "pw-shield", "magnet", "gift"])
items("p19b-packages.png", ["pkg-truckbox", "pkg-stargift", "pkg-airmail", "pkg-fruit", "pkg-lunch", "chest"])
json.dump(atlas, open(atlas_p, "w"), indent=1, sort_keys=True)

# road scenes (white background) → adventure cards
rs = Image.open(f"{SRC}/p26-road-scenes.png").convert("RGB")
for i, n in enumerate(["town", "morning", "park", "play", "sunset", "dream"]):
    c = rs.crop(((i % 3) * 512, (i // 3) * 512, (i % 3 + 1) * 512, (i // 3 + 1) * 512))
    g = np.array(c).min(axis=2) < 235
    ys, xs = np.where(g)
    c = c.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)).resize((420, 420), Image.LANCZOS)
    c.save(f"public/rush/kit/scene-{n}.webp", quality=84, method=6); print("scene", n)

# ---------------------------------------------------------------- UI kit (buttons + icons) and screen backgrounds
UI = "public/rush/ui"; os.makedirs(UI, exist_ok=True)
kitim = Image.open(f"{SRC}/ui-kit.png").convert("RGBA")
ka = np.array(kitim)[..., 3]
def cut(x0, x1, y0, y1):
    """element between x0..x1, refined to the emptiest column if the white outlines touch"""
    return kitim.crop((x0, y0, x1, y1))
def split(x0, x1, y0, y1, n):
    dens = (ka[y0:y1, x0:x1] > 150).sum(axis=0)
    xs = [x0]
    for k in range(1, n):
        lo, hi = int((k - 0.2) * (x1 - x0) / n), int((k + 0.2) * (x1 - x0) / n)
        xs.append(x0 + lo + int(np.argmin(dens[lo:hi])))
    return [(xs[i], (xs[i + 1] if i + 1 < n else x1)) for i in range(n)]
ROWS = [
    (51, 283, [((17, 397), ["btn-play"]), ((407, 595), ["btn-home"]), ((597, 784), ["btn-settings"]), ((785, 1152), ["btn-sound", "btn-music"]), ((1154, 1332), ["btn-info"]), ((1333, 1518), ["btn-back"])]),
    (307, 530, [((26, 248), ["ic-map"]), ((263, 480), ["ic-shop"]), ((485, 896), ["ic-bag", "ic-trophy"]), ((906, 1096), ["ic-calendar"]), ((1106, 1317), ["ic-gift"]), ((1319, 1517), ["ic-badge"])]),
    (758, 997, [((36, 495), ["ctl-left", "ctl-right"]), ((505, 739), ["ctl-jump"]), ((752, 998), ["ctl-star"]), ((1008, 1248), ["ctl-voice"]), ((1260, 1497), ["ctl-pause"])]),
]
for y0, y1, segs in ROWS:
    for (x0, x1), names in segs:
        for (a0, a1), n in zip(split(x0, x1, y0, y1, len(names)), names):
            c = kitim.crop((a0, y0, a1, y1)); c = c.crop(bbox(c, 40))
            c = c.resize((round(c.width * 200 / c.height), 200), Image.LANCZOS) if c.height > 200 else c
            save(c, f"{UI}/{n}.webp")
for n in ["home", "street", "park", "market"]:
    b = Image.open(f"{SRC}/bg-{n}.png").convert("RGB")
    b = b.resize((1600, round(b.height * 1600 / b.width)), Image.LANCZOS)
    b.save(f"public/rush/bg-{n}.webp", quality=82, method=6); print("bg", n, b.size)

# ---------------------------------------------------------------- buildings, screen backgrounds, horizon layers
atlas = json.load(open(atlas_p)) if os.path.exists(atlas_p) else {}
bl = items("p22-buildings.png", ["library", "tower", "bakery", "shop", "house", "house2"], maxside=420)
# the tower's printed face has tick marks and no hands: find it so the game paints the live time there
c = bl["tower"]; a = np.array(c.convert("RGB")).astype(int); al2 = np.array(c.getchannel("A"))
cream = (a.min(axis=2) > 200) & (al2 > 200)
cream[: int(c.height * 0.12)] = False; cream[int(c.height * 0.5):] = False
ys, xs = np.where(cream)
atlas["tower"].update({"fx": round(float(np.median(xs)) / c.width, 3), "fy": round(float(np.median(ys)) / c.height, 3), "fr": round(float(np.percentile(xs, 97) - np.percentile(xs, 3)) / 2 / c.width, 3)})
atlas["tower"].update({"fx": 0.5, "fy": 0.452, "fr": 0.2})  # measured by eye; the finder catches the cream wall
json.dump(atlas, open(atlas_p, "w"), indent=1, sort_keys=True)

for n in ["home2", "splash", "mission", "delivered", "rewards", "garage", "collection", "parents"]:
    b = Image.open(f"{SRC}/bg-{n}.png").convert("RGB")
    w = 1100 if n == "splash" else 1600
    b = b.resize((w, round(b.height * w / b.width)), Image.LANCZOS)
    b.save(f"public/rush/bg-{n}.webp", quality=82, method=6); print("bg", n, b.size)

def horizon(src, out):
    im = Image.open(f"{SRC}/{src}").convert("RGBA")
    a = np.array(im).astype(np.int32)
    if (a[..., 3] < 250).mean() < 0.05:
        # no real transparency (white / fake checker sky): clear everything above the scenery in each column
        rgb = a[..., :3]
        mx, mn = rgb.max(axis=2), rgb.min(axis=2)
        colourful = ((mx - mn) > 38) | (mx < 205)
        top = np.argmax(colourful, axis=0)
        rows = np.arange(a.shape[0])[:, None]
        alpha = np.clip((rows - top[None, :] + 2) * 85, 0, 255)  # 3-px soft edge
        a[..., 3] = np.minimum(a[..., 3], alpha)
    else:
        a[a[..., 3] < 140, 3] = 0  # drop the yellow glow fringe around the hills
    im = Image.fromarray(a.astype(np.uint8)).crop(Image.fromarray(a[..., 3].astype(np.uint8)).getbbox())
    im = im.resize((2000, round(im.height * 2000 / im.width)), Image.LANCZOS)
    save(im, f"public/rush/{out}.webp", 86)

horizon("far-morning.png", "far-morning")
horizon("far-park.png", "far-park")
horizon("far-seaside.png", "far-seaside")
