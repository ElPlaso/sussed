import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Sussed";
const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${process.env.NEXT_PUBLIC_URL}/favicon.ico`}
          alt="Logo"
          width={300}
          height={300}
          style={{
            padding: 50,
            filter: "invert(1)",
          }}
        />
        <div
          style={{
            color: "white",
            fontSize: "8rem",
            fontFamily: "sans-serif",
            fontWeight: 800,
          }}
        >
          Sussed.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
