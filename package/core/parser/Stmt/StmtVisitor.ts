// import type { Stmt } from "./Stmt";
import type { StmtBlock } from "./StmtBlock";
import type { StmtExpr } from "./StmtExpression";
import type { StmtIf } from "./StmtIf";
import type { StmtPrint } from "./StmtPrint";
import type { StmtVar } from "./StmtVar";
import type { StmtWhile } from "./StmtWhile";
import type { StmtBreak } from "./StmtBreak";
import type { StmtContinue } from "./StmtContinue";

export interface StmtVisitor<R> {
  visitBlockStmt(node: StmtBlock): R;
  visitExpressionStmt(node: StmtExpr): R;
  visitIfStmt(node: StmtIf): R;
  visitPrintStmt(node: StmtPrint): R;
  visitVarStmt(node: StmtVar): R;
  visitWhileStmt(node: StmtWhile): R;
  visitBreakStmt(node: StmtBreak): R;
  visitContinueStmt(node: StmtContinue): R;
}
