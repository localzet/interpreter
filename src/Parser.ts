import { TokenType } from './Lexer';
import type {
    Token, ASTNode, ProgramNode, StatementNode, ExpressionNode, ClassDeclarationNode,
    FunctionDeclarationNode, VariableAssignmentNode, ModuleImportNode, IdentifierNode,
    LiteralNode, PropertyNode
} from './types';

export class Parser {
    private tokens: Token[];
    private current = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    public parse(): ProgramNode {
        let ast: ProgramNode = { type: 'Program', body: [] };
        while (!this.isAtEnd()) {
            ast.body.push(this.statement());
        }
        return ast;
    }

    private statement(): StatementNode {
        if (this.match(TokenType.XMLTag)) {
            return this.xmlStatement();
        } else if (this.match(TokenType.PHPVariable)) {
            return this.variableDeclaration();
        } else if (this.match(TokenType.Identifier)) {
            return this.requireStatement();
        } else {
            throw new Error("Unexpected token");
        }
    }

    private xmlStatement(): ClassDeclarationNode | FunctionDeclarationNode {
        // Assuming that the XML tag is either a class or function declaration
        const nameToken = this.consume(TokenType.Identifier, "Expect class or function name.");
        const name: IdentifierNode = { type: 'Identifier', name: nameToken.value as string };

        if (this.match(TokenType.Identifier)) {
            // If the next token is an identifier, it's a function declaration
            const params: IdentifierNode[] = [];
            while (this.match(TokenType.Identifier)) {
                const paramToken = this.consume(TokenType.Identifier, "Expect parameter name.");
                params.push({ type: 'Identifier', name: paramToken.value as string });
            }
            const body: StatementNode[] = []; // Create an array to hold the body statements
            while (!this.check(TokenType.Identifier)) { // Assuming Identifier token indicates end of function body
                body.push(this.statement()); // Recursively parse the function body
            }

            return {
                type: 'FunctionDeclaration',
                name,
                params,
                body,
            };
        } else {
            // Otherwise, it's a class declaration
            const properties: PropertyNode[] = [];
            while (this.match(TokenType.Identifier)) {
                properties.push(this.propertyDeclaration());
            }

            return {
                type: 'ClassDeclaration',
                name,
                properties,
                methods: [], // For simplicity, assume there are no methods
            };
        }
    }

    private propertyDeclaration(): PropertyNode {
        const nameToken = this.consume(TokenType.Identifier, "Expect property name.");
        const name: IdentifierNode = { type: 'Identifier', name: nameToken.value as string };
        const value = this.expression(); // Parse the property value as an expression

        return {
            type: 'Property',
            name,
            value,
        };
    }

    private variableDeclaration(): VariableAssignmentNode {
        const nameToken = this.consume(TokenType.Identifier, "Expect variable name.");
        const name: IdentifierNode = { type: 'Identifier', name: nameToken.value as string };
        const value = this.expression(); // Parse the variable value as an expression

        return {
            type: 'VariableAssignment',
            name,
            value,
        };
    }

    private requireStatement(): ModuleImportNode {
        const moduleNameToken = this.consume(TokenType.Identifier, "Expect module name.");
        const moduleName = moduleNameToken.value as string;

        return {
            type: 'ModuleImport',
            moduleName,
        };
    }

    private expression(): ExpressionNode {
        // For simplicity, assume that an expression is either a literal or an identifier
        if (this.match(TokenType.Identifier)) {
            const nameToken = this.consume(TokenType.Identifier, "Expect identifier.");
            return {
                type: 'Identifier',
                name: nameToken.value as string,
            };
        } else {
            const literalToken = this.consume(TokenType.Number, "Expect literal.");
            return {
                type: 'Literal',
                value: literalToken.value,
            };
        }
    }

    private match(...types: TokenType[]): boolean {
        if (this.isAtEnd()) return false;
        for (let type of types) {
            if (this.tokens[this.current].type === type) return true;
        }
        return false;
    }

    private consume(type: TokenType, message: string): Token {
        if (this.match(type)) return this.advance();
        throw new Error(message);
    }

    private advance(): Token {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    private isAtEnd(): boolean {
        return this.current >= this.tokens.length;
    }

    private previous(): Token {
        return this.tokens[this.current - 1];
    }

    private check(...types: TokenType[]): boolean {
        if (this.isAtEnd()) return false;
        for (let type of types) {
            if (this.tokens[this.current + 1].type === type) return true;
        }
        return false;
    }
}