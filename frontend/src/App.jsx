
import React, { useState } from "react";
import { ShieldCheck, Link, Mail, MessageSquare, Search } from "lucide-react";
import { analyzeContent } from "./api";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!input.trim()) {
      setResult({ message: "Please enter content to analyse." });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeContent(input);
      setResult(data);
    } catch (error) {
      setResult({
        message: "Cannot connect to ScamSense backend. Please try again."
      });
    } finally {
      setLoading(false);
    }
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
          <p>Analyse suspicious messages and links with your cybersecurity assistant.</p>
        </section>

        <section className="analyser">
          <h2>Threat Analysis</h2>
          <p>Paste suspicious message or email content below.</p>

          <div className="input-label">
            <MessageSquare size={18} />
            <span>Content to analyse</span>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste content here..."
          />

          <button onClick={handleAnalyze} disabled={loading}>
            <Search size={18} />
            {loading ? "Analysing..." : "Analyse Content"}
          </button>

          {result && (
            <div className="result">
              <h3>{result.risk_level || "Analysis Result"}</h3>
              <p>{result.message}</p>

              {result.indicators?.length > 0 && (
                <ul>
                  {result.indicators.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
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
