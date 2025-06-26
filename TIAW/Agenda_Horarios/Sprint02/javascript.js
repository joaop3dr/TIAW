document.addEventListener("DOMContentLoaded", () => {
      const jogo = document.getElementById("jogo");
      const data = document.getElementById("data");
      const hora = document.getElementById("hora");
      const partida = document.getElementById("partida");
      const nivel = document.getElementById("nivel");

      const rJogo = document.getElementById("resumo-jogo");
      const rData = document.getElementById("resumo-data");
      const rHora = document.getElementById("resumo-hora");
      const rPartida = document.getElementById("resumo-partida");
      const rNivel = document.getElementById("resumo-nivel");
      const imagem = document.getElementById("imagem-jogo");

      function formatarData(dataISO) {
      const partes = dataISO.split("-"); // ["2025", "06", "15"]
      return `${partes[2]}/${partes[1]}/${partes[0]}`; // "15/06/2025"
      }

      function atualizarResumo() {
        rJogo.textContent = jogo.value ? "Jogo: " + jogo.value : "Jogo: xxxxx";
        rData.textContent = data.value
        ? "Data: " + formatarData(data.value)
        : "Data: xx/xx/xxxx";

        rHora.textContent = hora.value ? "Hora: " + hora.value : "Hora: xx:xx";
        rPartida.textContent = partida.value ? "Partida: " + partida.value : "Partida: xxxxx";
        rNivel.textContent = nivel.value ? "Nível: " + nivel.value : "Nível: xxxxx";

        if (jogo.value === "FIFA") {
          imagem.src = "fifa13.jpg";
        } else if (jogo.value === "Valorant") {
          imagem.src = "valorant01.jpg";
        } else if (jogo.value === "League of Legends") {
          imagem.src = "lol01.jpg";
        } 
        else if (jogo.value === "Cs Go") {
          imagem.src = "csgo.jpg";
        }else {
          imagem.src = "https://via.placeholder.com/150";
        }
      }

      [jogo, data, hora, partida, nivel].forEach(el => el.addEventListener("change", atualizarResumo));
      [data, hora].forEach(el => el.addEventListener("input", atualizarResumo));
    });