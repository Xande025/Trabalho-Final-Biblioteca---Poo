export class Livro {
  private titulo: string;
  private autor: string;
  private isbn: string;
  private anoPublicacao: number;

  constructor(titulo: string, autor: string, isbn: string, anoPublicacao: number) {
      this.titulo = titulo;
      this.autor = autor;
      this.isbn = isbn;
      this.anoPublicacao = anoPublicacao;
  }

  getTitulo(): string {
      return this.titulo;
  }

  setTitulo(titulo: string): void {
      this.titulo = titulo;
  }

  getAutor(): string {
      return this.autor;
  }

  setAutor(autor: string): void {
      this.autor = autor;
  }

  getISBN(): string {
      return this.isbn;
  }

  setISBN(isbn: string): void {
      this.isbn = isbn;
  }

  getAnoPublicacao(): number {
      return this.anoPublicacao;
  }

  setAnoPublicacao(anoPublicacao: number): void {
      this.anoPublicacao = anoPublicacao;
  }

  toCSV(): string {
      return `${this.titulo},${this.autor},${this.isbn},${this.anoPublicacao}`;
  }

  static fromCSV(csv: string): Livro {
      const [titulo, autor, isbn, anoPublicacao] = csv.split(',');
      return new Livro(titulo, autor, isbn, parseInt(anoPublicacao, 10));
  }

  toString(): string {
      return `Título: ${this.titulo}, Autor: ${this.autor}, ISBN: ${this.isbn}, Ano de Publicação: ${this.anoPublicacao}`;
  }
}
