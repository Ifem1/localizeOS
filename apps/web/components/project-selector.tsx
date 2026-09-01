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
  return <div className="project-selector"><label htmlFor="project">Project</label><select id="project" value={value || ""} onChange={(e) => onChange(Number(e.target.value))}><option value="">Select a live project</option>{Object.entries(projects).map(([id, p]) => <option key={id} value={id}>{p.name} · {id}</option>)}</select>{message && <small>{message}</small>}<Link href="/">Create project</Link></div>;
}
