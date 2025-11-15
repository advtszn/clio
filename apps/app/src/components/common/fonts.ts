import localFont from "next/font/local";

export const seasonSans = localFont({
  src: [
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/SeasonSans-TRIAL-HeavyItalic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-season-sans",
  display: "swap",
});
