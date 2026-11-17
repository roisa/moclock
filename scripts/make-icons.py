#!/usr/bin/env python3
"""App icons for Time Adventure: Baby Mo (render 1, 800px source) in front of a
clay clock on the Baby Mo green. Usage: python3 scripts/make-icons.py [babymo-app path]"""
import math, os, sys
from PIL import Image, ImageDraw, ImageFilter

APP = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', '..', 'babymo-app')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'icons')
S = 1024

def clock(size):
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    c = size / 2
    d.ellipse([0, 0, size, size], fill=(255, 154, 61, 255))
    d.ellipse([size*0.06, size*0.06, size*0.94, size*0.94], fill=(255, 248, 236, 255))
    for i in range(12):
        a = math.radians(i * 30)
        r1, r2 = size*0.36, size*0.42
        w = int(size*0.03) if i % 3 == 0 else int(size*0.018)
        d.line([c + math.sin(a)*r1, c - math.cos(a)*r1, c + math.sin(a)*r2, c - math.cos(a)*r2], fill=(140, 125, 92, 255), width=w)
    # hands: 10:10-ish happy face (hour orange, minute blue)
    def hand(angle, length, width, col):
        a = math.radians(angle)
        d.line([c, c, c + math.sin(a)*length, c - math.cos(a)*length], fill=col, width=width)
        d.ellipse([c + math.sin(a)*length - width/2, c - math.cos(a)*length - width/2, c + math.sin(a)*length + width/2, c - math.cos(a)*length + width/2], fill=col)
    hand(305, size*0.22, int(size*0.07), (255, 138, 42, 255))
    hand(60, size*0.33, int(size*0.05), (58, 142, 240, 255))
    d.ellipse([c - size*0.05, c - size*0.05, c + size*0.05, c + size*0.05], fill=(255, 210, 63, 255))
    return im

def base(maskable=False):
    im = Image.new('RGBA', (S, S))
    # vertical green gradient
    top, bot = (160, 222, 255), (72, 160, 236)
    for y in range(S):
        k = y / S
        ImageDraw.Draw(im).line([0, y, S, y], fill=tuple(int(top[i] + (bot[i]-top[i])*k) for i in range(3)) + (255,))
    # soft light blob
    glow = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([-200, -260, 700, 520], fill=(255, 255, 255, 60))
    im.alpha_composite(glow.filter(ImageFilter.GaussianBlur(80)))
    pad = 0.12 if maskable else 0.0
    cs = int(S * (0.62 - pad*0.6))
    ck = clock(cs)
    sh = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    ox, oy = int(S*(0.36 + pad*0.2)), int(S*(0.08 + pad*0.5))
    ImageDraw.Draw(sh).ellipse([ox+10, oy+30, ox+cs+10, oy+cs+30], fill=(0, 50, 20, 90))
    im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(24)))
    im.alpha_composite(ck, (ox, oy))
    mo = Image.open(os.path.join(APP, 'www', 'baby-mo-poses', 'baby-mo-pose-08.png')).convert('RGBA')
    bb = mo.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox()
    mo = mo.crop(bb)
    target_h = int(S * (0.86 - pad))
    mo = mo.resize((int(mo.width * target_h / mo.height), target_h), Image.LANCZOS)
    msh = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    mx, my = int(S*(0.02 + pad*0.6)), S - target_h - int(S*(0.0 + pad*0.5)) + int(S*0.06)
    ImageDraw.Draw(msh).ellipse([mx + 40, S - 90 - int(S*pad*0.5), mx + mo.width - 40, S - 10 - int(S*pad*0.5)], fill=(0, 40, 10, 110))
    im.alpha_composite(msh.filter(ImageFilter.GaussianBlur(18)))
    im.alpha_composite(mo, (mx, my))
    return im

def rounded(im, r=0.22):
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, im.width, im.height], radius=int(im.width*r), fill=255)
    out = Image.new('RGBA', im.size, (0, 0, 0, 0))
    out.paste(im, (0, 0), m)
    return out

os.makedirs(OUT, exist_ok=True)
full = base()
full.convert('RGB').resize((180, 180), Image.LANCZOS).save(os.path.join(OUT, 'apple-touch-icon.png'))
r = rounded(full)
r.resize((512, 512), Image.LANCZOS).save(os.path.join(OUT, 'icon-512.png'), optimize=True)
r.resize((192, 192), Image.LANCZOS).save(os.path.join(OUT, 'icon-192.png'), optimize=True)
base(True).convert('RGB').resize((512, 512), Image.LANCZOS).save(os.path.join(OUT, 'maskable-512.png'), optimize=True)
full.convert('RGB').resize((1024, 1024), Image.LANCZOS).save(os.path.join(OUT, 'icon-1024.png'), optimize=True)
print('icons written to', OUT)
