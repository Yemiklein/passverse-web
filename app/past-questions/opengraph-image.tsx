import { ImageResponse } from 'next/og';

export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #4169E1 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 20, color: '#BFDBFE', textAlign: 'center', marginBottom: 16, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          PassVerse
        </div>
        <div style={{ fontSize: 56, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 20, lineHeight: 1.1 }}>
          Past Questions
        </div>
        <div style={{ fontSize: 26, color: '#BFDBFE', textAlign: 'center', maxWidth: 800, marginBottom: 20 }}>
          JAMB, WAEC, GCE, NECO &amp; Post-UTME with answers
        </div>
        <div style={{ fontSize: 20, color: '#93C5FD', textAlign: 'center' }}>
          26,000+ questions · 2001 – 2025 · Free on PassVerse
        </div>
      </div>
    ),
    { ...size },
  );
}
