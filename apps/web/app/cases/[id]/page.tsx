import SiteHeader from "../../../components/site-header";
import { CaseRecordView } from "../../../components/live-records";

export default async function CaseDetail({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const caseId = Number(id); return <main className="shell"><SiteHeader /><section className="workspace"><div className="eyebrow">CASE {id} · DISAGREEMENT DESK</div><h1>Resolution desk</h1><p className="lede">Candidates, policy evidence, and related records are read from the deployed contract.</p><CaseRecordView id={Number.isInteger(caseId) && caseId > 0 ? caseId : 0} /></section></main>; }
