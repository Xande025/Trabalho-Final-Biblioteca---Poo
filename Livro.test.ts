import { Livro } from './Livro';

describe('Livro', () => {
  it('deve criar um livro', () => {
    const livro = new Livro('Título', 'Autor', '1234567890', 2022);
    expect(livro.getTitulo()).toBe('Título');
    expect(livro.getAutor()).toBe('Autor');
    expect(livro.getISBN()).toBe('1234567890');
    expect(livro.getAnoPublicacao()).toBe(2022);
  });

  it('deve permitir atualizar o título', () => {
    const livro = new Livro('Título', 'Autor', '1234567890', 2022);
    livro.setTitulo('Novo Título');
    expect(livro.getTitulo()).toBe('Novo Título');
  });

  it('deve converter para CSV e de CSV para objeto', () => {
    const livro = new Livro('Título', 'Autor', '1234567890', 2022);
    const csv = livro.toCSV();
    const livroDoCSV = Livro.fromCSV(csv);
    expect(livroDoCSV.getTitulo()).toBe('Título');
    expect(livroDoCSV.getAutor()).toBe('Autor');
    expect(livroDoCSV.getISBN()).toBe('1234567890');
    expect(livroDoCSV.getAnoPublicacao()).toBe(2022);
  });
});
