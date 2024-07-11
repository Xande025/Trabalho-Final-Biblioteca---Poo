import readline from 'readline';
import { Livro } from './Livro';
import { Membro } from './Membro';
import { Emprestimo } from './Emprestimo';
import { carregarLivros, carregarMembros, carregarEmprestimos, salvarLivros, salvarMembros, salvarEmprestimos } from './Csv';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let livros: Livro[] = [];
let membros: Membro[] = [];
let emprestimos: Emprestimo[] = [];

async function carregarDados() {
    livros = await carregarLivros();
    membros = await carregarMembros();
    emprestimos = await carregarEmprestimos(livros, membros);
}


//Verificar se nosso objeto DATA é valido
function isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
}

//PARA SALVAR NO CSV
//asyn é de assincrono 
//await = "esperar". ele espera a função ser concluida para proseguir para proxima
async function salvarDados() {
    await salvarLivros(livros);
    await salvarMembros(membros);
    await salvarEmprestimos(emprestimos);
}

function menu(): void {
    console.log('\n==============================');
    console.log('      Sistema de Biblioteca');
    console.log('==============================');
    console.log('  Opção         Descrição');
    console.log('==============================');
    console.log('   1            Cadastro de Livros');
    console.log('   2            Cadastro de Membros');
    console.log('   3            Gerenciamento de Empréstimos');
    console.log('   4            Sair');
    console.log('==============================');
    rl.question(`Escolha uma opção: `, (opcao: string) => {
        switch (opcao) {
            case '1':
                menuLivros();
                break;
            case '2':
                menuMembros();
                break;
            case '3':
                menuEmprestimos();
                break;
            case '4':
                salvarDados().then(() => rl.close());
                break;
            default:
                console.log(`Opção inválida`);
                menu();
        }
    });
}

function menuLivros(): void {
    console.log('\n===========================');
    console.log('    Cadastro de Livros');
    console.log('===========================');
    console.log('  Opção       Descrição');
    console.log('===========================');
    console.log('   1          Adicionar Livro');
    console.log('   2          Listar Livros');
    console.log('   3          Atualizar Livro');
    console.log('   4          Remover Livro');
    console.log('   5          Voltar');
    console.log('===========================');

    rl.question(`Escolha uma opção: `, (opcao: string) => {
        switch (opcao) {
            case '1':
                adicionarLivro();
                break;
            case '2':
                listarLivros();
                break;
            case '3':
                atualizarLivro();
                break;
            case '4':
                removerLivro();
                break;
            case '5':
                menu();
                break;
            default:
                console.log(`Opção inválida`);
                menuLivros();
        }
    });
}

function adicionarLivro(): void {
    rl.question(`Título: `, (titulo: string) => {
        rl.question(`Autor: `, (autor: string) => {
            rl.question(`ISBN: `, (isbn: string) => {
                rl.question(`Ano de Publicação: `, (ano: string) => {
                    const anoPublicacao = parseInt(ano);
                    const livro = new Livro(titulo, autor, isbn, anoPublicacao);
                    livros.push(livro);
                    console.log(`Livro adicionado com sucesso!`);
                    salvarDados().then(() => menuLivros());
                });
            });
        });
    });
}

function listarLivros(): void {
    console.log(`\nLista de Livros:`);
    livros.forEach((livro, index) => {
        if (livro instanceof Livro) {
            console.log(`${index + 1}. ${livro.toString()}`);
        } else {
            console.log(`Erro: Objeto na posição ${index} não é uma instância de Livro.`);
        }
    });
    salvarDados().then(() => menuLivros());
}


function atualizarLivro(): void {
    rl.question(`Digite o número do livro que deseja atualizar: `, (numero: string) => {
        const index = parseInt(numero) - 1;
        if (index >= 0 && index < livros.length) {
            const livro = livros[index];
            rl.question(`Novo título (${livro.getTitulo()}): `, (titulo: string) => {
                if (titulo) livro.setTitulo(titulo);
                rl.question(`Novo autor (${livro.getAutor()}): `, (autor: string) => {
                    if (autor) livro.setAutor(autor);
                    rl.question(`Novo ISBN (${livro.getISBN()}): `, (isbn: string) => {
                        if (isbn) livro.setISBN(isbn);
                        rl.question(`Novo ano de publicação (${livro.getAnoPublicacao()}): `, (ano: string) => {
                            const anoPublicacao = parseInt(ano);
                            if (anoPublicacao) livro.setAnoPublicacao(anoPublicacao);
                            console.log(`Livro atualizado com sucesso!`);
                            salvarDados().then(() => menuLivros());
                        });
                    });
                });
            });
        } else {
            console.log(`Livro não encontrado`);
            salvarDados().then(() => menuLivros());
        }
    });
}

