import { ImageResponse } from 'next/og';

export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1D9E75 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 20, color: '#A7F3D0', textAlign: 'center', marginBottom: 16, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          PassVerse Blog
        </div>
        <div style={{ fontSize: 52, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 24, lineHeight: 1.15 }}>
          JAMB &amp; WAEC Study Tips
        </div>
        <div style={{ fontSize: 24, color: '#A7F3D0', textAlign: 'center', maxWidth: 800 }}>
          Past question guides and exam strategies for Nigerian students
        </div>
      </div>
    ),
    { ...size },
  );
}
