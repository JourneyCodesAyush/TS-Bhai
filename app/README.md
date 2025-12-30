# TS-Bhai Playground

A **desktop-first playground** for **BhaiLang** built with **React + TypeScript**.
It allows you to write, execute, and view BhaiLang code outputs and errors in real-time.

---

## Table of Contents

- [TS-Bhai Playground](#ts-bhai-playground)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
  - [Features](#features)
  - [Limitations](#limitations)
  - [Contributing](#contributing)
  - [References](#references)

---

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/journeycodesayush/ts-bhai.git
cd ts-bhai/app
npm install
```

Start the playground locally:

```bash
npm run dev
```

> Opens a React development server at `http://localhost:5173`.

---

## Project Structure

```
app/
├── src/
│   ├── Components/
│   │   ├── PlayGround.tsx       # Main editor & run button
│   │   └── TerminalOutput.tsx   # Displays output and errors
│   ├── main.tsx                # React entry point
│   └── ...
├── public/
├── package.json
└── tsconfig.json
```

**Key components:**

- `PlayGround.tsx` – Code editor, run button, and output panel.
- `TerminalOutput.tsx` – Displays outputs and errors in a styled terminal-like panel.

The playground **depends on the `package/core/runner.ts`** to execute BhaiLang code.

---

## Usage

1. Type BhaiLang code in the editor.
2. Click **Run** to execute.
3. Outputs appear in white text; errors appear in red.

```bhai
bhai ye hai a = "Hello";
bol bhai a, " bhai log!";
```

**Example Output:**

```
Hello bhai log!
```

**Example Error:**

```
[Runtime error] 'a': Cannot assign to nalla
```

---

## Features

- Executes BhaiLang code using **runner** from `package/core`.
- Shows **output** and **errors** separately.
- Minimal UI optimized for **desktop** screens.

---

## Limitations

- **Desktop-only**: Mobile screens not supported.
- Playground is **minimal**: no support for some complex assignments (`+=`, `-=`, etc.) or assignments to `nalla`.
- Does **not include tests**.
- TypeScript + React only; bundler required for web use.

---

## Contributing

1. Fork the repo.
2. Make changes inside `src/Components/`.
3. Test locally with `npm run dev`.
4. Submit a pull request.

---

## References

- Core BhaiLang implementation: `package/core/`
- Language specifications: [`docs/language.md`](../docs/language.md)
- Inspired by original [BhaiLang](https://bhailang.js.org) and _Crafting Interpreters_ by Robert Nystrom
