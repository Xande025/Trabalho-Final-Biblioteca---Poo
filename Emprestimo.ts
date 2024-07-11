import { Livro } from './Livro';
import { Membro } from './Membro';

//Valida a data
function isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
}

//Ao criar emprestimno a dataDevolução recebe NULO, só quando a devolução é registrada que ele recebe um DATE
export class Emprestimo {
    private livro: Livro;
    private membro: Membro;
    private dataEmprestimo: Date;
    private dataPrevistaDevolucao: Date;
    private dataDevolucao: Date | null;

    constructor(livro: Livro, membro: Membro, dataEmprestimo: Date, dataPrevistaDevolucao: Date) {
        if (!livro || !membro) {
            throw new Error('Livro ou Membro inválido');
        }
        this.livro = livro;
        this.membro = membro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
        this.dataDevolucao = null;
    }

    getLivro(): Livro {
        return this.livro;
    }

    setLivro(livro: Livro): void {
        this.livro = livro;
    }

    getMembro(): Membro {
        return this.membro;
    }

    setMembro(membro: Membro): void {
        this.membro = membro;
    }

    getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    getDataPrevistaDevolucao(): Date {
        return this.dataPrevistaDevolucao;
    }

    setDataPrevistaDevolucao(dataPrevistaDevolucao: Date): void {
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
    }

    getDataDevolucao(): Date | null {
        return this.dataDevolucao;
    }

    devolverLivro(): void {
        this.dataDevolucao = new Date();
    }

    toCSV(): string {
        if (!this.livro) {
            throw new Error('Livro está indefinido');
        }
        if (!this.membro) {
            throw new Error('Membro está indefinido');
        }

        const dataEmprestimoStr = this.dataEmprestimo && isValidDate(this.dataEmprestimo) ? this.dataEmprestimo.toISOString() : '';
        const dataPrevistaDevolucaoStr = this.dataPrevistaDevolucao && isValidDate(this.dataPrevistaDevolucao) ? this.dataPrevistaDevolucao.toISOString() : '';
        const dataDevolucaoStr = this.dataDevolucao && isValidDate(this.dataDevolucao) ? this.dataDevolucao.toISOString() : '';
        return `${this.livro.getISBN()},${this.membro.getMatricula()},${dataEmprestimoStr},${dataPrevistaDevolucaoStr},${dataDevolucaoStr}`;
    }

    static fromCSV(csv: string, livros: Livro[], membros: Membro[]): Emprestimo {
        const [isbn, matricula, dataEmprestimo, dataPrevistaDevolucao, dataDevolucao] = csv.split(',');
        const livro = livros.find(l => l.getISBN() === isbn);
        const membro = membros.find(m => m.getMatricula() === matricula);

        if (!livro) {
            throw new Error(`Livro com ISBN ${isbn} não encontrado`);
        }
        if (!membro) {
            throw new Error(`Membro com matrícula ${matricula} não encontrado`);
        }

        const emprestimo = new Emprestimo(livro, membro, new Date(dataEmprestimo), new Date(dataPrevistaDevolucao));
        if (dataDevolucao) {
            emprestimo.dataDevolucao = new Date(dataDevolucao);
        }
        return emprestimo;
    }
}
