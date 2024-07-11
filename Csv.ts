import { promises as fs } from 'fs';
import { Livro } from './Livro';
import { Membro } from './Membro';
import { Emprestimo } from './Emprestimo';
import { readFile } from 'fs/promises';

const LIVROS_CSV_PATH = './livros.csv';
const MEMBROS_CSV_PATH = './membros.csv';
const EMPRESTIMOS_CSV_PATH = './emprestimos.csv';

async function salvarLivros(livros: Livro[]): Promise<void> {
    const linhas = livros.map(livro => livro.toCSV());
    await fs.writeFile(LIVROS_CSV_PATH, linhas.join('\n'));
}

async function carregarLivros(): Promise<Livro[]> {
    try {
        const data = await readFile(LIVROS_CSV_PATH, 'utf8');
        const linhas = data.split('\n');
        const livros: Livro[] = [];

        for (const linha of linhas) {
            if (linha.trim()) {
                const livro = Livro.fromCSV(linha);
                livros.push(livro);
            }
        }

        return livros;
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
        return [];
    }
}

async function salvarMembros(membros: Membro[]): Promise<void> {
    const linhas = membros.map(membro => membro.toCSV());
    await fs.writeFile(MEMBROS_CSV_PATH, linhas.join('\n'));
}

async function carregarMembros(): Promise<Membro[]> {
    try {
        const data = await fs.readFile(MEMBROS_CSV_PATH, 'utf-8');
        return data.split('\n').map(Membro.fromCSV);
    } catch (error) {
        return [];
    }
}

async function salvarEmprestimos(emprestimos: Emprestimo[]): Promise<void> {
    const linhas = emprestimos.map(emprestimo => {
        try {
            return emprestimo.toCSV();
        } catch (error) {
            console.error('Erro ao converter empréstimo para CSV:', error);
            throw error;
        }
    });

    await fs.writeFile(EMPRESTIMOS_CSV_PATH, linhas.join('\n'));
}

async function carregarEmprestimos(livros: Livro[], membros: Membro[]): Promise<Emprestimo[]> {
    try {
        const data = await fs.readFile(EMPRESTIMOS_CSV_PATH, 'utf-8');
        return data.split('\n').map(line => Emprestimo.fromCSV(line, livros, membros));
    } catch (error) {
        console.error('Erro ao carregar empréstimos:', error);
        return [];
    }
}

export {
    salvarLivros,
    carregarLivros,
    salvarMembros,
    carregarMembros,
    salvarEmprestimos,
    carregarEmprestimos
};
