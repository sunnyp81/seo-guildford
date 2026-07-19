import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';

export const prerender = true;

const fontReg = fs.readFileSync('node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff');
const fontSemi = fs.readFileSync('node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff');

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
      backgroundColor: '#0A0B0E',
      backgroundImage: 'radial-gradient(60% 60% at 78% 8%, rgba(34,211,238,0.20), transparent 60%)',
      padding: '72px',
    },
    [
      el({ display: 'flex', flexDirection: 'column' }, [
        el({ display: 'flex', width: '80px', height: '3px', backgroundColor: '#22D3EE', marginBottom: '30px' }, []),
        el({ display: 'flex', fontSize: '26px', letterSpacing: '6px', color: '#22D3EE', fontWeight: 600 }, 'SEO GUILDFORD'),
      ]),
      el(
        { display: 'flex', fontSize: '70px', lineHeight: 1.02, color: '#E7E9ED', fontWeight: 600, maxWidth: '1010px', letterSpacing: '-2px' },
        'Rank, convert, and dominate Guildford search.'
      ),
      el(
        { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #23262E', paddingTop: '28px' },
        [
          el({ display: 'flex', fontSize: '30px', color: '#E7E9ED', fontWeight: 600 }, 'seo-guildford.uk'),
          el({ display: 'flex', fontSize: '25px', color: '#8A909C', fontWeight: 400 }, 'Technical SEO . Surrey'),
        ]
      ),
    ]
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Space Grotesk', data: fontReg, weight: 400, style: 'normal' },
      { name: 'Space Grotesk', data: fontSemi, weight: 600, style: 'normal' },
    ],
  });

  const png = new Resvg(svg).render().asPng();
  return new Response(png as unknown as BodyInit, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
