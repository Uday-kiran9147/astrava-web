import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Astrava — Student Utility Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#2D5BFF',
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            marginBottom: '40px',
            boxShadow: '0 20px 40px rgba(45, 91, 255, 0.2)',
          }}
        >
          <span style={{ fontSize: '72px', color: 'white', fontWeight: 'bold' }}>A</span>
        </div>
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#0f172a',
            marginBottom: '20px',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Astrava
        </h1>
        <p
          style={{
            fontSize: '36px',
            color: '#475569',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          High-precision academic calculators and study utilities engineered for students.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
