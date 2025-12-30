import { Interpreter } from "./interpreter/index";
import { Lexer, LexerError, Token } from "./lexer/index";
import { Parser, ParseError } from "./parser/index";
import { Stmt } from "./parser/Stmt/index";

export interface RunResult {
  output: string[];
  errors: string[];
}

/**
 * Runs BhaiLang source code and returns output and errors.
 */
export const runBhaiLang = (sourceCode: string): RunResult => {
  const output: string[] = [];
  const errors: string[] = [];

  // --- Lexing ---
  const lexer = new Lexer(sourceCode);
  const {
    tokens,
    errors: lexerErrors,
  }: { tokens: Token[]; errors: LexerError[] } = lexer.scanTokens();

  if (lexerErrors.length > 0) {
    lexerErrors.forEach((err) =>
      errors.push(`[Lexer] '${err.lexeme}' at line ${err.line}`)
    );
    return { output, errors };
  }

  // --- Parsing ---
  const parser = new Parser(tokens);
  const {
    statements,
    errors: parseErrors,
  }: { statements: Stmt[] | null; errors: ParseError[] } = parser.parse();

  if (parseErrors.length > 0) {
    parseErrors.forEach((err) =>
      errors.push(
        `[Parser] [line ${err.token.getLine()}] Error at '${err.token.getLexeme()}': ${
          err.message
        }`
      )
    );
    return { output, errors };
  }

  if (!statements) {
    errors.push("[Parser] No statements to execute");
    return { output, errors };
  }

  // --- Interpreting ---
  const interpreter = new Interpreter();
  try {
    const result = interpreter.interpret(statements);
    if (result) output.push(...result);
  } catch (e) {
    errors.push(`[Interpreter] Unexpected error: ${e}`);
  }

  // Collect runtime errors (RuntimeError + NallaPointerException)
  interpreter.InterpreterErrors.forEach((e) => {
    const tokenLexeme = (e as any).token?.getLexeme?.() ?? "<unknown>";
    errors.push(`[Runtime] '${tokenLexeme}': ${e.message}`);
  });

  return { output, errors };
};
