import { Token } from "./Token";
import { TokenType } from "./TokenType";

export class LexerError {
  constructor(
    public line: number,
    public message: string,
    public lexeme?: string
  ) {}
}

const keywords: { [key: string]: TokenType } = {
  sahi: TokenType.SAHI,
  galat: TokenType.GALAT,
};

const multikeywords: { [key: string]: TokenType } = {
  "hi bhai": TokenType.HI_BHAI,
  "bye bhai": TokenType.BYE_BHAI,
  "bol bhai": TokenType.BOL_BHAI,
  "bhai ye hai": TokenType.BHAI_YE_HAI,
  "agar bhai": TokenType.AGAR_BHAI,
  "nahi to bhai": TokenType.NAHI_TO_BHAI,
  "warna bhai": TokenType.WARNA_BHAI,
  "jab tak bhai": TokenType.JAB_TAK_BHAI,
  "bas kar bhai": TokenType.BAS_KAR_BHAI,
  "agla dekh bhai": TokenType.AGLA_DEKH_BHAI,
};

export class Lexer {
  private _source: string;

  public tokens: Token[] = [];
  private _start: number = 0;
  private _current: number = 0;
  private _line: number = 1;
  private _wordBuffer: string = "";

  public LexErrors: LexerError[] = [];

  constructor(source: string) {
    this._source = source;
  }

  handleError(line: number, message: string, lexeme: string): void {
    this.LexErrors.push(new LexerError(line, message, lexeme));
  }

