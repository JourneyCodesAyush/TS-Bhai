import { TokenType } from "./TokenType";

export class Token {
  private _type: TokenType;
  private _lexeme: string;
  private _literal: string | boolean | number | null;
  private _line: number;

  public constructor(
    type: TokenType,
    lexeme: string,
    literal: string | boolean | number | null,
    line: number
  ) {
    this._type = type;
    this._lexeme = lexeme;
    this._literal = literal;
    this._line = line;
  }

  public toString(): string {
    return `${this._type} ${this._lexeme} ${this._literal}`;
  }

  public toDebug(): string {
    return `{
  type: ${this._type},
  lexeme: "${this._lexeme}",
  literal: ${this._literal},
  line: ${this._line}
}`;
  }

  public getType(): TokenType {
    return this._type;
  }
  public getLexeme(): string {
    return this._lexeme;
  }
  public getLiteral(): string | boolean | number | null {
    return this._literal;
  }
  public getLine(): number {
    return this._line;
  }
}
