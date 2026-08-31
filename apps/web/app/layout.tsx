import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = { title: "LocalizeOS — translation memory", description: "Consensus translation memory and release sealing" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
