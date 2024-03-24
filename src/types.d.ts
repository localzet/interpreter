import { TokenType } from './Lexer';

export type Token = {
    type: TokenType;
    value: string | number;
};

export type ASTNode = {
    type: string;
    children?: ASTNode[];
};

export type ProgramNode = ASTNode & {
    type: 'Program';
    body: StatementNode[];
};

export type StatementNode = FunctionDeclarationNode | ClassDeclarationNode | VariableAssignmentNode | EchoStatementNode | ReturnStatementNode | LoopStatementNode | ConditionalStatementNode | TryStatementNode | ModuleImportNode;

export type ExpressionNode = BinaryExpressionNode | UnaryExpressionNode | ConditionalExpressionNode | ArrayExpressionNode | ObjectExpressionNode | CallExpressionNode | MemberExpressionNode | IdentifierNode | LiteralNode;

export type FunctionDeclarationNode = ASTNode & {
    type: 'FunctionDeclaration';
    name: IdentifierNode;
    params: IdentifierNode[];
    body: StatementNode[];
};

export type ClassDeclarationNode = ASTNode & {
    type: 'ClassDeclaration';
    name: IdentifierNode;
    properties: PropertyNode[];
    methods: FunctionDeclarationNode[];
};

export type PropertyNode = ASTNode & {
    type: 'Property';
    name: IdentifierNode;
    value: ExpressionNode;
};

export type VariableAssignmentNode = ASTNode & {
    type: 'VariableAssignment';
    name: IdentifierNode;
    value: ExpressionNode;
};

export type ModuleImportNode = ASTNode & {
    type: 'ModuleImport';
    moduleName: string;
};

export type EchoStatementNode = ASTNode & {
    type: 'EchoStatement';
    expressions: ExpressionNode[];
};

export type ReturnStatementNode = ASTNode & {
    type: 'ReturnStatement';
    argument: ExpressionNode;
};

export type BinaryExpressionNode = ASTNode & {
    type: 'BinaryExpression';
    operator: string;
    left: ExpressionNode;
    right: ExpressionNode;
};

export type UnaryExpressionNode = ASTNode & {
    type: 'UnaryExpression';
    operator: string;
    argument: ExpressionNode;
};

export type ConditionalExpressionNode = ASTNode & {
    type: 'ConditionalExpression';
    test: ExpressionNode;
    consequent: ExpressionNode;
    alternate: ExpressionNode;
};

export type ArrayExpressionNode = ASTNode & {
    type: 'ArrayExpression';
    elements: ExpressionNode[];
};

export type ObjectExpressionNode = ASTNode & {
    type: 'ObjectExpression';
    properties: PropertyNode[];
};

export type CallExpressionNode = ASTNode & {
    type: 'CallExpression';
    callee: ExpressionNode;
    arguments: ExpressionNode[];
};

export type MemberExpressionNode = ASTNode & {
    type: 'MemberExpression';
    object: ExpressionNode;
    property: ExpressionNode;
};

export type IdentifierNode = ASTNode & {
    type: 'Identifier';
    name: string;
};

export type LiteralNode = ASTNode & {
    type: 'Literal';
    value: string | number | boolean | null;
};

export type LoopStatementNode = ASTNode & {
    type: 'LoopStatement';
    init: ExpressionNode;
    test: ExpressionNode;
    update: ExpressionNode;
    body: StatementNode;
};

export type ConditionalStatementNode = ASTNode & {
    type: 'ConditionalStatement';
    test: ExpressionNode;
    consequent: StatementNode;
    alternate: StatementNode;
};

export type TryStatementNode = ASTNode & {
    type: 'TryStatement';
    block: StatementNode;
    handler: CatchClauseNode;
};

export type CatchClauseNode = ASTNode & {
    type: 'CatchClause';
    param: IdentifierNode;
    body: StatementNode;
};

export type AST = ProgramNode;
