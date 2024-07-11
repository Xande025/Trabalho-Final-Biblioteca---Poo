import { Membro } from './Membro';


//Eu espero que quando eu pegar o atributo do Membro ele retorne o atributo no qual eu selecionei
describe('Membro', () => {
  it('Cria Membro', () => {
    const membro = new Membro('Nome', 'Endereço', 'Telefone', 'Matricula');
    expect(membro.getNome()).toBe('Nome');
    expect(membro.getEndereco()).toBe('Endereço');
    expect(membro.getTelefone()).toBe('Telefone');
    expect(membro.getMatricula()).toBe('Matricula');
  });

  //Pega o atributo nome e  altera, e então eu espero que ao pegar nome do membro ele seja o novo nome
  it('deve permitir atualizar o nome', () => {
    const membro = new Membro('Nome', 'Endereço', 'Telefone', 'Matricula');
    membro.setNome('Novo Nome');
    expect(membro.getNome()).toBe('Novo Nome');
  });

  it('Push para o CSV', () => {
    const membro = new Membro('Nome', 'Endereço', 'Telefone', 'Matricula');
    expect(membro.getNome()).toBe('Nome');
    expect(membro.getEndereco()).toBe('Endereço');
    expect(membro.getTelefone()).toBe('Telefone');
    expect(membro.getMatricula()).toBe('Matricula');
  });
});
