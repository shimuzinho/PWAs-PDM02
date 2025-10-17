import { openDB } from 'idb';

let db;

function showResult(text) {
    document.getElementById('output').innerHTML = text;
}

async function createDB() {
    try {
        db = await openDB('banco', 1, {
            upgrade(db, oldVersion, newVersion, transaction) {
                switch(oldVersion){
                    case 0:
                    case 1:
                        const store = db.createObjectStore('pessoas', {
                            keyPath: 'codigo',
                        });

                        store.createIndex('id', 'id');
                        showResult('Banco de dados criado!');
                }
            }
        });
        showResult('Banco de dados aberto.');
    } catch (err) {
        showResult('Erro ao criar o banco de dados: ' + err.message);
    }
}

async function addData() {
    const codigo = document.getElementById('inputCodigo').value;
    const nome = document.getElementById('inputNome').value;
    const idade = document.getElementById('inputIdade').value;

    try {
        if (!codigo || !nome || !idade) {
            throw new Error('Todos os campos são obrigatórios!');
        }

        const tx = await db.transaction('pessoas', 'readwrite');
        const store = tx.objectStore('pessoas');
        store.add({
            codigo,
            nome,
            idade
        });

        await tx.done;
    } catch (err) {
        showResult(err.message);
    }
}

async function deleteData(pessoa) {
    try {
        const tx = await db.transaction('pessoas', 'readwrite');
        const store = tx.objectStore('pessoas');
        store.delete(pessoa.codigo);
        await tx.done;

        showResult(pessoa.nome + ' deletado(a) com sucesso.');
    } catch (err) {
        showResult(err.message);
    }
}

function handleDelete(pessoa) {
    deleteData(pessoa);
}

function criarLinhaTable(pessoa) {
    return `
        <tr>
            <td>${pessoa.codigo}</td>
            <td>${pessoa.nome}</td>
            <td>${pessoa.idade}</td>
            <td><button onclick="handleDelete(${JSON.stringify(pessoa)})">Deletar</button></td>
        </tr>
    `;
}

async function getData() {
    if (db == undefined) {
        showResult('O banco de dados está fechado.');
        return;
    }

    const tx = await db.transaction('pessoas', 'readonly');
    const store = tx.objectStore('pessoas');
    const value = await store.getAll();

    if (value) {
        showResult(`
            <table>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Funções</th>
                </tr>
                ${value.map(criarLinhaTable).join('')}
            </table>
        `);
    } else {
        showResult('Não há nenhum dado no banco!');
    }
}

window.addEventListener('DOMContentLoaded', async event => {
    createDB();
    document.getElementById('input');
    document.getElementById('btnSalvar').addEventListener('click', addData);
    document.getElementById('btnListar').addEventListener('click', getData);
});