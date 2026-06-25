# 🍳 OpenJVM Studio — Interactive Java JVM Bytecode Studio

> An educational platform for exploring how Java code is transformed and executed inside the Java Virtual Machine (JVM).

OpenJVM Studio is a full-stack visualization studio that enables developers and students to write Java code and interactively observe each stage of the JVM execution pipeline. The platform deconstructs JVM internals by exposing lexical analysis, bytecode generation, execution flow, operand stack mutations, and local variable state transitions in real time.

---

## ✨ Features

### 📝 Interactive Java Playground

Write and execute Java code inside a modern web-based editor.

### 🔍 Lexical Analysis Visualization

Inspect how source code is tokenized using a custom regex-driven lexer.

### ⚙️ Bytecode Generation

Observe how Java statements are translated into JVM-style bytecode instructions.

### 🧠 JVM Runtime Simulation

Step through execution instruction-by-instruction while visualizing:

* Operand Stack changes
* Local Variable updates
* Program Counter progression
* Execution Frame snapshots

### ⏯️ Interactive Execution Controls

Control execution using:

* Play
* Pause
* Step Forward
* Reset

for granular inspection of runtime behavior.

### 🌌 Modern Developer Experience

* Dark cyberpunk-inspired UI
* Matrix-style animated background
* Responsive dashboard layout
* Real-time state visualization panels

---

## 🏗️ System Architecture

```text
          Java Source Code
                    │
                    ▼
            Custom Lexer
                    │
                    ▼
          Bytecode Compiler
                    │
                    ▼
           JVM Runtime Engine
                    │
                    ▼
       Execution Frame Logger
                    │
                    ▼
        React Visualization UI
```

---

## 🛠️ Technology Stack

| Layer      | Technologies              |
| ---------- | ------------------------- |
| Backend    | Java 17/21, Spring Boot 3 |
| Frontend   | React, Vite               |
| Styling    | Tailwind CSS              |
| Build Tool | Maven                     |
| Icons      | Lucide React              |

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed:

* Java 17 or higher
* Node.js 18 or higher
* npm

---

### 1. Start the Backend Server

```bash
cd backend
./mvnw clean spring-boot:run
```

The backend API will be available at:

```text
http://localhost:8080
```

---

### 2. Start the Frontend Application

```bash
cd frontend
npm install
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:5173
```

---

## 📂 Project Structure

```text
open-jvm-ecosystem/
│
├── backend/
│   ├── src/main/java/com/openjvm/
│   │
│   ├── compiler/
│   │   ├── lexer/
│   │   └── BytecodeCompiler
│   │
│   ├── runtime/
│   │   ├── VirtualMachine
│   │   └── ExecutionFrame
│   │
│   ├── controller/
│   └── EngineApplication.java
│
├── frontend/
│   ├── src/
│   │
│   ├── components/
│   │   ├── EditorWindow.jsx
│   │   ├── BytecodePanel.jsx
│   │   ├── MemoryMatrix.jsx
│   │   └── InstructionWalker.jsx
│   │
│   └── App.jsx
│
└── README.md
```

---

## 🔬 Core Components

### Custom Lexer

A regex-driven lexical analyzer responsible for tokenizing Java source code into meaningful language constructs.

### Bytecode Compiler

Transforms lexical tokens into intermediate JVM-style bytecode instructions using a custom compilation pipeline.

### Runtime Engine

Simulates JVM execution semantics, including:

* Stack operations
* Local variable updates
* Instruction pointer movement
* Frame execution lifecycle

### Execution Frame Logger

Captures runtime snapshots after every instruction, enabling deterministic replay and visualization.

---

## 📸 Screenshots

Add screenshots or animated GIF demonstrations here.

```md
![Editor](docs/editor.png)

![Bytecode Viewer](docs/bytecode.png)

![Runtime Simulation](docs/runtime.png)
```

---

## 🎯 Learning Objectives

This project was built to deepen understanding of:

* Compiler Construction
* JVM Internals
* Stack-Based Virtual Machines
* Bytecode Execution
* Runtime State Management
* Full-Stack Application Architecture

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.
