import Link from "next/link";
import WalletButton from "./wallet-button";

export default function SiteHeader() {
  return <header className="topbar"><Link className="wordmark" href="/">LOCALIZE<span>OS</span></Link><nav><Link href="/queue">Queue</Link><Link href="/policy">Policy</Link><Link href="/cases">Cases</Link><Link href="/releases">Releases</Link></nav><WalletButton /></header>;
}
