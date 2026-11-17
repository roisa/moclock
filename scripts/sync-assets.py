#!/usr/bin/env python3
"""Copy the Baby Mo character art this game uses from a babymo-app checkout
into public/characters/, and write src/characters/asset-meta.json with the
measured bounding box of every image (so the game can scale characters by
their real height and keep Mo, Ais, Adam, Abi and Umi in proportion).

Usage:  python3 scripts/sync-assets.py [path/to/babymo-app]   (default ../babymo-app)
Needs Pillow (pip install pillow). Re-run after adding a pose to POSES below.

Art rules (babymo-app/CLAUDE.md):
  * render 1 (www/baby-mo-poses) first, best quality available: the 800px PNG
    is converted to an 800px WebP for large display; the 480 WebP is kept for small.
  * render 2 (www/baby-mo-render2) is shown upper-body only (the game crops it).
  * never the removed Kata Baik cut-outs.
"""
import json, os, sys, shutil
from PIL import Image

APP = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', '..', 'babymo-app'))
WWW = os.path.join(APP, 'www')
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'public', 'characters')
META = os.path.join(ROOT, 'src', 'characters', 'asset-meta.json')

# id -> (source path in www, series)
# series: r1 (render 1 Mo), r2 (render 2 Mo, upper body only), ais, adam, abi, umi, bust (head-and-shoulders art)
POSES = {
  # ---- Baby Mo, render 1 ----
  'mo-wave':        ('baby-mo-poses/baby-mo-pose-01', 'r1'),
  'mo-welcome':     ('baby-mo-poses/baby-mo-pose-41', 'r1'),
  'mo-point':       ('baby-mo-poses/baby-mo-pose-08', 'r1'),
  'mo-present':     ('baby-mo-poses/baby-mo-pose-15', 'r1'),
  'mo-lean':        ('baby-mo-poses/baby-mo-pose-34', 'r1'),
  'mo-think':       ('baby-mo-poses/baby-mo-pose-36', 'r1'),
  'mo-wonder':      ('baby-mo-poses/baby-mo-pose-03', 'r1'),
  'mo-idea':        ('baby-mo-poses/baby-mo-idea', 'r1'),
  'mo-yeyy':        ('baby-mo-poses/baby-mo-yeyy', 'r1'),
  'mo-yes':         ('baby-mo-poses/baby-mo-yes', 'r1'),
  'mo-wow':         ('baby-mo-poses/baby-mo-wow', 'r1'),
  'mo-jump':        ('baby-mo-poses/baby-mo-pose-02', 'r1'),
  'mo-giggle':      ('baby-mo-poses/baby-mo-pose-07', 'r1'),
  'mo-thumbs':      ('baby-mo-poses/baby-mo-pose-25', 'r1'),
  'mo-ok':          ('baby-mo-poses/baby-mo-ok', 'r1'),
  'mo-alright':     ('baby-mo-poses/baby-mo-alright', 'r1'),
  'mo-thanks':      ('baby-mo-poses/baby-mo-thank-you', 'r1'),
  'mo-surprised':   ('baby-mo-poses/baby-mo-pose-26', 'r1'),
  'mo-oh':          ('baby-mo-poses/baby-mo-pose-40', 'r1'),
  'mo-shrug':       ('baby-mo-poses/baby-mo-pose-33', 'r1'),
  'mo-sit':         ('baby-mo-poses/baby-mo-pose-12', 'r1'),
  'mo-sit-wave':    ('baby-mo-poses/baby-mo-pose-13', 'r1'),
  'mo-sit-relax':   ('baby-mo-poses/baby-mo-pose-18', 'r1'),
  'mo-sleep':       ('baby-mo-poses/baby-mo-pose-17', 'r1'),
  'mo-sleepy':      ('baby-mo-poses/baby-mo-pose-39', 'r1'),
  'mo-run':         ('baby-mo-poses/baby-mo-run', 'r1'),
  'mo-walk':        ('baby-mo-poses/baby-mo-pose-42', 'r1'),
  'mo-pj':          ('baby-mo-poses/baby-mo-pj-both', 'r1'),
  'mo-pj-top':      ('baby-mo-poses/baby-mo-pj-top', 'r1'),
  'mo-cheeks':      ('baby-mo-poses/baby-mo-pose-31', 'r1'),
  'mo-hand-up':     ('baby-mo-poses/baby-mo-pose-24', 'r1'),
  # ---- Baby Mo, render 2 (upper body only) ----
  'mo2-meal':       ('baby-mo-render2/mo2-dua-meal', 'r2'),
  'mo2-school':     ('baby-mo-render2/mo2-walk-backpack', 'r2'),
  'mo2-read':       ('baby-mo-render2/mo2-read-book', 'r2'),
  'mo2-checklist':  ('baby-mo-render2/mo2-checklist', 'r2'),
  'mo2-tie-shoe':   ('baby-mo-render2/mo2-tie-shoe', 'r2'),
  # ---- Baby Mo, other sets ----
  'mo-brush':       ('mo-brush/brush-lr', 'bust'),
  'mo-dinner':      ('word-art/mo-meal', 'bust'),
  'mo-pray':        ('mo-pray-assets/mo-qiyam', 'pray'),
  # ---- Baby Ais ----
  'ais-wave':       ('ais-garden/wave-hello', 'ais'),
  'ais-cheer':      ('ais-garden/cheer-fist', 'ais'),
  'ais-think':      ('ais-garden/think-question', 'ais'),
  'ais-surprised':  ('ais-garden/surprised', 'ais'),
  'ais-jump':       ('ais-garden/jump-joy', 'ais'),
  'ais-sleep':      ('ais-garden/sleep-pillow', 'ais'),
  'ais-wake':       ('ais-garden/wake-stretch', 'ais'),
  'ais-yawn':       ('ais-garden/yawn-stretch-1', 'ais'),
  'ais-snack':      ('ais-garden/eat-watermelon', 'ais'),
  'ais-gift':       ('ais-garden/gift-box', 'ais'),
  'ais-seed':       ('ais-garden/garden-seed-1', 'ais'),
  'ais-sprout':     ('ais-garden/garden-look-sprout', 'ais'),
  'ais-water':      ('ais-garden/garden-water-2', 'ais'),
  'ais-pick':       ('ais-garden/garden-pick-1', 'ais'),
  'ais-giggle':     ('ais-garden/giggle', 'ais'),
  'ais-sit-wave':   ('ais-garden/sit-wave', 'ais'),
  'ais-run':        ('ais-garden/run', 'ais'),
  'ais-arms-wide':  ('ais-garden/arms-wide-joy', 'ais'),
  # ---- Kak Adam ----
  'adam-wave':      ('adam-tennis-v2/wave-1', 'adam'),
  'adam-ball':      ('adam-tennis-v2/hold-ball', 'adam'),
  'adam-win':       ('adam-tennis-v2/win-fist-r', 'adam'),
  'adam-swing':     ('adam-tennis-v2/fh-one-3', 'adam'),
  'adam-cheer':     ('adam-tennis-v2/celebrate-3', 'adam'),
  # ---- Abi & Umi ----
  'abi-wave':       ('family/abi-wave', 'abi'),
  'umi-welcome':    ('family/umi-welcome', 'umi'),
}

