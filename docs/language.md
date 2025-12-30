# BhaiLang Language Specification (Implementation-Derived)

This document defines the behavior of **BhaiLang** as implemented by:

- **Original BhaiLang**
- **JavaBhaiLang** (Java implementation)
- **TS-Bhai** (TypeScript re-implementation for playground)

> ⚠️ Original BhaiLang does **not** provide a formal specification.
> This document is **implementation-derived**, highlighting consistent behavior, runtime rules, and differences across implementations.

---

## 1. Runtime Values

BhaiLang supports the following types:

| Type    | Literal / Notes                |
| ------- | ------------------------------ |
| Number  | Floating point numbers         |
| String  | Single or double quoted        |
| Boolean | `sahi` → true, `galat` → false |
| Null    | `nalla`                        |

**Type System:** Dynamically typed; variables can hold any type.

---

## 2. Truthiness

Values considered **falsey**:

- `galat`
- `nalla`

All other values are truthy.

> **Note:** Original BhaiLang treats `0` as false; JavaBhaiLang and TS-Bhai treat `0` as truthy.

Truthiness applies to:

- `agar bhai` (if)
- `jab tak bhai` (while)

---

## 3. Variables

Declaration syntax:

```bhai
bhai ye hai <identifier> = <expression>;
```

Rules:

- Mutable
- Block-scoped
- Must be declared before use
- Using an undefined variable → runtime error
- Assignment to `nalla`:

  - Original BhaiLang: allowed
  - JavaBhaiLang: allowed
  - TS-Bhai: disallowed

---

## 4. Expressions

Supported:

- Arithmetic: `+ - * /`
- Comparison: `== != < <= > >=`
- Logical: `&& ||`
- Assignment: `= += -= *= /=` (TS-Bhai does **not** support complex assignments)
- Unary operators: `-`, `!` (original BhaiLang does **not** support `!`)

> Type errors during evaluation → runtime error

---

## 5. Statements

Supported statements:

- Variable declarations
- Expression statements
- Print: `bol bhai`
- Conditionals:

  - `agar bhai` → if
  - `nahi to bhai` → else if
  - `warna bhai` → else

- Loops: `jab tak bhai`
- Loop control:

  - `bas kar bhai` → break
  - `agla dekh bhai` → continue

**Loop rules:**

- Break/continue **outside loops**:

  - Original BhaiLang: runtime error
  - JavaBhaiLang: stack unwinds
  - TS-Bhai: type/runtime error depending on check

---

## 6. Control Flow Notes

- Loops evaluate truthiness of the condition.
- Conditionals short-circuit correctly.
- Statements outside `hi bhai … bye bhai`:

  - File execution: only executed inside block
  - REPL: executed immediately

---

## 7. Errors

Types of errors:

- Lexer errors
- Parse errors
- Runtime errors:

  - Undefined variables
  - Invalid operand types
  - Illegal control flow (break/continue outside loop)
  - Null pointer access / assignment

> Errors may stop execution or be captured, depending on implementation.

---

## 8. Implementation Edge Cases

| Case                                 | Original BhaiLang       | JavaBhaiLang                       | TS-Bhai                                 | Notes                                |
| ------------------------------------ | ----------------------- | ---------------------------------- | --------------------------------------- | ------------------------------------ |
| Unary `!sahi`                        | ❌ Unexpected token `!` | ✅ Prints `galat`                  | ✅ Prints `galat`                       | Original does not support `!`        |
| `break/continue` outside loops       | ❌ Runtime error        | Stack unwinds (prints exception)   | ❌ Runtime error                        | TS-Bhai enforces runtime check       |
| Assignment to `nalla`                | ✅ Allowed              | ✅ Allowed                         | ❌ Not allowed                          | TS-Bhai stricter, playground safer   |
| Complex assignments `+=, -=, *=, /=` | ✅ Supported            | ✅ Supported                       | ❌ Not supported                        | Playground intentionally minimal     |
| Nested `if-else` chains              | ✅ Supported            | ✅ Supported                       | ✅ Supported                            | All behave as expected               |
| Truthiness of 0 in loops             | ❌ Treated as false     | ✅ Treated as true → infinite loop | ✅ Treated as true → playground crashes | Important divergence                 |
| Unsupported operators                | ❌ Runtime error        | ✅ Evaluates if supported          | ❌ Syntax error                         | Playground minimal                   |
| Loop with invalid condition type     | ❌ Runtime error        | Frozen / exception                 | ❌ Type error                           | JavaBhaiLang may need extra handling |

> These cases illustrate where implementations **diverge** from original semantics.
> Use this table for **testing, documentation, and teaching**.

---

## 9. Program Structure

- File execution: only statements between `hi bhai … bye bhai` are executed
- REPL: all statements executed immediately

---

## 10. Playground Limitations

The TS-Bhai playground:

- Minimal; no complex assignment operators
- Cannot assign to `nalla`
- Stops at unsupported syntax
- Only supports statements required for basic experimentation (print, loops, if/else)

---

## 11. Compatibility Notes

- Goal: remain largely compatible with original BhaiLang
- Strictness: JavaBhaiLang and TS-Bhai enforce more runtime checks
- Edge cases differ; refer to **Edge Cases Table** above
- Future TS-Bhai updates may extend support closer to JavaBhaiLang

---

## 12. References

- [Original BhaiLang](https://bhailang.js.org) (experimental)
- [JavaBhaiLang (Java re-implementation)](https://github.com/JourneyCodesAyush/javabhailang) GitHub
- Inspired by [`Crafting Interpreters`](https://craftinginterpreters.com) by Robert Nystrom

---

✅ This is a **single source of truth** for all BhaiLang implementations.
It captures **core language rules, runtime semantics, and known divergences**.
