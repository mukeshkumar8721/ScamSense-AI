# ScamSense

> **Think before you click.**

ScamSense is a multi-agent AI cybersecurity assistant designed to help
people identify and understand potential phishing attempts across
messages, emails, URLs, and screenshots.

It combines machine-learning-based detection, specialised AI agents, and
threat-intelligence checks to produce an explainable risk assessment and
practical safety recommendations.

> **Project status:** Hackathon prototype / under development. Features
> described below are planned capabilities; update this README to
> reflect what is actually implemented and tested.

## Table of Contents

-   [Problem](#problem)
-   [Our Solution](#our-solution)
-   [Key Features](#key-features)
-   [How It Works](#how-it-works)
-   [Proposed Architecture](#proposed-architecture)
-   [Technology Stack](#technology-stack)
-   [Getting Started](#getting-started)
-   [Configuration](#configuration)
-   [Example Workflow](#example-workflow)
-   [Safety and Privacy](#safety-and-privacy)
-   [Team](#team)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [Disclaimer](#disclaimer)

## Problem

Phishing attempts increasingly use convincing messages, impersonated
organisations, deceptive websites, and social-engineering techniques.
People may struggle to recognise these threats, while basic detection
tools often provide only a simple safe/unsafe result without explaining
the evidence.

## Our Solution

ScamSense aims to act as an interactive security investigation
assistant. A user submits suspicious content, and the system examines it
using a coordinated set of analysis components. It then presents:

-   A risk classification and score.
-   The warning signs found in the submitted content.
-   Supporting evidence and the reason for the assessment.
-   Recommended steps the user can take to stay safe.

ScamSense is intended to support informed decisions---not replace
security professionals or guarantee that content is safe.

## Key Features

The following are the intended project capabilities. Mark each feature
as implemented only after it has been built and tested.

-   **Multi-format analysis:** Analyse text messages, email content,
    URLs, and screenshots.
-   **Collaborative AI agents:** Use specialised agents for content
    analysis, URL assessment, threat-intelligence review, and final
    report generation.
-   **Machine-learning detection:** Classify suspicious patterns using a
    trained model.
-   **Threat-intelligence checks:** Consult supported reputation
    services when configured.
-   **Explainable results:** Show the indicators behind a risk
    assessment instead of returning only a label.
-   **Threat fingerprint:** Summarise notable signals such as suspicious
    wording, domain mismatches, and unusual requests.
-   **Security guidance:** Give clear, practical recommendations based
    on the assessment.
-   **Learning assistant:** Help users understand common phishing
    warning signs.

## How It Works

1.  **Submit:** The user provides message text, an email, a URL, or a
    screenshot.
2.  **Extract:** The application extracts relevant text and indicators.
    OCR may be used for screenshots.
3.  **Analyse:** The relevant detection components inspect the content
    and identify warning signs.
4.  **Verify:** Available threat-intelligence services and deterministic
    checks provide additional evidence.
5.  **Reconcile:** The coordinating agent combines findings and handles
    conflicting results.
6.  **Report:** ScamSense displays a risk assessment, evidence, and
    recommended next steps.

## Proposed Architecture

``` text
                 User
                  |
                  v
          ScamSense Web Interface
                  |
                  v
             FastAPI Backend
                  |
                  v
          Input Processing Layer
          /        |          \
       Text       URL       Screenshot
        |          |            |
        v          v            v
   Content AI   URL Checks     OCR
        \          |            /
         \         |           /
          v        v          v
          Multi-Agent Coordinator
          /          |           \
         v           v            v
   ML Detector  Threat Intel   Context Analysis
          \          |           /
           \         |          /
            v        v         v
              Evidence Review
                    |
                    v
          Explainable Risk Report
                    |
                    v
          Safety Recommendations
```

This is the proposed design. Adapt the diagram as the implementation
evolves.

## Technology Stack

  -----------------------------------------------------------------------
  Layer                               Proposed technology
  ----------------------------------- -----------------------------------
  Frontend                            React.js, HTML, CSS, JavaScript

  Backend API                         Python, FastAPI

  Generative AI                       Google Gemini API

  Agent orchestration                 LangGraph

  Machine learning                    Scikit-learn, with XGBoost if
                                      needed

  Text and image extraction           NLP tools and OCR

  Threat intelligence                 VirusTotal API (optional, subject
                                      to API limits and terms)

  Database                            Supabase

  Visualisation                       Chart.js / React Flow

  Development                         Git, GitHub, VS Code
  -----------------------------------------------------------------------

The team may simplify this stack to deliver a reliable working prototype
within the hackathon timeline.

## Getting Started

### Prerequisites

Install the following before running the project:

-   Python 3.10 or later
-   Node.js and npm
-   Git

### 1. Clone the repository

``` bash
git clone <YOUR_REPOSITORY_URL>
cd scamsense
```

### 2. Set up the backend

``` bash
python -m venv .venv
```

Activate the environment:

**Windows**

``` bash
.venv\Scripts\activate
```

**macOS / Linux**

``` bash
source .venv/bin/activate
```

Install backend dependencies (after creating `requirements.txt`):

``` bash
pip install -r requirements.txt
```

Start the API (adjust the module path to match your project):

``` bash
uvicorn app.main:app --reload
```

### 3. Set up the frontend

If the frontend is in a `frontend` directory:

``` bash
cd frontend
npm install
npm run dev
```

Follow the local URL printed by the development server.

> These commands are a starting template. Update folder names, entry
> points, and scripts to match the actual repository structure.

## Configuration

Create a `.env` file in the backend project directory and add the keys
required by the services you have enabled:

``` env
GEMINI_API_KEY=your_gemini_api_key
VIRUSTOTAL_API_KEY=your_virustotal_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

Only configure services used by your implementation. Keep `.env` out of
version control by adding it to `.gitignore`. Never commit API keys,
passwords, access tokens, or other secrets.

## Example Workflow

A user pastes a suspicious message into ScamSense. The application
extracts relevant indicators, checks the content with its available
analysis components, and returns a report such as:

-   **Assessment:** Potentially suspicious
-   **Evidence:** Urgent language and an unexpected request for
    sensitive information
-   **Additional checks:** URL reputation check, if a URL is present and
    the service is configured
-   **Recommendation:** Do not follow the message's instructions. Verify
    the request using the organisation's official website or a trusted
    contact method.

This is an illustrative example, not a claim about measured detection
accuracy.

## Safety and Privacy

-   Do not open suspicious links or download attachments as part of
    ordinary analysis.
-   Treat submitted messages, URLs, and screenshots as untrusted input.
-   Do not submit real passwords, one-time passcodes, payment details,
    or other sensitive information.
-   Avoid storing submitted content unless it is necessary, disclosed,
    and protected.
-   Use API keys only on the backend and protect them with environment
    variables.
-   Show uncertainty when evidence is incomplete or services are
    unavailable.
-   Do not label a link as safe solely because it is absent from a
    threat-intelligence database.
-   Keep consequential actions under user control; the prototype should
    provide recommendations rather than silently taking action.

## Team

**Team:** Cyber Attackerz\
**Project:** ScamSense\
**Theme:** Cyber Threats and Challenges

Add team member names, roles, and contact details here if required for
your submission.

## Roadmap

-   [ ] Build the basic web interface.
-   [ ] Create the FastAPI analysis endpoint.
-   [ ] Add text-based phishing analysis.
-   [ ] Train and evaluate a baseline machine-learning classifier.
-   [ ] Add URL feature checks without visiting suspicious pages.
-   [ ] Integrate specialised agents and evidence reconciliation.
-   [ ] Add screenshot text extraction using OCR.
-   [ ] Add optional threat-intelligence integration.
-   [ ] Display explainable reports and safety recommendations.
-   [ ] Test with a labelled set of safe, simulated examples and
    document limitations.

## Contributing

Contributions, suggestions, and bug reports are welcome. For a hackathon
team, coordinate changes through GitHub issues or pull requests and test
changes before merging them into the main branch.

## Disclaimer

ScamSense is an educational hackathon project and decision-support
prototype. It does not guarantee detection of every phishing attempt,
and its results should not be treated as definitive proof that a message
or website is safe or malicious. Always verify sensitive requests
through official channels.
