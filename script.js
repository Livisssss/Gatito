// Remova a chamada initMap() fora do evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // URLs das imagens dos gatinhos
  const urlsGatinhos = ["https://cataas.com/cat"];

  // Índice do gatinho atual
  let indiceGatinhoAtual = 0;

  // Função para carregar os gatinhos da API
  function carregarGatinhos() {
    const url = urlsGatinhos[indiceGatinhoAtual];
    fetch(url)
      .then((response) => response.blob()) // Obtém a imagem como um blob
      .then((imagemBlob) => exibirGatinhos(imagemBlob))
      .catch((error) => console.error("Erro ao carregar os gatinhos:", error));
  }

  // Função para exibir as imagens dos gatinhos na página
  function exibirGatinhos(imagemBlob) {
    const container = document.getElementById("gatinhos-container");
    container.innerHTML = ""; // Limpa o conteúdo atual antes de adicionar novos gatinhos

    const gatinhoDiv = document.createElement("div");
    gatinhoDiv.classList.add("gatinho");

    const imagem = document.createElement("img");
    imagem.src = URL.createObjectURL(imagemBlob); // Cria uma URL temporária para a imagem blob
    imagem.alt = "Gatinho";

    const maisInformacoesBtn = document.createElement("button");
    maisInformacoesBtn.textContent = "Mais Informações";

    // Event listener para o botão "Mais Informações"
    maisInformacoesBtn.addEventListener("click", function () {
      // Buscar os dados do arquivo dados_gatinhos.json
      fetch("dados_gatinhos.json")
        .then((response) => response.json())
        .then((data) => {
          // Escolher um gatinho aleatório
          const gatinhoAleatorio =
            data[Math.floor(Math.random() * data.length)];

          // Exibir informações sobre o gatinho
          const mensagem = `Nome: ${gatinhoAleatorio.nome}\nIdade: ${gatinhoAleatorio.idade}\nFato Curioso: ${gatinhoAleatorio.fatoCurioso}`;
          alert(mensagem);
        })
        .catch((error) => {
          console.error("Erro ao buscar informações sobre o gatinho:", error);
          alert("Erro ao buscar informações sobre o gatinho.");
        });
    });

    // Adicionar o botão à algum elemento no seu HTML
    document.body.appendChild(maisInformacoesBtn);

    gatinhoDiv.appendChild(imagem);
    gatinhoDiv.appendChild(maisInformacoesBtn);
    container.appendChild(gatinhoDiv);

    adicionarBotoesNavegacao(); // Adiciona os botões de navegação após exibir a imagem do gatinho
  }

  // Função para adicionar botões de navegação
  function adicionarBotoesNavegacao() {
    const container = document.getElementById("gatinhos-container");

    const btnAnterior = document.createElement("button");
    btnAnterior.id = "btn-anterior";
    btnAnterior.textContent = "<";
    btnAnterior.addEventListener("click", function () {
      indiceGatinhoAtual =
        (indiceGatinhoAtual - 1 + urlsGatinhos.length) % urlsGatinhos.length;
      carregarGatinhos(); // Carrega o gatinho anterior
    });

    const btnProximo = document.createElement("button");
    btnProximo.id = "btn-proximo";
    btnProximo.textContent = ">";
    btnProximo.addEventListener("click", function () {
      indiceGatinhoAtual = (indiceGatinhoAtual + 1) % urlsGatinhos.length;
      carregarGatinhos(); // Carrega o próximo gatinho
    });

    container.appendChild(btnAnterior);
    container.appendChild(btnProximo);
  }

  // Carrega os gatinhos quando a página é carregada
  carregarGatinhos();
});
