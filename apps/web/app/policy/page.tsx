import SiteHeader from "../../components/site-header";
import { ProjectPolicy } from "../../components/live-records";

export default function Policy() { return <main className="shell"><SiteHeader /><section className="workspace"><div className="eyebrow">PROJECT RULES · VERSIONED</div><h1>Glossary & style</h1><p className="lede">Select a project in the workspace to inspect its pinned policy commitments.</p><ProjectPolicy id={1} /></section></main>; }
