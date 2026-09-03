"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readProjects, type ProjectRecord } from "../lib/genlayer/data-source";

export function useSelectedProject() {
  const [projectId, setProjectId] = useState<number>(() => Number(globalThis?.localStorage?.getItem("localizeos.project") ?? 0));
  function select(id: number) { setProjectId(id); globalThis?.localStorage?.setItem("localizeos.project", String(id)); }
  return { projectId, select };
}

export default function ProjectSelector({ value, onChange }: { value: number; onChange: (id: number) => void }) {
  const [projects, setProjects] = useState<Record<string, ProjectRecord>>({});
  const [message, setMessage] = useState("Loading projects…");
  useEffect(() => { readProjects().then((result) => result.state === "ready" ? (setProjects(result.value), setMessage("")) : setMessage(result.message)); }, []);
  useEffect(() => { if (value || !Object.keys(projects).length) return; const requested = Number(new URLSearchParams(window.location.search).get("project") ?? 0); const saved = Number(globalThis?.localStorage?.getItem("localizeos.project") ?? 0); const candidate = requested > 0 && projects[String(requested)] ? requested : saved > 0 && projects[String(saved)] ? saved : 0; if (candidate > 0) onChange(candidate); }, [onChange, projects, value]);
  function select(id: number) { if (id > 0) globalThis?.localStorage?.setItem("localizeos.project", String(id)); else globalThis?.localStorage?.removeItem("localizeos.project"); onChange(id); }
  return <div className="project-selector"><label htmlFor="project">Project</label><select id="project" value={value || ""} onChange={(e) => select(Number(e.target.value))}><option value="">Select a live project</option>{Object.entries(projects).map(([id, p]) => <option key={id} value={id}>{p.name} · {id}</option>)}</select>{message && <small>{message}</small>}<Link href="/">Create project</Link></div>;
}
