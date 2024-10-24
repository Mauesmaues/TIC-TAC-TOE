const jogador = document.getElementById('vez');
const areas = document.querySelectorAll('.area');
const paraPlayerVez = document.getElementById('pPlayerVez');
const classEstilo = document.getElementById('playerVez');
let h1Box = document.getElementById("h1Box")
let jogoAtivo = false; // Variável para controlar se o jogo está ativo
let root = document.querySelector(":root")



const combinacoes = [
    [0, 1, 2], // Linha 1
    [3, 4, 5], // Linha 2
    [6, 7, 8], // Linha 3
    [0, 3, 6], // Coluna 1
    [1, 4, 7], // Coluna 2
    [2, 5, 8], // Coluna 3
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundária
];

function VerificarEmpate(){
    // Verifica se todas as áreas estão preenchidas
    const todasPreenchidas = [...areas].every(area => area.innerText === 'X' || area.innerText === 'O');
    // every(area => area.innerText === 'X' || area.innerText === 'O'): 
    //Verifica se todas as células (áreas) estão preenchidas com "X" ou "O". 
    //Se qualquer uma estiver vazia, o resultado será false.
    
    if (todasPreenchidas && !verificarVitoria()) {
        paraPlayerVez.innerText = "Empate! Ninguém venceu.";
        h1Box.innerText = "Jogo Empatado!";

        const alertaVencedor = document.getElementById('alertaGanhador')
            alertaVencedor.classList.add("alertaVencedor")

            const boxAlerta = document.getElementById('boxVencedor')
            boxAlerta.classList.add("classBoxWin")
            
            const pBox = document.getElementById("pBox")
            pBox.innerText = "Velha"
            pBox.classList.add("win")

            const pBox2 = document.getElementById("pBox2")
            pBox2.innerText = "(Clique na tela para sair!)"
            pBox2.classList.add("pBox2")

            const articleAlert = document.getElementById("articleAlert")
            articleAlert.classList.add("articleAlert")
            
            const buttonRetira = document.getElementById("buttonRetirar")
            buttonRetira.classList.add("buttonRetira")

            root.style.setProperty("--font-color", "#da0808")
            root.style.setProperty("--primary-color", "#da0808")
            root.style.setProperty("--second-colo", "#da0808")
            root.style.setProperty("--size-princ", "1.5rem")

            
            jogoAtivo = false
            return true;
    }
    return false
}


function verificarVitoria() {
    for (const combinacao of combinacoes) {
        const [a, b, c] = combinacao;
        if (areas[a].innerText && areas[a].innerText === areas[b].innerText && areas[a].innerText === areas[c].innerText) {
            marcarCombinação(a, b, c);
            
            const alertaVencedor = document.getElementById('alertaGanhador')
            alertaVencedor.classList.add("alertaVencedor")

            const boxAlerta = document.getElementById('boxVencedor')
            boxAlerta.classList.add("classBoxWin")
            
            const pBox = document.getElementById("pBox")
            pBox.innerText = "Win!"
            pBox.classList.add("win")

            const pBox2 = document.getElementById("pBox2")
            pBox2.innerText = "(Clique na tela para sair!)"
            pBox2.classList.add("pBox2")

            const articleAlert = document.getElementById("articleAlert")
            articleAlert.classList.add("articleAlert")
            
            const buttonRetira = document.getElementById("buttonRetirar")
            buttonRetira.classList.add("buttonRetira")

            paraPlayerVez.innerText = `Vez do jogador: ${jogador.dataset.vez === 'playerX' ? document.getElementById('playerOne').value : document.getElementById('playerTwo').value}`;
            jogador.dataset.vez = jogador.dataset.vez === 'playerX' ? 'playerO' : 'playerX';
            h1Box.innerText = `${jogador.dataset.vez === 'playerX' ? document.getElementById('playerOne').value : document.getElementById('playerTwo').value}`
            jogoAtivo = false
            return true; // Retorna verdadeiro se houver vitória
        }
    }
    return false; // Retorna falso se não houver vitória
}

areas.forEach(area => {
    area.addEventListener('click', function() {
        const button = this;
        
        // Verifica se o jogo está ativo e se a área já foi preenchida
        if (!jogoAtivo || button.innerText) return;

       
        const simbolo = jogador.dataset.vez === 'playerX' ? "X" : "O";
        button.innerText = simbolo;

        
        jogador.dataset.vez = jogador.dataset.vez === 'playerX' ? 'playerO' : 'playerX';
        
        const playerName = simbolo === "X" ? document.getElementById('playerOne').value : document.getElementById('playerTwo').value;
    
        paraPlayerVez.innerText = `Vez do jogador: ${jogador.dataset.vez === 'playerX' ? document.getElementById('playerOne').value : document.getElementById('playerTwo').value}`;
        
        VerificarEmpate();
        verificarVitoria();;
        
        
    });
});

function marcarCombinação(a, b, c) {
    areas[a].classList.add("venceu");
    areas[b].classList.add("venceu");
    areas[c].classList.add("venceu");
}

function encerrar() {
    document.getElementById('playerTwo').value = "";
    document.getElementById('playerOne').value = "";
    paraPlayerVez.innerText = "";
    classEstilo.classList.remove("ativo");
    areas.forEach(area => {
        area.innerText = "";
        area.classList.remove("venceu"); 
    });
    jogoAtivo = false; 
}

document.querySelector('.start').addEventListener('click', function(start) {
    const text = start.currentTarget;
    const playerOne = document.getElementById('playerOne').value;
    const playerTwo = document.getElementById('playerTwo').value;

    if (!playerOne || !playerTwo) {
        alert("Por favor, preencha os nomes dos jogadores.");
        return;
    }

    if (text.innerText === "start") {
        text.innerText = "Encerrar";
        jogador.dataset.vez = 'playerX'; 
        paraPlayerVez.innerText = `Vez do jogador: ${playerOne}`;
        classEstilo.classList.add("ativo"); 
        jogoAtivo = true; 

        // Inicializa o jogo, limpando áreas e configurando o primeiro jogador
        areas.forEach(area => {
            area.innerText = "";  // Limpa as áreas
            area.classList.remove("venceu");  // Remove qualquer destaque de vitória anterior
        });

        console.log(`Jogador 1: ${playerOne}`);
        console.log(`Jogador 2: ${playerTwo}`);
    } else {
        text.innerText = "start";
        encerrar();
    }
});

document.getElementById("buttonRetirar").addEventListener('click', function(){

            const alertaVencedor = document.getElementById('alertaGanhador')
            alertaVencedor.classList.remove("alertaVencedor")

            const boxAlerta = document.getElementById('boxVencedor')
            boxAlerta.classList.remove("classBoxWin")

            const pBox = document.getElementById("pBox")
            pBox.innerText = ""
            pBox.classList.remove("win")

            const articleAlert = document.getElementById("articleAlert")
            articleAlert.classList.remove("articleAlert")

            const buttonRetira = document.getElementById("buttonRetirar")
            buttonRetira.classList.remove("buttonRetira")

            const h1Box = document.getElementById('h1Box')
            h1Box.innerText = ""

            const start = document.querySelector(".start")
            start.innerHTML = "start"

            root.style.setProperty("--font-color", "##9bd000")
            root.style.setProperty("--primary-color", "#6eda08")
            root.style.setProperty("--second-colo", "#9bd000")
            root.style.setProperty("--size-princ", "2rem")
            encerrar();
})

