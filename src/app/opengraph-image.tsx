import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const alt = "Sussed";
const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const font = await readFile(
    join(process.cwd(), "assets/Inter_24pt-SemiBold.ttf")
  );

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
          }}
        >
          Sussed.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
