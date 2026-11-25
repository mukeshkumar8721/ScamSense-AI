
import React, { useState } from "react";
import { ShieldCheck, Link, Mail, MessageSquare, Search } from "lucide-react";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  function analyzeInput() {
    if (!input.trim()) {
      setResult("Please enter a message or URL to analyse.");
      return;
    }

    setResult(
      "Submission received. Connect the ScamSense detection API to analyse this content."
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <ShieldCheck size={28} />
          <span>ScamSense</span>
        </div>
        <span className="tagline">Think Before You Click.</span>
      </header>

      <main className="container">
        <section className="hero">
          <span className="eyebrow">AI-POWERED CYBERSECURITY</span>
          <h1>Stay one step ahead of <span>digital threats.</span></h1>
          <p>
            Analyse suspicious messages and links with your intelligent
            cybersecurity assistant.
          </p>
        </section>

        <section className="analyser">
          <h2>Threat Analysis</h2>
          <p>Paste a suspicious message, email content or URL below.</p>

          <div className="input-label">
            <MessageSquare size={18} />
            <span>Content to analyse</span>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste suspicious content here..."
          />

          <button onClick={analyzeInput}>
            <Search size={18} />
            Analyse Content
          </button>

          {result && <div className="result">{result}</div>}
        </section>

        <section className="features">
          <div><Mail /><h3>Email Analysis</h3><p>Inspect suspicious email content.</p></div>
          <div><Link /><h3>URL Analysis</h3><p>Review suspicious links safely.</p></div>
          <div><ShieldCheck /><h3>AI Investigation</h3><p>Understand potential warning signs.</p></div>
        </section>
      </main>

      <footer>ScamSense © 2026 · Intelligent Digital Protection</footer>
    </div>
  );
}
