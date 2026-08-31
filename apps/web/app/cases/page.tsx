import Link from "next/link";

export default function Cases() {
  return <main className="shell"><header className="topbar"><Link className="wordmark" href="/">LOCALIZE<span>OS</span></Link><nav><Link href="/queue">Queue</Link><Link href="/policy">Policy</Link><Link href="/cases">Cases</Link><Link href="/releases">Releases</Link></nav><button className="wallet">Connect wallet</button></header><section className="workspace"><div className="eyebrow">DISAGREEMENT DESK · CONSENSUS</div><h1>No open cases.</h1><p className="lede">Consensus decisions, abstentions and receipts are read directly from the contract.</p><div className="empty-state"><strong>Live state unavailable</strong><p>Configure NEXT_PUBLIC_LOCALIZEOS_CONTRACT to inspect authoritative case state.</p></div></section></main>;
}
