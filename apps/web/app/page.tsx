import Link from "next/link";
import WalletButton from "../components/wallet-button";
import LiveWorkspace from "../components/live-workspace";

const nav = ["Queue", "Policy", "Cases", "Releases"];
export default function Home() {
  return <main className="shell">
    <header className="topbar"><Link className="wordmark" href="/">LOCALIZE<span>OS</span></Link><nav>{nav.map((item) => <Link href={`/${item.toLowerCase()}`} key={item}>{item}</Link>)}</nav><WalletButton /></header>
    <section className="workspace"><div className="eyebrow">ENGLISH / FRENCH · PROJECT WORKSPACE</div><div className="title-row"><div><h1>Translation desk</h1><p className="lede">Resolve the strings that need a second set of eyes.</p></div><div className="chain-status"><i /> StudioNet <small>chain 61999</small></div></div>
      <LiveWorkspace />
    </section><footer className="rail"><span>Live contract state</span><span className="rail-note">Connect a wallet to submit a case · Reads remain public</span></footer>
  </main>;
}
