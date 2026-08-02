# -*- coding: utf-8 -*-
"""拼接参考图工具：场景图(大) + 角色图(小) 拼成 2x2 参考图
用法: python compose_ref.py <scene> <char1,char2,...> <output>
"""
import sys
from PIL import Image

def main():
    if len(sys.argv) < 4:
        print('用法: compose_ref.py <scene> <char1,char2,...> <output>')
        sys.exit(1)
    scene_file = sys.argv[1]
    char_list = [c for c in sys.argv[2].split(',') if c] if sys.argv[2] else []
    output = sys.argv[3]

    # 画布 1024x768，场景占左上 768x576，角色竖排右 256 宽
    scene = Image.open(scene_file).convert('RGB').resize((768, 576))
    canvas = Image.new('RGB', (1024, 768), (0, 0, 0))
    canvas.paste(scene, (0, 0))

    cw, ch = 256, 192
    for i, cf in enumerate(char_list):
        if i >= 2:
            break
        im = Image.open(cf).convert('RGB').resize((cw, ch))
        canvas.paste(im, (768, i * ch))

    canvas.save(output, 'PNG')
    print(f'composed: {output}')

if __name__ == '__main__':
    main()