function removerLivro(): void {
    rl.question(`Digite o número do livro que deseja remover: `, (numero: string) => {
        const index = parseInt(numero) - 1;
        if (index >= 0 && index < livros.length) {
            livros.splice(index, 1);
            console.log(`Livro removido com sucesso!`);
        } else {
            console.log(`Livro não encontrado`);
        }
        salvarDados().then(() => menuLivros());
    });
}

function menuMembros(): void {
    console.log('\n===========================');
    console.log('    Cadastro de Membros');
    console.log('===========================');
    console.log('  Opção       Descrição');
    console.log('===========================');
    console.log('   1          Adicionar Membro');
    console.log('   2          Listar Membros');
    console.log('   3          Atualizar Membro');
    console.log('   4          Remover Membro');
    console.log('   5          Voltar');
    console.log('===========================');
    rl.question(`Escolha uma opção: `, (opcao: string) => {
        switch (opcao) {
            case '1':
                adicionarMembro();
                break;
            case '2':
                listarMembros();
                break;
            case '3':
                atualizarMembro();
                break;
            case '4':
                removerMembro();
                break;
            case '5':
                menu();
                break;
            default:
                console.log(`Opção inválida`);
                menuMembros();
        }
    });
}

function adicionarMembro(): void {
    rl.question(`Nome: `, (nome: string) => {
        rl.question(`Endereço: `, (endereco: string) => {
            rl.question(`Telefone: `, (telefone: string) => {
                rl.question(`Número de Matrícula: `, (matricula: string) => {
                    const membro = new Membro(nome, endereco, telefone, matricula);
                    membros.push(membro);
                    console.log(`Membro adicionado com sucesso!`);
                    salvarDados().then(() => menuMembros());
                });
            });
        });
    });
}

function listarMembros(): void {
    console.log(`\nLista de Membros:`);
    membros.forEach((membro, index) => {
        console.log(`${index + 1}. ${membro.toString()}`);
    });
    salvarDados().then(() => menuMembros());
}

function atualizarMembro(): void {
    rl.question(`Digite o número do membro que deseja atualizar: `, (numero: string) => {
        const index = parseInt(numero) - 1;
        if (index >= 0 && index < membros.length) {
            const membro = membros[index];
            rl.question(`Novo nome (${membro.getNome()}): `, (nome: string) => {
                if (nome) membro.setNome(nome);
                rl.question(`Novo endereço (${membro.getEndereco()}): `, (endereco: string) => {
                    if (endereco) membro.setEndereco(endereco);
                    rl.question(`Novo telefone (${membro.getTelefone()}): `, (telefone: string) => {
                        if (telefone) membro.setTelefone(telefone);
                        rl.question(`Nova matrícula (${membro.getMatricula()}): `, (matricula: string) => {
                            if (matricula) membro.setMatricula(matricula);
                            console.log(`Membro atualizado com sucesso!`);
                            salvarDados().then(() => menuMembros());
                        });
                    });
                });
            });
        } else {
            console.log(`Membro não encontrado`);
            salvarDados().then(() => menuMembros());
        }
    });
}

function removerMembro(): void {
    rl.question(`Digite o número do membro que deseja remover: `, (numero: string) => {
        const index = parseInt(numero) - 1;
        if (index >= 0 && index < membros.length) {
            membros.splice(index, 1);
            console.log(`Membro removido com sucesso!`);
        } else {
            console.log(`Membro não encontrado`);
        }
        salvarDados().then(() => menuMembros());
    });
}

function menuEmprestimos(): void {
    console.log('\n==============================');
    console.log('    Menu de Empréstimos');
    console.log('==============================');
    console.log('  Opção       Descrição');
    console.log('==============================');
    console.log('   1          Fazer Empréstimo');
    console.log('   2          Listar Empréstimos Ativos');
    console.log('   3          Registrar Devolução');
    console.log('   4          Histórico de Empréstimos');
    console.log('   5          Voltar ao Menu Principal');
    console.log('==============================');

    rl.question(`Escolha uma opção: `, (opcao: string) => {
        switch (opcao) {
            case '1':
                fazerEmprestimo();
                break;
            case '2':
                listarEmprestimosAtivos();
                break;
            case '3':
                registrarDevolucao();
                break;
            case '4':
                listarHistoricoEmprestimos();
                break;
            case '5':
                menu();
                break;
            default:
                console.log(`Opção inválida`);
                menuEmprestimos();
        }
    });
}

