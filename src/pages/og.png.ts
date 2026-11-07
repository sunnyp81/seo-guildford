import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';

export const prerender = true;

const fontReg = fs.readFileSync('node_modules/@fontsource/merriweather/files/merriweather-latin-400-normal.woff');
const fontSemi = fs.readFileSync('node_modules/@fontsource/merriweather/files/merriweather-latin-700-normal.woff');

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
      backgroundColor: '#EDF1F5',
      borderTop: '18px solid #0F5257',
      padding: '72px',
    },
    [
      el({ display: 'flex', flexDirection: 'column' }, [
        el({ display: 'flex', width: '80px', height: '3px', backgroundColor: '#B83817', marginBottom: '30px' }, []),
        el({ display: 'flex', fontSize: '26px', letterSpacing: '4px', color: '#B83817', fontWeight: 700 }, 'SEO GUILDFORD'),
      ]),
      el(
        { display: 'flex', fontSize: '70px', lineHeight: 1.02, color: '#17212B', fontWeight: 700, maxWidth: '1010px', letterSpacing: '-1px' },
        'SEO for Guildford businesses that need qualified enquiries.'
      ),
      el(
        { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid #CBD5DF', paddingTop: '28px' },
        [
          el({ display: 'flex', fontSize: '30px', color: '#0F5257', fontWeight: 700 }, 'seo-guildford.uk'),
          el({ display: 'flex', fontSize: '25px', color: '#4F5B67', fontWeight: 400 }, 'Solo SEO consultant, Guildford and Surrey'),
        ]
      ),
    ]
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Merriweather', data: fontReg, weight: 400, style: 'normal' },
      { name: 'Merriweather', data: fontSemi, weight: 700, style: 'normal' },
    ],
  });

  const png = new Resvg(svg).render().asPng();
  return new Response(png as unknown as BodyInit, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