  scanTokens(): { tokens: Token[]; errors: LexerError[] } {
    while (!this.isAtEnd()) {
      this._start = this._current;
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, "", null, this._line));
    // this.tokens.push({
    //   type: TokenType.EOF,
    //   lexeme: "",
    //   literal: null,
    //   line: this._line,
    // });
    return { tokens: this.tokens, errors: this.LexErrors };
  }

  private isAtEnd(): boolean {
    return this._current >= this._source.length;
  }

  private advance(): string {
    if (!this.isAtEnd()) {
      return this._source[this._current++];
    }
    return "\0";
  }

  // Overload signatures
  private addToken(
    tokenType: TokenType,
    literal?: string | boolean | number | null,
    lexemeOverride?: string
  ): void;

  // Single implementation
  private addToken(
    tokenType: TokenType,
    literal: string | boolean | number | null = null,
    lexemeOverride?: string
  ): void {
    const lexeme =
      lexemeOverride ?? this._source.substring(this._start, this._current);
    this.tokens.push(new Token(tokenType, lexeme, literal, this._line));
    // this.tokens.push({
    //   type: tokenType,
    //   lexeme,
    //   literal,
    //   line: this._line,
    // });
  }

  private peek(): string {
    if (!this.isAtEnd()) {
      return this._source[this._current];
    }
    return "\0";
  }

  private peekNext(): string {
    if (!this.isAtEnd()) {
      return this._source[this._current + 1];
    }
    return "\0";
  }

  private match(expected: string): boolean {
    if (this.isAtEnd()) {
      return false;
    } else if (expected !== this._source.charAt(this._current)) {
      return false;
    }
    this._current++;
    return true;
  }

  private scanToken() {
    const c: string = this.advance();

    if (!this.isAlphaNumeric(c) && this._wordBuffer.length > 0) {
      // TODO: Process word
      this.processWord(this._wordBuffer);
      this._wordBuffer = "";
    }

    switch (c) {
      case "(":
        this.addToken(TokenType.LEFT_PAREN);
        break;
      case ")":
        this.addToken(TokenType.RIGHT_PAREN);
        break;
      case "{":
        this.addToken(TokenType.LEFT_CURLY_BRACE);
        break;
      case "}":
        this.addToken(TokenType.RIGHT_CURLY_BRACE);
        break;
      case "=":
        this.addToken(TokenType.EQUAL);
        break;
      case ",":
        this.addToken(TokenType.COMMA);
        break;
      case ">":
        this.addToken(
          this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER
        );
        break;
      case "<":
        this.addToken(this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case ";":
        this.addToken(TokenType.SEMICOLON);
        break;
      case "+":
        this.addToken(TokenType.PLUS);
        break;
      case "-":
        this.addToken(TokenType.MINUS);
        break;
      case "*":
        this.addToken(TokenType.STAR);
        break;
      case "/":
        if (this.match("/")) {
          if (this._wordBuffer.length > 0) {
            // TODO: Process word
            this.processWord(this._wordBuffer);
            this._wordBuffer = "";
          }
          while (!this.isAtEnd() && this.peek() !== "\n") {
            this.advance();
          }
        } else {
          this.addToken(TokenType.SLASH);
        }
        break;
      case "!":
        if (this.match("=")) {
          this.addToken(TokenType.BANG_EQUAL);
        } else {
          this.addToken(TokenType.BANG);
        }
        break;

      case " ":
      case "\r":
      case "\t":
        break;
      case "\n":
        if (this._wordBuffer.length > 0) {
          // TODO: Process word
          this.processWord(this._wordBuffer);
          this._wordBuffer = "";
        }
        this._line++;
        break;

      case "'":
      case '"':
        this.stringLiteral(c);
        break;

      default:
        // TODO: handle Identifier, Literal, Strings
        if (this.isDigit(c)) {
          this.number();
        } else if (this.isAlphaNumeric(c)) {
          this._wordBuffer += c;
        } else {
          if (this._wordBuffer.length > 0) {
            this.processWord(this._wordBuffer);
            this._wordBuffer = "";
          }

          this.handleError(this._line, `Unexpected character '${c}'`, c);
        }

        break;
    }
  }

  private stringLiteral(quote: string): void {
    while (this.peek() !== quote && !this.isAtEnd()) {
      if (this.peek() === "\n") this._line++;
      this.advance();
    }
    if (this.isAtEnd()) {
      this.handleError(
        this._line,
        "Unterminated string",
        this._source.substring(this._start, this._current)
      );
      return;
    }
    this.advance();

    const value: string = this._source.substring(
      this._start + 1,
      this._current - 1
    );

    const lexeme: string = this._source.substring(this._start, this._current);

    this.addToken(TokenType.STRING, value, lexeme);
  }

  private readNextWord(): string | null {
    while (!this.isAtEnd() && this.isWhiteSpace(this.peek())) {
      if (this.peek() === "\n") this._line++;
      this.advance();
    }

    const wordStart: number = this._current;

    while (!this.isAtEnd() && this.isAlphaNumeric(this.peek())) {
      this.advance();
    }
    const nextWord: string | null = this._source
      .substring(wordStart, this._current)
      .trim();
    return nextWord || null;
  }

  private processWord(word: string): void {
    word = word.trim();
    if (!word) {
      return;
    }

    for (const key in multikeywords) {
      const keyWords = key.split(" ");
      if (word === keyWords[0]) {
        const collected: string[] = [word];
        let matchFailed: boolean = false;

        for (let i = 1; i < keyWords.length; i++) {
          const nextWord = this.readNextWord();
          if (!nextWord || nextWord !== keyWords[i]) {
            matchFailed = true;
            if (nextWord) {
              this._wordBuffer = nextWord;
              break;
            }
          }
          if (nextWord) {
            collected.push(nextWord);
          }
        }
        if (!matchFailed) {
          // const lexeme = collected.join(" ");
          // this.addToken(multikeywords[key]);
          this.addToken(multikeywords[key], null, collected.join(" "));
          return;
        }
      }
    }

    if (keywords[word]) {
      this.addToken(keywords[word], null, word);
    } else {
      this.addToken(TokenType.IDENTIFIER, null, word.trim());
    }
  }

  private number(): void {
    while (this.isDigit(this.peek())) {
      this.advance();
    }
    if (this.peek() === "." && this.isDigit(this.peekNext())) {
      this.advance();
      while (this.isDigit(this.peek())) {
        this.advance();
      }
    }
    const value = Number.parseFloat(
      this._source.substring(this._start, this._current)
    );
    this.addToken(TokenType.NUMBER, value);
  }

  private isDigit(c: string): boolean {
    if (c >= "0" && c <= "9") {
      return true;
    }
    return false;
  }

  private isAlpha(c: string): boolean {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c == "_";
  }

  private isAlphaNumeric(c: string): boolean {
    return this.isDigit(c) || this.isAlpha(c);
  }

  private isWhiteSpace(c: string): boolean {
    return c === "\r" || c === "\t" || c === " " || c === "\n";
  }
}