function fazerEmprestimo(): void {
    rl.question(`ISBN do Livro: `, (isbn: string) => {
        const livro = livros.find(l => l.getISBN() === isbn);
        if (livro) {
            rl.question(`Matrícula do Membro: `, (matricula: string) => {
                const membro = membros.find(m => m.getMatricula() === matricula);
                if (membro) {
                    rl.question(`Data de Empréstimo (YYYY-MM-DD): `, (dataEmprestimoStr: string) => {
                        const dataEmprestimo = new Date(dataEmprestimoStr);
                        if (!isValidDate(dataEmprestimo)) {
                            console.log('Data de empréstimo inválida');
                            menuEmprestimos();
                            return;
                        }
                        rl.question(`Data Prevista de Devolução (YYYY-MM-DD): `, (dataPrevistaStr: string) => {
                            const dataPrevistaDevolucao = new Date(dataPrevistaStr);
                            if (!isValidDate(dataPrevistaDevolucao)) {
                                console.log('Data prevista de devolução inválida');
                                menuEmprestimos();
                                return;
                            }
                            const emprestimo = new Emprestimo(livro, membro, dataEmprestimo, dataPrevistaDevolucao);
                            emprestimos.push(emprestimo);
                            salvarEmprestimos(emprestimos).then(() => {
                                console.log('Empréstimo salvo no arquivo.');
                                menuEmprestimos();
                            }).catch((error) => {
                                console.error('Erro ao salvar empréstimo:', error);
                                menuEmprestimos();
                            });
                        });
                    });
                } else {
                    console.log('Membro não encontrado');
                    menuEmprestimos();
                }
            });
        } else {
            console.log('Livro não encontrado');
            menuEmprestimos();
        }
    });
}

// tenta carregar os dados de livros, membros e empréstimos
carregarDados().then(menu).catch(error => {
    console.error('Erro ao carregar dados:', error);
});


function listarEmprestimosAtivos(): void {
    console.log(`\nEmpréstimos Ativos:`);
    if (emprestimos.length === 0) {
        console.log('Nenhum empréstimo ativo.');
    } else {
        emprestimos.forEach((emprestimo, index) => {
            const livro = emprestimo.getLivro();
            const membro = emprestimo.getMembro();
            const dataEmprestimo = emprestimo.getDataEmprestimo();
            const dataPrevistaDevolucao = emprestimo.getDataPrevistaDevolucao();
            const dataDevolucao = emprestimo.getDataDevolucao();
            if (!dataDevolucao) {
                console.log(`${index + 1}. Livro: ${livro.getTitulo()}, Membro: ${membro.getNome()}, Data de Empréstimo: ${dataEmprestimo.toDateString()}, Data Prevista de Devolução: ${dataPrevistaDevolucao.toDateString()}`);
            }
        });
    }
    menuEmprestimos();
}


function registrarDevolucao(): void {
    rl.question(`ISBN do Livro: `, (isbn: string) => {
        const emprestimo = emprestimos.find(e => e.getLivro().getISBN() === isbn && e.getDataDevolucao() === null);
        if (emprestimo) {
            emprestimo.devolverLivro();
            salvarEmprestimos(emprestimos).then(() => {
                console.log('Devolução registrada com sucesso.');
                menuEmprestimos();
            }).catch((error) => {
                console.error('Erro ao registrar devolução:', error);
                menuEmprestimos();
            });
        } else {
            console.log('Empréstimo não encontrado ou já devolvido.');
            menuEmprestimos();
        }
    });
}


function listarHistoricoEmprestimos(): void {
    console.log(`\nHistórico de Empréstimos:`);
    if (emprestimos.length === 0) {
        console.log('Nenhum empréstimo registrado.');
    } else {
        emprestimos.forEach((emprestimo, index) => {
            const livro = emprestimo.getLivro();
            const membro = emprestimo.getMembro();
            const dataEmprestimo = emprestimo.getDataEmprestimo();
            const dataPrevistaDevolucao = emprestimo.getDataPrevistaDevolucao();
            const dataDevolucao = emprestimo.getDataDevolucao();
            const devolvido = dataDevolucao ? `, Devolvido em: ${dataDevolucao.toDateString()}` : `, Não devolvido`;
            console.log(`${index + 1}. Livro: ${livro.getTitulo()}, Membro: ${membro.getNome()}, Data de Empréstimo: ${dataEmprestimo.toDateString()}, Data Prevista de Devolução: ${dataPrevistaDevolucao.toDateString()}${devolvido}`);
        });
    }
    menuEmprestimos();
}

