function mascaraCEP(valor) {
    valor = valor.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (valor.length > 5) {
      valor = valor.substring(0, 5) + "-" + valor.substring(5, 8);
    }
    return valor;
  }


const formulario = document.getElementById("formCep").addEventListener("submit", (e) => {
    e.preventDefault()

    const enviar = document.getElementById("enviarCep").value.trim()

    const regex = /^\d+$/;

    // Verifica se o valor corresponde à regex
    if (!regex.test(enviar)) {
        // O valor contém letras ou espaços, execute a ação desejada
        alert("O input deve conter apenas números.");
        input.value = ""; // Limpa o input
        return false; // Indica que a validação falhou
    }

    fetch(`https://viacep.com.br/ws/${enviar}/json/`)
    .then(res => res.json())               // Converte a resposta em JSON
    .then(data => {
        const div = document.createElement("div")
        div.innerHTML = `<h3> Cep ${data.cep} </h3> <p><strong>Logradouro:</strong> ${data.logradouro}</p>
        <p><strong>Complemento:</strong> ${data.complemento}</p>
        <p><strong>Bairro:</strong> ${data.bairro}</p>
        <p><strong>Localidade:</strong> ${data.localidade}</p>
        <p><strong>Uf:</strong> ${data.uf}</p>
        <p><strong>Estado:</strong> ${data.estado}</p>
        <p><strong>Região:</strong> ${data.regiao}</p>
        `

        formulario.appendChild(div)
        })
    })       // Exibe os dados no console
    .catch(err => console.error("Erro:", err))
  
