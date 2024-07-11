class Pessoa {
    constructor(
        private nome: string,
        private endereco: string,
        private telefone: string
    ) {}

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    public toString(): string {
        return `Nome: ${this.nome}, Endereço: ${this.endereco}, Telefone: ${this.telefone}`;
    }
      
    toCSV(): string {
        return `${this.nome},${this.endereco},${this.telefone}`;
      }
    
      static fromCSV(csv: string): Pessoa {
        const [nome, endereco, telefone] = csv.split(',');
        return new Pessoa(nome, endereco, telefone);
      }
}

export { Pessoa };
