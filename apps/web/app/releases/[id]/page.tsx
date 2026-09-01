import SiteHeader from "../../../components/site-header";
import { ReleaseRecordView } from "../../../components/live-records";

export default async function ReleaseDetail({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const releaseId = Number(id); return <main className="shell"><SiteHeader /><section className="workspace"><div className="eyebrow">RELEASE {id} · PRESS PROOF</div><h1>Locale release receipt</h1><p className="lede">This receipt is authoritative only after finalized GenVM execution and a fresh contract read.</p><ReleaseRecordView id={Number.isInteger(releaseId) && releaseId > 0 ? releaseId : 0} /></section></main>; }
