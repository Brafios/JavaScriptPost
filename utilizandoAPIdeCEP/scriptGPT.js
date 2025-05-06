function mascaraCEP(valor) {
    valor = valor.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (valor.length > 5) {
        valor = valor.substring(0, 5) + "-" + valor.substring(5, 8); // Formata o CEP
    }
    return valor;
}

const formulario = document.getElementById("formCep");

formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submit

    const enviar = document.getElementById("enviarCep").value.trim();

    const regex = /^\d{5}-?\d{3}$/; // Regex para validar o formato do CEP

    // Verifica se o valor corresponde ao formato de CEP
    if (!regex.test(enviar)) {
        alert("O CEP deve estar no formato 00000-000.");
        return false; // Indica que a validação falhou
    }

    // Remove qualquer traço do CEP antes de enviar para a API
    const cepSemTraco = enviar.replace("-", "");

    // Faz a requisição para a API ViaCEP
    fetch(`https://viacep.com.br/ws/${cepSemTraco}/json/`)
    .then(res => res.json()) // Converte a resposta em JSON
    .then(data => {
        // Verifica se a resposta contém dados válidos
        if (data.erro) {
            alert("CEP não encontrado.");
            return;
        }

        // Exibe os dados do CEP
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>CEP: ${data.cep}</h3>
            <p><strong>Logradouro:</strong> ${data.logradouro}</p>
            <p><strong>Complemento:</strong> ${data.complemento}</p>
            <p><strong>Bairro:</strong> ${data.bairro}</p>
            <p><strong>Localidade:</strong> ${data.localidade}</p>
            <p><strong>UF:</strong> ${data.uf}</p>
        `;
        
        // Adiciona a div com os dados ao formulário
        formulario.appendChild(div);
    })
    .catch(err => console.error("Erro:", err)); // Exibe erro caso ocorra
});
