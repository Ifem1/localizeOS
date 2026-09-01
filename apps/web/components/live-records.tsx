"use client";
import { useEffect, useState } from "react";
import { listCases, previewMemory, readCase, readProject, readRelease, type CaseRecord, type ProjectRecord, type ReleaseRecord } from "../lib/genlayer/data-source";

function State({ message }: { message: string }) { return <div className="empty-state"><strong>{message}</strong><p>Only verified contract state is displayed.</p></div>; }

export function ProjectPolicy({ id }: { id: number }) {
  const [state, setState] = useState<{ loading: boolean; value?: ProjectRecord; message?: string }>({ loading: true });
  useEffect(() => { readProject(id).then((r) => setState(r.state === "ready" ? { loading: false, value: r.value } : { loading: false, message: r.message })); }, [id]);
  if (state.loading) return <State message="Loading project policy…" />;
  if (!state.value) return <State message={state.message ?? "Project unavailable."} />;
  return <div className="empty-state"><strong>{state.value.name}</strong><p>Owner {state.value.owner} · policy v{state.value.policy_version} · {state.value.case_count} cases</p></div>;
}

export function CaseRecordView({ id }: { id: number }) {
  const [record, setRecord] = useState<CaseRecord | null>(null); const [memory, setMemory] = useState<Array<Record<string, unknown>>>([]); const [message, setMessage] = useState("Loading case…");
  useEffect(() => { Promise.all([readCase(id), previewMemory(id)]).then(([c, m]) => { if (c.state === "ready") { setRecord(c.value); setMessage(""); } else setMessage(c.message); if (m.state === "ready") setMemory(m.value); }); }, [id]);
  if (!record) return <State message={message} />;
  return <div className="live-record"><p><strong>{record.string_key}</strong> · {record.locale} · {record.status}</p><p>Project {record.project_id} · policy v{record.policy_version} · approved candidate index {record.approved_index}</p><p>Related approved memory: {memory.length}</p></div>;
}

export function ReleaseRecordView({ id }: { id: number }) {
  const [record, setRecord] = useState<ReleaseRecord | null>(null); const [message, setMessage] = useState("Loading release receipt…");
  useEffect(() => { readRelease(id).then((r) => r.state === "ready" ? (setRecord(r.value), setMessage("")) : setMessage(r.message)); }, [id]);
  if (!record) return <State message={message} />;
  return <div className="live-record"><p><strong>Release {id}</strong> · {record.locale} · policy v{record.policy_version}</p><p>Manifest digest {record.manifest_digest}</p><p>Commitment digest {record.commitment_digest}</p><pre>{record.commitment_json}</pre></div>;
}

export function CaseList({ projectId, locale }: { projectId: number; locale: string }) {
  const [message, setMessage] = useState("Loading cases…"); const [items, setItems] = useState<Record<string, CaseRecord>>({});
  useEffect(() => { listCases(projectId, locale).then((r) => r.state === "ready" ? (setItems(r.value), setMessage("")) : setMessage(r.message)); }, [projectId, locale]);
  if (message) return <State message={message} />;
  return <div className="live-record">{Object.entries(items).map(([id, item]) => <p key={id}><strong>Case {id}</strong> · {item.string_key} · {item.status}</p>)}</div>;
}
