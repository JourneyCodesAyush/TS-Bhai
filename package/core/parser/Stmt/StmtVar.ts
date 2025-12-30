import { Token } from "../../lexer/index";
import { Expr } from "../Expr/index";
import { Stmt } from "./Stmt";
import type { StmtVisitor } from "./StmtVisitor";

export class StmtVar extends Stmt {
  name: Token;
  initializer: Expr | null;

  constructor(name: Token, initializer: Expr | null) {
    super();
    this.name = name;
    this.initializer = initializer;
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitVarStmt(this);
  }
}
