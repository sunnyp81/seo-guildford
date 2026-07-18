import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';

export const prerender = true;

const fontReg = fs.readFileSync('node_modules/@fontsource/fraunces/files/fraunces-latin-400-normal.woff');
const fontSemi = fs.readFileSync('node_modules/@fontsource/fraunces/files/fraunces-latin-600-normal.woff');

const el = (style: Record<string, unknown>, children: unknown) => ({
  type: 'div',
  props: { style, children },
});

export const GET: APIRoute = async () => {
  const tree = el(
    {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#F4EEE1',
      padding: '72px',
    },
    [
      el({ display: 'flex', flexDirection: 'column' }, [
        el({ display: 'flex', width: '84px', height: '3px', backgroundColor: '#8A2B1E', marginBottom: '30px' }, []),
        el({ display: 'flex', fontSize: '26px', letterSpacing: '7px', color: '#8A2B1E', fontWeight: 600 }, 'SEO GUILDFORD'),
      ]),
      el(
        { display: 'flex', fontSize: '68px', lineHeight: 1.05, color: '#26201A', fontWeight: 600, maxWidth: '1010px' },
        'Technical SEO, semantic content, and AI search for Surrey businesses.'
      ),
      el(
        { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid #26201A', paddingTop: '28px' },
        [
          el({ display: 'flex', fontSize: '32px', color: '#26201A', fontWeight: 600 }, 'seo-guildford.uk'),
          el({ display: 'flex', fontSize: '26px', color: '#6B6055', fontWeight: 400 }, 'Guildford, Surrey'),
        ]
      ),
    ]
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Fraunces', data: fontReg, weight: 400, style: 'normal' },
      { name: 'Fraunces', data: fontSemi, weight: 600, style: 'normal' },
    ],
  });

  const png = new Resvg(svg).render().asPng();
  return new Response(png as unknown as BodyInit, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
