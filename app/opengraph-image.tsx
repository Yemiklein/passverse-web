import { ImageResponse } from 'next/og';

export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 20, lineHeight: 1.1 }}>
          PassVerse
        </div>
        <div style={{ fontSize: 28, color: '#93C5FD', textAlign: 'center', maxWidth: 800, marginBottom: 20 }}>
          Nigeria&apos;s #1 JAMB, WAEC &amp; Post-UTME Exam Prep App
        </div>
        <div style={{ fontSize: 20, color: '#60A5FA', textAlign: 'center' }}>
          26,000+ Past Questions · AI Explanations · Score Prediction
        </div>
      </div>
    ),
    { ...size },
  );
}
