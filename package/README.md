# TS-Bhai Package

This package contains the **core implementation of BhaiLang** in TypeScript.  
It includes the **lexer, parser, interpreter**, and a **runner/bridge** that allows executing BhaiLang code from Node or a web playground.

---

## Table of Contents

- [TS-Bhai Package](#ts-bhai-package)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [TypeScript Configurations](#typescript-configurations)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [References](#references)

---

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/journeycodesayush/ts-bhai.git
cd ts-bhai/package
npm install
```

> By default, this uses `tsconfig.json` for Node. For web/bundler usage, see [TypeScript Configurations](#typescript-configurations).

---

## Project Structure

```
package/
├── core/
│   ├── lexer/
│   ├── parser/
│   ├── interpreter/
│   └── runner.ts        # Bridge for playground or Node usage
│
├── tsconfig.json        # Node-only config
├── tsconfig.web.json    # Web/bundler config
├── package.json
└── README.md
```

**Key modules:**

- `lexer/` – Tokenizes BhaiLang source code.
- `parser/` – Builds the AST from tokens.
- `interpreter/` – Evaluates the AST and produces output.
- `runner.ts` – Exposes a single `runBhaiLang(sourceCode: string)` function returning outputs and errors.

---

## TypeScript Configurations

- **Node-only (`tsconfig.json`)** – CommonJS module, Node-compatible, used for testing/interpreter logic.
- **Web/Bundler (`tsconfig.web.json`)** – ESNext modules, compatible with React playground or other bundlers.

> Tip: Keep these separate to avoid bundling Node-only features into the web playground.

---

## Usage

Import and run code using the `runner`:

```ts
import { runBhaiLang } from "./runner";

const sourceCode = `
bhai ye hai a = "Hello";
bol bhai a;
`;

const result = runBhaiLang(sourceCode);

console.log("Output:", result.output); // ["Hello"]
console.log("Errors:", result.errors); // []
```

The `runBhaiLang` function returns:

```ts
interface RunResult {
  output: string[]; // printed outputs from 'bol bhai'
  errors: string[]; // lexer, parser, runtime errors
}
```

---

## Contributing

1. Fork the repo.
2. Make changes inside `core/`.
3. Add/update tests.
4. Submit a pull request.

---

## References

- Original BhaiLang: [https://bhailang.js.org](https://bhailang.js.org)
- Implementation-derived specs: [`docs/language.md`](../docs/language.md)
- Inspired by [_Crafting Interpreters_](https://craftinginterpreters.com) by Robert Nystrom
