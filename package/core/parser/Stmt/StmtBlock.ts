import { Stmt } from "./Stmt";
import type { StmtVisitor } from "./StmtVisitor";

export class StmtBlock extends Stmt {
  statements: Stmt[];

  constructor(statements: Stmt[]) {
    super();
    this.statements = statements;
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitBlockStmt(this);
  }
}
