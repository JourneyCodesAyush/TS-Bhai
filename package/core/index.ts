import { Interpreter } from "./interpreter/Interpreter";
import { Lexer, LexerError, Token, TokenType } from "./lexer/index";
import { Parser, ParseError } from "./parser/index";
import { Stmt } from "./parser/Stmt";

const main = () => {
  // const sourceCode: string = "//!!=;,\n13.3/bhai ye hai  sahi galat nalla";
  // const sourceCode: string = "'hello world' \"this is a test\"";
  // const sourceCode = `
  // // Complex Bhailang code
  // 13.5 + 42 / bhai ye hai sahi galat
  // "hello world" 'this is a test'
  // hi bhai - 99
  // agar bhai nalla + bas kar bhai
  // jab tak bhai 3.14 * bol bhai
  // `;

  // const sourceCode = "a = 3 + 5";
  // const lexer = new Lexer(sourceCode);
  // const tokens: Token[] = lexer.scanTokens();
  // tokens.forEach((token) => {
  //   console.log(token);
  // });

  // const tokens: Token[] = [
  //   new Token(TokenType.NUMBER, "3", 3, 1),
  //   new Token(TokenType.PLUS, "+", null, 1),
  //   new Token(TokenType.NUMBER, "5", 5, 1),
  //   new Token(TokenType.EOF, "", null, 1),
  // ];

  //   const sourceCode = `
  //   bhai ye hai a = 10;
  // bhai ye hai b = 3;
  // bhai ye hai msg = "Start bhai";
  // bhai ye hai flag = sahi;
  // bhai ye hai nothing = nalla;

  // bol bhai msg, a, b, flag, nothing;

  // a = a + 5;
  // b = b * 2;
  // bol bhai "After reassignment:", a, b;

  // agar bhai (a > 20) {
  //     bol bhai "a is greater than 20";
  // } nahi to bhai (a == 15) {
  //     bol bhai "a is exactly 15";
  // } warna bhai {
  //     bol bhai "a is less than 15";
  // }

  // bhai ye hai counter = 0;

  // jab tak bhai (counter < 10) {
  //     counter = counter + 1;

  //     agar bhai (counter == 3) {
  //         bol bhai "Skipping 3";
  //         agla dekh bhai;
  //     }

  //     agar bhai (counter == 7) {
  //         bol bhai "Breaking at 7";
  //         bas kar bhai;
  //     }

  //     bol bhai "Counter:", counter;
  // }

  // {
  //     bhai ye hai scoped = 999;
  //     bol bhai "Inside block:", scoped;
  // }

  // bol bhai "Done bhai!";

  // `;

  const sourceCode = `
bhai ye hai a;        // a is declared but not initialized → nalla
bhai ye hai b = 5;

bol bhai a;           // should print "nalla"
bol bhai b;           // should print 5

// This will attempt arithmetic with a nalla value → should throw NallaPointerException
bhai ye hai c = a + b;
bol bhai c;  `;

  const lexer = new Lexer(sourceCode);
  const { tokens, errors }: { tokens: Token[]; errors: LexerError[] } =
    lexer.scanTokens();

  if (errors.length !== 0) {
    for (const error of errors) {
      console.log(error.lexeme, error.line);
    }
    return;
  }
  tokens.forEach((token) => {
    console.log(token);
  });

  const parser = new Parser(tokens);
  try {
    // const expr = parser.parse();
    // console.log("Parsing successful!");
    // console.log(expr);
    const {
      statements,
      errors,
    }: { statements: Stmt[] | null; errors: ParseError[] } = parser.parse();
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(
          `[line ${error.token.getLine()}] Error at '${error.token.getLexeme()}' ${
            error.message
          }`
        );
      }
      return;
    }

    const interpreter = new Interpreter();
    if (statements !== null) {
      console.log("Reached here");
      const result: string[] | undefined = interpreter.interpret(statements);
      if (result !== undefined) {
        // for (const res of result) {
        //   console.log(res);
        // }
        const final_result = result.join("\n> ");
        console.log(final_result);
      }
    }
  } catch (e) {
    console.error(`Parsing failed: ${e}`);
  }
};

main();

export const tokenizeSource = (sourceCode: string): string => {
  const lexer = new Lexer(sourceCode);
  const { tokens, errors }: { tokens: Token[]; errors: LexerError[] } =
    lexer.scanTokens();

  let tokenString: string = "";

  tokens.forEach((token) => {
    console.log(token.toString());
    // for (const key in token) {
    //   tokenString += key.toString();
    //   console.log(key.toString());
    // }
    // tokenString += token.toString() + "\n";
    tokenString += token.toDebug() + "\n";
  });

  // return tokens.toString();
  return tokenString;
};
