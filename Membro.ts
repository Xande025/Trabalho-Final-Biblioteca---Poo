import { Pessoa } from './Pessoa';

export class Membro extends Pessoa {
    private _matricula: string;
  
    constructor(nome: string, endereco: string, telefone: string, matricula: string) {
        super(nome, endereco, telefone);
        this._matricula = matricula;
    }
  
    //Get para pegar o atributo
    getMatricula(): string {
        return this._matricula;
    }
    //Set permite alterar
    setMatricula(matricula: string): void {
        this._matricula = matricula;
    }

    toCSV(): string {
        return `${super.toCSV()},${this._matricula}`;
    }
    
    static fromCSV(csv: string): Membro {
        const [nome, endereco, telefone, matricula] = csv.split(',');
        return new Membro(nome, endereco, telefone, matricula);
    }
}
