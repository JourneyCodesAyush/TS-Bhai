# Contributing to TS-Bhai

Thank you for your interest in contributing to **TS-Bhai** - the TypeScript implementation of BhaiLang with a live playground!  
Your contributions help keep the chaos well-structured and the playground fun. 😎

> [!NOTE]
> TS-Bhai is a **playground / demo**.  
> For full BhaiLang experience and serious testing, clone and run [**JavaBhaiLang**](https://github.com/journeycodesayush/javabhailang) locally.

## 📑 Table of Contents

- [Contributing to TS-Bhai](#contributing-to-ts-bhai)
  - [📑 Table of Contents](#-table-of-contents)
  - [How to Contribute](#how-to-contribute)
    - [1. Understand the Project Structure](#1-understand-the-project-structure)
    - [2. Fork the Repository](#2-fork-the-repository)
    - [3. Clone Your Fork](#3-clone-your-fork)
    - [4. Create a New Branch](#4-create-a-new-branch)
    - [5. Make Your Changes](#5-make-your-changes)
    - [6. Commit Using Angular Format](#6-commit-using-angular-format)
    - [7. Push Your Branch](#7-push-your-branch)
    - [8. Open a Pull Request](#8-open-a-pull-request)
  - [Development Tips](#development-tips)
  - [Reporting Issues](#reporting-issues)
  - [Code of Conduct](#code-of-conduct)
  - [Thank You!](#thank-you)

---

## How to Contribute

### 1. Understand the Project Structure

```bash
TS-Bhai/
├── package/                    # Core interpreter
│   └── src/
│       ├── lexer/              # Lexer and tokens
│       ├── parser/             # Parser, AST nodes, statements
│       ├── interpreter/        # Runtime and environment
│       └── bridge/             # runBhaiLang API
├── app/                        # React playground frontend
│   └── src/
│       ├── components/         # PlayGround, TerminalOutput, Docs, etc.
│       ├── syntax.ts           # PrismJS syntax highlighting
│       └── data/               # Documentation data
├── docs/                       # Language spec
├── .github/                    # Issue templates, PR template, CoC, contributing guide
├── .gitattributes
├── .gitignore
├── LICENSE
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
└── README.md                   # You are READING it!
```

---

### 2. Fork the Repository

Click **Fork** on GitHub to create your own workspace.

---

### 3. Clone Your Fork

```bash
git clone https://github.com/<your-username>/ts-bhai.git
cd ts-bhai
```

---

### 4. Create a New Branch

```bash
git checkout -b feat/my-feature
```

Use descriptive names:
`feat/while-loop`, `fix/parser-bug`, `feat/break-keyword`

---

### 5. Make Your Changes

You may:

- Add new grammar rules or tokens
- Improve parser/interpreter behavior
- Implement missing features (`bas kar bhai`, `agla dekh bhai`)
- Enhance the playground UI or UX
- Fix bugs, improve performance, or refactor code
- Update documentation

Test your changes using:

```bash
# For the interpreter core
npm run build

# For playground
npm run dev
```

> Remember to respect the [TS-Bhai Language Specification](docs/language.md) when making changes.

---

### 6. Commit Using Angular Format

Commit messages must follow:

```bash
<type>(<scope>): <short summary>
```

Allowed types:

| Type     | Meaning                               |
| -------- | ------------------------------------- |
| feat     | New feature                           |
| fix      | Bug fix                               |
| docs     | Documentation                         |
| style    | Formatting only                       |
| refactor | Code improvement without new behavior |
| test     | Tests added/updated                   |
| chore    | Maintenance tasks                     |
| build    | Build system changes                  |

Suggested scopes:
`interpreter`, `parser`, `lexer`, `package`, `app`, `components`, `docs`

Examples:

```text
feat(interpreter): add support for bas kar bhai
fix(lexer): correct string literal parsing
docs: update language specification
```

---

### 7. Push Your Branch

```bash
git push origin feat/my-feature
```

---

### 8. Open a Pull Request

Please include:

- What you changed
- Why you changed it
- Any `.bhai` examples if applicable
- Reference related issues

---

## Development Tips

- Follow existing AST and visitor patterns
- Keep logic modular and readable
- Test new interpreter features thoroughly
- Test playground changes in the browser
- Commit in small, focused steps

---

## Reporting Issues

- Use the appropriate **issue templates** (bug, feature, enhancement, question, documentation)
- Provide clear description, minimal reproducible examples, and steps to reproduce
- Link to the [TS-Bhai Language Specification](docs/language.md) if relevant

---

## Code of Conduct

By contributing, you agree to follow the **[Code of Conduct](.github/CODE_OF_CONDUCT.md)**.
Be respectful, inclusive, and constructive.

---

## Thank You!

Whether you fix a typo, add a new language feature, or improve the playground, every contribution strengthens TS-Bhai.

Shukriya, bhai! ❤️
