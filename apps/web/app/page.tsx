import Link from "next/link";

const nav = ["Queue", "Policy", "Cases", "Releases"];
export default function Home() {
  return <main className="shell">
    <header className="topbar"><Link className="wordmark" href="/">LOCALIZE<span>OS</span></Link><nav>{nav.map((item) => <Link href={`/${item.toLowerCase()}`} key={item}>{item}</Link>)}</nav><button className="wallet">Connect wallet</button></header>
    <section className="workspace"><div className="eyebrow">ENGLISH / FRENCH · PROJECT WORKSPACE</div><div className="title-row"><div><h1>Translation desk</h1><p className="lede">Resolve the strings that need a second set of eyes.</p></div><div className="chain-status"><i /> StudioNet <small>chain 61999</small></div></div>
      <div className="editor"><section className="pane"><div className="pane-head"><span>Source · English</span><code>settings.delete_workspace</code></div><h2>Delete workspace</h2><p className="context">Destructive action in workspace settings. The user will lose access to all projects and cannot undo this action.</p><div className="tokens">No placeholders detected</div></section><section className="pane target"><div className="pane-head"><span>Target · French</span><span className="draft">Draft · off-chain</span></div><textarea aria-label="French translation" defaultValue="Supprimer l’espace de travail" /><div className="editor-actions"><button className="quiet">Save draft</button><Link className="primary" href="/strings/settings.delete_workspace">Escalate for review →</Link></div></section><aside className="memory"><div className="pane-head"><span>Related records</span><span className="count">0</span></div><div className="empty"><strong>No eligible semantic memory</strong><p>Approved records from this project and locale will appear here after the first resolution.</p></div></aside></div>
    </section><footer className="rail"><span>Live contract state</span><span className="rail-note">Connect a wallet to submit a case · Reads remain public</span></footer>
  </main>;
}
