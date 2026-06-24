Markdown
# ⚡ Local Setup & Execution Guide
1. Fire Up The Backend Server
Bash
cd backend
./mvnw clean spring-boot:run
The endpoint gateway handles JSON payloads on port 8080.

2. Launch The Interactive HUD
Bash
cd frontend
npm install
npm run dev
Open your browser to the local Vite portal at http://localhost:5173 (or http://localhost:5174) to start cooking code lines!

# 🍳 Open Kitchen // Interactive Java JVM Bytecode Studio

A beautiful, dark-mode educational development studio built to deconstruct the **Java Virtual Machine (JVM)** compilation pipeline. This ecosystem lets users type high-level Java code and interactively step through lexical analysis, intermediate bytecode down-compilation, and active operand stack frame state transitions in real time.

---

## 🚀 Key Architectural Features

* **Custom Compiler Subsystem:** A vanilla Java implementation featuring an explicit Regex-driven `Lexer` and a standard variable-to-register index assignment mapper (`BytecodeCompiler`).
* **Virtual Machine Memory Simulator:** A decoupled thread executor simulation that logs snapshots (`ExecutionFrame`) tracking LIFO Operand Stack data growth and register mutation maps.
* **Cyberpunk Dashboard UI:** A high-performance React front-end application built with Vite, styled with Tailwind CSS, and featuring an automated neon matrix raining backdrop.
* **Granular Clock Cycle Debugger:** Interactive player components to manually step through operations frame by frame with synced instructional walkthrough logs.

---

## 🛠️ The Technology Stack

### Backend Engine
* **Language:** Java 17 / 21
* **Framework:** Spring Boot 3.3.4 (REST API Engine)
* **Build Tool:** Apache Maven

### Frontend HUD
* **Framework:** React + Vite
* **Styling:** Tailwind CSS 
* **Icons:** Lucide React

---

## 📂 System Package Architecture

```text
open-jvm-ecosystem/
├── backend/
│   ├── src/main/java/com/openjvm/
│   │   ├── compiler/       # Lexer, OpCode Definitions, Translation Compiler
│   │   ├── runtime/        # Virtual Engine Simulator, Execution Frame Loggers
│   │   ├── controller/     # REST API Routing Gateways
│   │   └── EngineApplication.java
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Global State Matrix & Component Orchestrator
│   │   ├── EditorWindow.jsx# Text Workspace Pane
│   │   ├── MemoryMatrix.jsx# Stack & Variable Monitor Visual Grids
│   │   └── BytecodePanel.jsx # Assembly Line Tracker & Instructions Walker
│   └── index.html
└── .gitignore