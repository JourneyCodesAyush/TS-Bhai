import { Expr } from "../Expr/Expr";
import { Stmt } from "./Stmt";
import type { StmtVisitor } from "./StmtVisitor";

export class StmtIf extends Stmt {
  condition: Expr;
  thenBranch: Stmt;
  elseIfConditions: Expr[];
  elseIfBranches: Stmt[];
  elseBranch: Stmt | null;

  constructor(
    condition: Expr,
    thenBranch: Stmt,
    elseIfConditions: Expr[],
    elseIfBranches: Stmt[],
    elseBranch: Stmt | null
  ) {
    super();
    this.condition = condition;
    this.thenBranch = thenBranch;
    this.elseIfConditions = elseIfConditions;
    this.elseIfBranches = elseIfBranches;
    this.elseBranch = elseBranch;
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitIfStmt(this);
  }
}
