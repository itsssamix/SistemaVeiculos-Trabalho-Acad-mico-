const API_URL = 'http://localhost:3000/veiculos';

function adicionarVeiculo() {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const cor = document.getElementById('cor').value;
    const preco = document.getElementById('preco').value;
    const km = document.getElementById('km').value;
    const status = document.getElementById('status').value;

    if (marca && modelo && ano && cor && preco && km) {
        const veiculo = { marca, modelo, ano, cor, preco, km, status };
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(veiculo)
        })
            .then(() => {
                limparFormulario();
                atualizarTabela();
            });
    } else {
        alert('Preencha todos os campos!');
    }
}

function limparFormulario() {
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('ano').value = '';
    document.getElementById('cor').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('km').value = '';
    document.getElementById('status').value = 'Disponível';
}

function atualizarTabela() {
    const tbody = document.querySelector('#tabela tbody');
    tbody.innerHTML = '';

    fetch(API_URL)
        .then(res => res.json())
        .then(veiculos => {
            veiculos.forEach(veiculo => {
                const row = tbody.insertRow();
                row.innerHTML = `
                <td>${veiculo.marca}</td>
                <td>${veiculo.modelo}</td>
                <td>${veiculo.ano}</td>
                <td>${veiculo.cor}</td>
                <td>R$ ${veiculo.preco}</td>
                <td>${veiculo.km} km</td>
                <td>${veiculo.status}</td>
                <td><button onclick="removerVeiculo(${veiculo.id})">Remover</button></td>
            `;
            });
        });
}

function removerVeiculo(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
        .then(() => atualizarTabela());
}

// Atualizar a tabela ao carregar
document.addEventListener('DOMContentLoaded', atualizarTabela);