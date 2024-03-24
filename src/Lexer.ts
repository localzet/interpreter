import type { Token } from './types';

export class Lexer {
    private regex = /\s*(=>|{|}|<|>|<\/|\/>|::|\$|[A-Za-z_][A-Za-z_0-9]*|\d+|\S)\s*/g;

    public tokenize(code: string): Token[] {
        let result: Token[] = [];
        let match;
        while (match = this.regex.exec(code)) {
            let token: Token;
            if (match[1] === '<' || match[1] === '>' || match[1] === '</' || match[1] === '/>') {
                token = { type: TokenType.XMLTag, value: match[1] };
            } else if (match[1] === '::') {
                token = { type: TokenType.TypeScriptNamespace, value: match[1] };
            } else if (match[1] === '$') {
                token = { type: TokenType.PHPVariable, value: match[1] };
            } else if (!isNaN(Number(match[1]))) {
                token = { type: TokenType.Number, value: Number(match[1]) };
            } else {
                token = { type: TokenType.Identifier, value: match[1] };
            }
            result.push(token);
        }
        return result;
    }
}

export enum TokenType {
    XMLTag = 'XMLTag',
    TypeScriptNamespace = 'TypeScriptNamespace',
    PHPVariable = 'PHPVariable',
    Number = 'Number',
    Identifier = 'Identifier',
}