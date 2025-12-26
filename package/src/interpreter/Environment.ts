import { Value } from "./Value";
import { Token } from "../lexer/index";
import { RuntimeError } from "./RuntimeError";

export class Environment {
  public values: Map<string, Value> = new Map();
  private _enclosing?: Environment;
  constructor(enclosing?: Environment) {
    this.values = new Map();
    this._enclosing = enclosing;
  }

  define(name: Token, value: Value): void {
    this.values.set(name.getLexeme(), value);
  }

  assign(name: Token, value: Value): void {
    if (this.values.has(name.getLexeme())) {
      this.values.set(name.getLexeme(), value);
      return;
    }
    if (this._enclosing !== null) {
      this._enclosing?.assign(name, value);
      return;
    }
    throw new RuntimeError(name, `Undefined variable '${name.getLexeme()}'.`);
  }

  get(name: Token): Value {
    if (this.values.has(name.getLexeme())) {
      const value = this.values.get(name.getLexeme());
      if (value !== undefined) {
        return value;
      }
    }
    throw new RuntimeError(name, `Undefined variable ${name.getLexeme()}`);
  }
}
