import type { ASTNode, ProgramNode, ClassDeclarationNode, FunctionDeclarationNode, VariableAssignmentNode, ModuleImportNode, ExpressionNode, IdentifierNode, LiteralNode } from './types';

export class Interpreter {
    private variables: { [name: string]: any } = {};

    public interpret(ast: ASTNode): any {
        switch (ast.type) {
            case 'Program':
                return this.interpretProgram(ast as ProgramNode);
            case 'ClassDeclaration':
                return this.interpretClassDeclaration(ast as ClassDeclarationNode);
            case 'FunctionDeclaration':
                return this.interpretFunctionDeclaration(ast as FunctionDeclarationNode);
            case 'VariableAssignment':
                return this.interpretVariableAssignment(ast as VariableAssignmentNode);
            case 'ModuleImport':
                return this.interpretModuleImport(ast as ModuleImportNode);
            case 'Identifier':
                return this.interpretIdentifier(ast as IdentifierNode);
            case 'Literal':
                return this.interpretLiteral(ast as LiteralNode);
            // Add more cases for other node types
            default:
                throw new Error(`Unknown node type: ${ast.type}`);
        }
    }

    private interpretProgram(node: ProgramNode): any {
        let result;
        for (const child of node.body) {
            result = this.interpret(child);
        }
        return result;
    }

    private interpretClassDeclaration(node: ClassDeclarationNode): any {
        // For simplicity, we'll just store the class declaration in the variables map
        this.variables[node.name.name] = node;
        return node;
    }

    private interpretFunctionDeclaration(node: FunctionDeclarationNode): any {
        // For simplicity, we'll just store the function declaration in the variables map
        this.variables[node.name.name] = node;
        return node;
    }

    private interpretVariableAssignment(node: VariableAssignmentNode): any {
        const name = node.name.name;
        const value = this.interpret(node.value);
        this.variables[name] = value;
        return value;
    }

    private interpretModuleImport(node: ModuleImportNode): any {
        // For simplicity, we'll just store the module import in the variables map
        this.variables[node.moduleName] = node;
        return node;
    }

    private interpretIdentifier(node: IdentifierNode): any {
        if (!(node.name in this.variables)) {
            throw new Error(`Undefined variable '${node.name}'`);
        }
        return this.variables[node.name];
    }

    private interpretLiteral(node: LiteralNode): any {
        return node.value;
    }
}
