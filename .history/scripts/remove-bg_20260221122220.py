#!/usr/bin/env python3
"""Remove background from mockup image, preserving the display stand and its colors.
Requires: pip install rembg pillow onnxruntime
Usage: python3 scripts/remove-bg.py [input_path]
"""

from rembg import remove
from PIL import Image
import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

DEFAULTS = [
    os.path.join(PROJECT_ROOT, "public/project/Reijin/mockup-1.jpg"),
]

OUTPUT = os.path.join(PROJECT_ROOT, "public/project/Reijin/mockup-display-clean.png")

def main():
    if len(sys.argv) > 1:
        input_path = os.path.abspath(sys.argv[1])
    else:
        input_path = next((p for p in DEFAULTS if os.path.exists(p)), None)

    if not input_path or not os.path.exists(input_path):
        print("Usage: python3 scripts/remove-bg.py <path-to-image>")
        return 1
    print(f"Input: {input_path}")
    img = Image.open(input_path).convert("RGBA")
    print("Removing background...")
    out = remove(img)
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    out.save(OUTPUT)
    print(f"Saved: {OUTPUT}")
    return 0

if __name__ == "__main__":
    exit(main())
