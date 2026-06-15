import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Get Your Free AI Operator Roadmap — Legacy Labs Inner Circle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" } }
  ).then((r) => r.text());

  const match = css.match(/src: url\((.+?)\) format\('woff2'\)/);
  if (!match) throw new Error(`Font URL not found for ${family}:${weight}`);
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const [soraBold, soraRegular] = await Promise.all([
    loadFont("Sora", 700).catch(() => null),
    loadFont("Sora", 400).catch(() => null),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 700 }[] = [];
  if (soraBold) fonts.push({ name: "Sora", data: soraBold, weight: 700 });
  if (soraRegular) fonts.push({ name: "Sora", data: soraRegular, weight: 400 });

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#070A0F",
          fontFamily: fonts.length ? "Sora" : "system-ui",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial blue glow — top center */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 500,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(45,107,255,0.22) 0%, rgba(45,107,255,0.05) 50%, transparent 75%)",
            pointerEvents: "none",
          }}
        />

        {/* Subtle grid lines — horizontal */}
        {[160, 315, 470].map((top) => (
          <div
            key={top}
            style={{
              position: "absolute",
              top,
              left: 0,
              right: 0,
              height: 1,
              background: "rgba(45,107,255,0.07)",
            }}
          />
        ))}

        {/* Subtle grid lines — vertical */}
        {[240, 480, 720, 960].map((left) => (
          <div
            key={left}
            style={{
              position: "absolute",
              left,
              top: 0,
              bottom: 0,
              width: 1,
              background: "rgba(45,107,255,0.07)",
            }}
          />
        ))}

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 96px",
            gap: 0,
            zIndex: 1,
          }}
        >
          {/* Eyebrow badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
            }}
          >
            {/* Pulse dot */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#3EC9F5",
                boxShadow: "0 0 12px rgba(62,201,245,0.8)",
              }}
            />
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#3EC9F5",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Free · Takes 60 Seconds
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontSize: 86,
                fontWeight: 700,
                color: "#E8F1FF",
                lineHeight: 1.05,
                textAlign: "center",
                letterSpacing: "-0.02em",
              }}
            >
              Get Your Custom
            </span>
            <span
              style={{
                fontSize: 86,
                fontWeight: 700,
                lineHeight: 1.05,
                textAlign: "center",
                letterSpacing: "-0.02em",
                background: "linear-gradient(90deg, #2D6BFF 0%, #3EC9F5 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              AI Operator Roadmap
            </span>
          </div>

          {/* Divider line */}
          <div
            style={{
              marginTop: 48,
              width: 480,
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(45,107,255,0.5) 50%, transparent 100%)",
            }}
          />

          {/* Brand */}
          <p
            style={{
              marginTop: 24,
              fontSize: 32,
              fontWeight: 400,
              color: "#7FA3D4",
              letterSpacing: "0.04em",
              textAlign: "center",
            }}
          >
            - Created by Ibrahim Ansari
          </p>
        </div>

        {/* Bottom corner accent — left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle at 0% 100%, rgba(45,107,255,0.12) 0%, transparent 60%)",
          }}
        />

        {/* Bottom corner accent — right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle at 100% 100%, rgba(62,201,245,0.08) 0%, transparent 60%)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