# The pixel height a STANDING character has in each source frame is measured from
# a reference pose; sitting / lying poses reuse it so they keep the same scale.
REF_POSE = {'r1': 'mo-wave', 'r2': 'mo2-checklist', 'ais': 'ais-wave', 'adam': 'adam-wave'}
# Relative standing heights (twins equal; Adam a little taller; adults adult height).
HEIGHT = {'r1': 1.0, 'r2': 1.0, 'ais': 1.0, 'adam': 1.14, 'abi': 1.95, 'umi': 1.85, 'bust': 1.0, 'pray': 1.0}

def bbox(im):
    im = im.convert('RGBA')
    a = im.split()[-1].point(lambda v: 255 if v > 24 else 0)
    return list(a.getbbox() or (0, 0, im.width, im.height))

def main():
    if not os.path.isdir(WWW):
        sys.exit('babymo-app www not found at ' + WWW)
    os.makedirs(OUT, exist_ok=True)
    meta = {}
    for pid, (src, series) in POSES.items():
        webp = os.path.join(WWW, src + '.webp')
        png = os.path.join(WWW, src + '.png')
        im = Image.open(webp)
        dst = os.path.join(OUT, pid + '.webp')
        shutil.copyfile(webp, dst)
        entry = {'src': pid + '.webp', 'w': im.width, 'h': im.height, 'box': bbox(im), 'series': series, 'from': src}
        if series == 'r1' and os.path.exists(png):
            big = Image.open(png).convert('RGBA')
            big.save(os.path.join(OUT, pid + '-800.webp'), 'WEBP', quality=88, method=6)
            entry['src2x'] = pid + '-800.webp'
            entry['w2x'] = big.width
        meta[pid] = entry
    # standing reference heights per series
    refs = {}
    for series, pid in REF_POSE.items():
        b = meta[pid]['box']
        refs[series] = (b[3] - b[1]) / meta[pid]['h']
    # Ais's garden set comes in two framings (300 px and 360 px); the 360 frames
    # are measured from the standing watering pose.
    b = meta['ais-water']['box']; refs['ais360'] = (b[3] - b[1]) / meta['ais-water']['h']
    for pid, m in meta.items():
        s = m['series']
        b = m['box']
        own = (b[3] - b[1]) / m['h']
        # fraction of the frame a standing character of this series fills
        key = 'ais360' if s == 'ais' and m['h'] == 360 else s
        m['ref'] = round(refs.get(key, own), 4)
        m['rel'] = HEIGHT.get(s, 1.0)
    os.makedirs(os.path.dirname(META), exist_ok=True)
    with open(META, 'w') as f:
        json.dump(meta, f, indent=1, sort_keys=True)
    # fonts (Fredoka + Nunito, latin) from the shared font folder
    fdir = os.path.join(ROOT, 'src', 'assets', 'fonts'); os.makedirs(fdir, exist_ok=True)
    for name, file in [('fredoka.woff2', 'X7n64b87HvSqjb_WIi2yDCRwoQ_k7367_DWu89XgHPyh.woff2'),
                       ('nunito.woff2', 'XRXV3I6Li01BKofINeaBTMnFcQ.woff2')]:
        shutil.copyfile(os.path.join(WWW, 'fonts', file), os.path.join(fdir, name))
    print('synced', len(meta), 'images from', WWW)

if __name__ == '__main__':
    main()
