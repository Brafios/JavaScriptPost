fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json())               // Converte a resposta em JSON
  .then(data => {
    data.forEach(element => {
        const listaAPI = document.getElementById("lista")

        const div = document.createElement("div")
        div.classList.add("caixa")

        const li = document.createElement("li")
        li.innerHTML = `<p><strong> Titulo:</strong> ${element.title}</p> <p><strong> Corpo:</strong> ${element.body}</p>  <p><strong> Id:</strong> ${element.id}</p>  <p><strong>UserId:</strong> ${element.userId}</p>`
        listaAPI.appendChild(div)
        div.appendChild(li)
    })
  })       // Exibe os dados no console
  .catch(err => console.error("Erro:", err))

document.getElementById("formPost").addEventListener("submit", (e) => {
    e.preventDefault(); // Evita o recarregamento da página
  
    const titulo = document.getElementById("titulo").value;
    const corpo = document.getElementById("corpo").value;
  
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: titulo,
        body: corpo,
        userId: 1
      })
        
    })
    .then(res => res.json())
    .then(postCriado => {
        const lista = document.getElementById("lista")

        const div = document.createElement("div")
        div.classList.add("caixa")

        const li = document.createElement("li")
    
        li.innerHTML = `<p><strong> Titulo:</strong> ${postCriado.title}</p> <p><strong> Corpo:</strong> ${postCriado.body}</p>  <p><strong> Id:</strong> ${postCriado.id}</p>  <p><strong>UserId:</strong> ${postCriado.userId}</p>`

        lista.appendChild(div)

        div.appendChild(li)

    })
    .catch(err => console.error("Erro ao criar post:", err));
  });


  
  
