import PostLoginLayout from "../components/Layouts/PostLoginLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VTrack Reports",
  description: "Reports",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostLoginLayout>{children}</PostLoginLayout>;
}
