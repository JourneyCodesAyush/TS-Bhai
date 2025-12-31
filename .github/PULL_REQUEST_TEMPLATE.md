# Pull Request

Thanks for contributing to **TS-Bhai**! Please complete this form so we can review your pull request efficiently.

> ⚠️ Check the TS-Bhai Language Specification ([docs/language.md](docs/language.md)) before making changes.  
> Ensure your PR respects runtime rules, supported statements, and playground limitations.

---

## PR Summary

_Provide a short, descriptive summary of the changes._

**Example:**  
Fix crash when running interpreter with empty input in the playground

---

## What has changed?

_List the key changes made in this PR._

- Fixed bug in interpreter handling `nalla` values
- Updated parser to support additional comparison tokens
- Added unit tests for expressions and statements
- Updated frontend playground to display runtime errors correctly
- Improved TerminalOutput styling

---

## Affected Areas

_(Check all that apply)_

- [ ] Core logic (`package/core/`)
- [ ] Parser / Lexer
- [ ] Frontend Playground / UI (`app/src/components/`)
- [ ] Tests
- [ ] Configuration / CI
- [ ] Documentation
- [ ] Other: \***\*\_\_\*\***

---

## Related Issue

_Link to any related issues (if applicable)_

**Example:** Closes #42

---

## Testing Instructions

_How should we test this change?_

1. Run `runBhaiLang()` with sample scripts in `package/`
2. Test new grammar, statements, or runtime behavior
3. Verify frontend playground renders output and errors correctly
4. Check TypeScript compilation and linting

---

## Checklist

_(Check all that apply)_

- [ ] I have verified my changes comply with the TS-Bhai Language Specification
- [ ] My code follows the project's style guidelines
- [ ] I have tested my changes locally
- [ ] I have added relevant tests
- [ ] I have updated related documentation
- [ ] This PR is ready for review
