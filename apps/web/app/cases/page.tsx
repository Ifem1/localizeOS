import SiteHeader from "../../components/site-header";

export default function Cases() {
  return <main className="shell"><SiteHeader /><section className="workspace"><div className="eyebrow">DISAGREEMENT DESK · CONSENSUS</div><h1>No open cases.</h1><p className="lede">Consensus decisions, abstentions and receipts are read directly from the contract.</p><div className="empty-state"><strong>Live state unavailable</strong><p>Configure NEXT_PUBLIC_LOCALIZEOS_CONTRACT to inspect authoritative case state.</p></div></section></main>;
}
