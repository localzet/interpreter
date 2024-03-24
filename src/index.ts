import fs from 'fs';
import { Lexer } from './Lexer';
import { Parser } from './Parser';
import { Interpreter } from './Interpreter';

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: ts-node index.ts <file>');
    process.exit(1);
}

const code = fs.readFileSync(process.argv[2], 'utf-8');
const lexer = new Lexer();
const tokens = lexer.tokenize(code);
const parser = new Parser(tokens);
const ast = parser.parse();
const interpreter = new Interpreter();
const result = interpreter.interpret(ast);


console.log(result);