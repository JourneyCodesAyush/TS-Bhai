# TS-Bhai Package

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Node](https://img.shields.io/badge/Node-18%2B-green)
![License](https://img.shields.io/badge/license-MIT-green)

---

> [!WARNING]
> ⚠️ **Reference-only project:** TS-Bhai is **not actively maintained**.  
> Use for learning, experimentation, or playgrounds only. No updates or new features are planned

---

## Table of Contents

- [TS-Bhai Package](#ts-bhai-package)
  - [Table of Contents](#table-of-contents)
  - [Features Overview](#features-overview)
  - [Quick Install](#quick-install)
  - [Run via Node or Web](#run-via-node-or-web)
    - [Node (CommonJS)](#node-commonjs)
    - [Web Playground (ESNext + Bundler)](#web-playground-esnext--bundler)
  - [Examples](#examples)
    - [Variables](#variables)
    - [Strings \& Numbers](#strings--numbers)
    - [Conditionals](#conditionals)
    - [Loops](#loops)
  - [Project Structure](#project-structure)
  - [Known Limitations](#known-limitations)
  - [Development Guide](#development-guide)
  - [Commit Message Convention](#commit-message-convention)
  - [Contributing](#contributing)
  - [License](#license)
  - [Author](#author)

---

## Features Overview

- Minimal TypeScript BhaiLang interpreter
- Lexer, parser, interpreter fully implemented in `core/`
- `runner.ts` exposes `runBhaiLang(sourceCode: string)` for Node and web playground
- Separate TypeScript configs for Node and web bundling (`tsconfig.json` and `tsconfig.web.json`)
- Designed for experimentation and learning; **not intended for production**

---

## Quick Install

```bash
git clone https://github.com/journeycodesayush/ts-bhai.git
cd ts-bhai/package
npm install
```

> Build step is **not required**. Use `runner.ts` directly.

---

## Run via Node or Web

### Node (CommonJS)

```ts
import { runBhaiLang } from "./core/runner";

const sourceCode = `
bhai ye hai a = "Hello";
bol bhai a;
`;

const result = runBhaiLang(sourceCode);
console.log("Output:", result.output); // ["Hello"]
console.log("Errors:", result.errors); // []
```

### Web Playground (ESNext + Bundler)

- Import `runBhaiLang` from `core/runner.ts` in your React/Vite project.
- Use `tsconfig.web.json` for bundling.
- Example:

```ts
import { runBhaiLang } from "../package/core/runner";

const result = runBhaiLang("bhai ye hai x = 42; bol bhai x;");
console.log(result.output); // ["42"]
```

---

## Examples

### Variables

```bhai
bhai ye hai a = 10;
bhai ye hai b = 20;

bol bhai a, b;  # prints 10, 20
```

### Strings & Numbers

```bhai
bhai ye hai name = "TS-Bhai";
bhai ye hai score = 100;

bol bhai "Name:", name, "Score:", score;
```

### Conditionals

```bhai
bhai ye hai score = 75;

agar bhai (score >= 90) {
    bol bhai "Topper bhai!";
} nahi to bhai (score >= 60) {
    bol bhai "Pass hogaya bhai!";
} warna bhai {
    bol bhai "Thoda padh le bhai.";
}
```

### Loops

```bhai
bhai ye hai i = 0;
jab tak bhai (i < 5) {
    bol bhai i;
    i = i + 1;
}
```

---

## Project Structure

```bash
package/
├── core/
│   ├── lexer/
│   ├── parser/
│   ├── interpreter/
│   └── runner.ts
├── tsconfig.json        # Node-only config
├── tsconfig.web.json    # Web/bundler config
├── package.json
└── README.md
```

---

## Known Limitations

- Not actively maintained
- No npm build scripts
- No automated tests
- Desktop-only playground
- Single-file execution via runner only

---

## Development Guide

- Modify logic inside `core/` if needed
- Test using Node
- Use `tsconfig.web.json` when bundling for web
- Keep changes modular and update runner accordingly

---

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```bash
fix(package): handle runtime errors
docs(readme): update usage examples
```

---

## Contributing

This repo is **reference-only**.
You can fork it and experiment, but **active development is not planned**.

Steps if you want to tinker:

1. Fork the repo
2. Modify code inside `core/`
3. Test using Node or playground
4. Submit a PR (optional)

---

## License

MIT License

```text
MIT License

Copyright (c) 2025 JourneyCodesAyush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

---

## Author

Made with ♥ by [JourneyCodesAyush](https://github.com/journeycodesayush)
