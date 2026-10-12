import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#1A0407', // Deep Maroon background
          color: '#D4AF37',      // Dust Gold text
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          fontWeight: 600,
          borderRadius: '6px',
        }}
      >
        HB
      </div>
    ),
    { ...size }
  );
}
