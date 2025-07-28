const palavrasComDicas = [
  { palavra: "abacaxi", dica: "Fruta tropical com coroa" },
  { palavra: "futebol", dica: "Esporte mais popular do Brasil" },
  { palavra: "violao", dica: "Instrumento de cordas" },
  { palavra: "estrela", dica: "Brilha no céu" },
  { palavra: "pipoca", dica: "Acompanha o filme" },
  { palavra: "computador", dica: "Usado para programar" },
  { palavra: "chuveiro", dica: "Usado para tomar banho" },
  { palavra: "elefante", dica: "Maior mamífero terrestre" },
  { palavra: "praia", dica: "Tem areia e mar" },
  { palavra: "girassol", dica: "Flor que segue o sol" },
  { palavra: "caneta", dica: "Usada para escrever" },
  { palavra: "bicicleta", dica: "Veículo com duas rodas" },
  { palavra: "livro", dica: "Objeto cheio de páginas" },
  { palavra: "janela", dica: "Abertura para ver o lado de fora" },
  { palavra: "mochila", dica: "Carrega materiais escolares" },
  { palavra: "tartaruga", dica: "Animal que anda devagar" },
  { palavra: "guitarra", dica: "Instrumento usado em rock" },
  { palavra: "refrigerante", dica: "Bebida gaseificada" },
  { palavra: "travesseiro", dica: "Usado para apoiar a cabeça" },
  { palavra: "camiseta", dica: "Roupa de algodão" },
  { palavra: "tigre", dica: "Felino listrado" },
  { palavra: "planeta", dica: "A Terra é um deles" },
  { palavra: "sorvete", dica: "Doce gelado" },
  { palavra: "brinquedo", dica: "Usado para brincar" },
  { palavra: "zebra", dica: "Parecida com cavalo, tem listras" },
  { palavra: "viagem", dica: "Ato de ir a outro lugar" },
  { palavra: "biscoito", dica: "Disputa entre paulista e carioca" },
  { palavra: "cafuné", dica: "Carinho na cabeça" },
  { palavra: "jantinha", dica: "Comida de rua no prato de isopor" },
  { palavra: "fogueira", dica: "Festa junina" },
  { palavra: "cuscuz", dica: "Prato popular do nordeste" },
  { palavra: "churrasco", dica: "Encontro com carne e amigos" },
  { palavra: "berimbau", dica: "Instrumento da capoeira" },
  { palavra: "carnaval", dica: "Festa com desfile e samba" },
  { palavra: "bandeira", dica: "Símbolo nacional" },
  { palavra: "feijoada", dica: "Prato com feijão e carne" },
  { palavra: "jardim", dica: "Lugar com flores e plantas" },
  { palavra: "anel", dica: "Usado no dedo" },
  { palavra: "feriado", dica: "Dia de descanso oficial" },
  { palavra: "parque", dica: "Tem árvores, bancos e diversão" },
  { palavra: "farofa", dica: "Acompanha o churrasco" },
  { palavra: "pandeiro", dica: "Instrumento de percussão" },
  { palavra: "rede", dica: "Para descansar na varanda" },
  { palavra: "lampada", dica: "Ilumina o ambiente" },
  { palavra: "escada", dica: "Usada para subir" },
  { palavra: "anel", dica: "Joia de dedo" },
  { palavra: "manteiga", dica: "Passa no pão" },
  { palavra: "batata", dica: "Pode ser frita ou cozida" },
  { palavra: "trator", dica: "Máquina agrícola" }
];

let palavra = "";
let dica = "";
let letrasCertas = [];
let tentativas = 15;

const canvas = document.getElementById("forca");
const ctx = canvas.getContext("2d");

const dicaEl = document.getElementById("dica");
const palavraEl = document.getElementById("palavra-escondida");
const tentativasEl = document.getElementById("tentativas");
const mensagemEl = document.getElementById("mensagem");
const input = document.getElementById("letra");

function escolherPalavra() {
  const item = palavrasComDicas[Math.floor(Math.random() * palavrasComDicas.length)];
  palavra = item.palavra.toUpperCase();
  dica = item.dica;
  dicaEl.textContent = dica;
}

function mostrarPalavra() {
  palavraEl.textContent = palavra
    .split("")
    .map(letra => letrasCertas.includes(letra) ? letra : "_")
    .join(" ");
}

function desenharBoneco() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  const partes = 15 - tentativas;

  if (partes >= 1) ctx.strokeRect(10, 290, 280, 5);            // base
  if (partes >= 2) ctx.strokeRect(60, 20, 5, 270);             // haste
  if (partes >= 3) ctx.strokeRect(60, 20, 140, 5);             // topo
  if (partes >= 4) ctx.strokeRect(200, 20, 5, 30);             // corda
  if (partes >= 5) { ctx.beginPath(); ctx.arc(202, 70, 20, 0, Math.PI * 2); ctx.stroke(); }
  if (partes >= 6) { ctx.beginPath(); ctx.moveTo(202, 90); ctx.lineTo(202, 160); ctx.stroke(); }
  if (partes >= 7) { ctx.moveTo(202, 100); ctx.lineTo(172, 130); ctx.stroke(); }
  if (partes >= 8) { ctx.moveTo(202, 100); ctx.lineTo(232, 130); ctx.stroke(); }
  if (partes >= 9) { ctx.moveTo(202, 160); ctx.lineTo(172, 200); ctx.stroke(); }
  if (partes >= 10) { ctx.moveTo(202, 160); ctx.lineTo(232, 200); ctx.stroke(); }
  if (partes >= 11) { ctx.moveTo(195, 65); ctx.lineTo(200, 70); ctx.stroke(); }
  if (partes >= 12) { ctx.moveTo(210, 65); ctx.lineTo(205, 70); ctx.stroke(); }
  if (partes >= 13) { ctx.beginPath(); ctx.arc(202, 80, 5, 0, Math.PI); ctx.stroke(); }
  if (partes >= 14) { ctx.moveTo(182, 40); ctx.lineTo(222, 40); ctx.stroke(); }
  if (partes >= 15) { ctx.moveTo(180, 250); ctx.lineTo(224, 250); ctx.stroke(); }
}

function tentarLetra() {
  const letra = input.value.toUpperCase();
  input.value = "";
  input.focus();

  if (!letra || letra.length !== 1 || !/^[A-Z]$/.test(letra)) return;

  if (palavra.includes(letra)) {
    if (!letrasCertas.includes(letra)) letrasCertas.push(letra);
  } else {
    tentativas--;
  }

  mostrarPalavra();
  desenharBoneco();
  tentativasEl.textContent = tentativas;

  if (!palavraEl.textContent.includes("_")) {
    mensagemEl.textContent = "🎉 Parabéns! Você venceu!";
  }

  if (tentativas === 0) {
    mensagemEl.textContent = `💀 Você perdeu! A palavra era: ${palavra}`;
  }
}

function reiniciarJogo() {
  letrasCertas = [];
  tentativas = 15;
  mensagemEl.textContent = "";
  escolherPalavra();
  mostrarPalavra();
  desenharBoneco();
  tentativasEl.textContent = tentativas;
  input.focus();
}

reiniciarJogo();
