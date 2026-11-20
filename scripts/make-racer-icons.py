#!/usr/bin/env python3
"""Time Racers icons: Baby Mo (render 1) over a checkered racing stripe on a sunny sky.
Usage: python3 scripts/make-racer-icons.py [babymo-app path]"""
import os, sys
from PIL import Image, ImageDraw, ImageFilter
APP = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', '..', 'babymo-app')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'icons')
S = 1024
im = Image.new('RGBA', (S, S))
d = ImageDraw.Draw(im)
top, bot = (255, 214, 92), (255, 138, 42)
for y in range(S):
    k = y / S
    d.line([0, y, S, y], fill=tuple(int(top[i] + (bot[i] - top[i]) * k) for i in range(3)) + (255,))
# checkered band
band = Image.new('RGBA', (S, S), (0, 0, 0, 0))
bd = ImageDraw.Draw(band)
sq = 64
for x in range(0, S + sq, sq):
    for r in range(2):
        if (x // sq + r) % 2 == 0:
            bd.rectangle([x, 760 + r * sq, x + sq, 760 + (r + 1) * sq], fill=(38, 49, 58, 255))
        else:
            bd.rectangle([x, 760 + r * sq, x + sq, 760 + (r + 1) * sq], fill=(255, 255, 255, 255))
band = band.rotate(-8, resample=Image.BICUBIC, center=(S / 2, 820))
im.alpha_composite(band)
# speed streaks
st = Image.new('RGBA', (S, S), (0, 0, 0, 0))
sd = ImageDraw.Draw(st)
for i, y in enumerate([240, 330, 420, 520]):
    sd.rounded_rectangle([40 + i * 30, y, 380 + i * 20, y + 26], radius=13, fill=(255, 255, 255, 150))
im.alpha_composite(st)
mo = Image.open(os.path.join(APP, 'www', 'baby-mo-poses', 'baby-mo-yeyy.png')).convert('RGBA')
mo = mo.crop(mo.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox())
h = int(S * 0.86)
mo = mo.resize((int(mo.width * h / mo.height), h), Image.LANCZOS)
sh = Image.new('RGBA', (S, S), (0, 0, 0, 0))
ImageDraw.Draw(sh).ellipse([330, 900, 830, 990], fill=(60, 30, 0, 120))
im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(20)))
im.alpha_composite(mo, ((S - mo.width) // 2 + 70, S - h + 30))
m = Image.new('L', (S, S), 0)
ImageDraw.Draw(m).rounded_rectangle([0, 0, S, S], radius=int(S * 0.22), fill=255)
r = Image.new('RGBA', (S, S), (0, 0, 0, 0)); r.paste(im, (0, 0), m)
os.makedirs(OUT, exist_ok=True)
r.resize((512, 512), Image.LANCZOS).save(os.path.join(OUT, 'racers-512.png'), optimize=True)
r.resize((192, 192), Image.LANCZOS).save(os.path.join(OUT, 'racers-192.png'), optimize=True)
im.convert('RGB').resize((180, 180), Image.LANCZOS).save(os.path.join(OUT, 'racers-180.png'), optimize=True)
print('ok')
