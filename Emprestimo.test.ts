import { Livro } from './Livro';
import { Membro } from './Membro';
import { Emprestimo } from './Emprestimo';

describe('Emprestimo', () => {
  const livro = new Livro('Título', 'Autor', '1234567890', 2022);
  const membro = new Membro('Nome', 'Endereço', 'Telefone', 'Matricula');

  it('deve criar um empréstimo', () => {
    const dataEmprestimo = new Date(2022, 5, 20);
    const dataPrevistaDevolucao = new Date(2022, 5, 27);
    const emprestimo = new Emprestimo(livro, membro, dataEmprestimo, dataPrevistaDevolucao);
    expect(emprestimo.getLivro()).toBe(livro);
    expect(emprestimo.getMembro()).toBe(membro);
    expect(emprestimo.getDataEmprestimo()).toEqual(dataEmprestimo);
    expect(emprestimo.getDataPrevistaDevolucao()).toEqual(dataPrevistaDevolucao);
    expect(emprestimo.getDataDevolucao()).toBeNull();
  });

  it('deve registrar a devolução de um livro', () => {
    const dataEmprestimo = new Date(2022, 5, 20);
    const dataPrevistaDevolucao = new Date(2022, 5, 27);
    const emprestimo = new Emprestimo(livro, membro, dataEmprestimo, dataPrevistaDevolucao);
    emprestimo.devolverLivro();
    expect(emprestimo.getDataDevolucao()).toBeInstanceOf(Date);
  });

  it('deve converter para CSV e de CSV para objeto', () => {
    const dataEmprestimo = new Date(2022, 5, 20);
    const dataPrevistaDevolucao = new Date(2022, 5, 27);
    const emprestimo = new Emprestimo(livro, membro, dataEmprestimo, dataPrevistaDevolucao);
    const csv = emprestimo.toCSV();
    const emprestimoDoCSV = Emprestimo.fromCSV(csv, [livro], [membro]);
    expect(emprestimoDoCSV.getLivro().getISBN()).toBe('1234567890');
    expect(emprestimoDoCSV.getMembro().getMatricula()).toBe('Matricula');
    expect(emprestimoDoCSV.getDataEmprestimo()).toEqual(dataEmprestimo);
    expect(emprestimoDoCSV.getDataPrevistaDevolucao()).toEqual(dataPrevistaDevolucao);
  });
});
