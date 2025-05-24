// npm install express
/* const express = require('express')
const app = express()
const path = require('path')
app.use(express.static(path.join(__dirname, 'Aula 01-10'))) */

//programa escolhido
var programa = 0;

//var test = JSON.parse(todosOsProgramas)
//console.log(test.hasOwnProperty(`${programa}`))

// Gabarito
var gabarito = undefined;

//pontos
var pontos = 0; // pontos do programa
var pontos_totais = 0; // jogo ao todo

var pontos_programa = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]

// MAPA
const programasEGabaritos = new Map([
    ['101', 'abcbbcdacaadcbdbdacaccbdaaabda'],
    ['102', 'caccbdddbdababdcaabcaabadbbbcd'],
    ['103', 'cdadabaabcaabadddccbadbadbbcab'],
    ['104', 'cbbddadbbdcaadadabccddccddaacd'],
    ['105', 'bbddbddabdabccadddcdcbbbacaddd'],
    ['1', 'a']
]);

//tentativas
var tentativa = " "; // tentativa de acerto, 1 jogada*
var filaPrograma = 0 // Conta quantos programas foram executados
var num_tentativa = 1 // Quantas vezes o usuário tentou acertar a pergunta

// Indica se o botão já foi clicado para aquela pergunta
var estadoAzul = true
var estadoVerde = true
var estadoAmarelo = true
var estadoVermelho = true

// Query para os elementos que serão manipulados
var botaoAzul = document.querySelector("#azul")
var botaoVerde = document.querySelector("#verde")
var botaoAmarelo = document.querySelector("#amarelo")
var botaoVermelho = document.querySelector("#vermelho")
var pedePrograma = document.querySelector('.prompt')
var jogo = document.querySelector('.jogo')
var inicio = document.querySelector('#comecar')
var feedback = document.querySelector('.feedback')
var partidaInicio = document.querySelector('.partida')
var botaoComecaJogo = document.getElementById('comecarNovoJogo')

// Número da questão sendo jogada
var questionNumber = document.querySelector("#number")

function iniciar_programa() {
	
    var programaSelector = document.querySelector('#programa').value // Pega o valor digitado pelo usuário

	// Aqui ficará o objeto JSON e tals - testar na facul que tem node.
	if (programasEGabaritos.get(`${programaSelector}`) != undefined) {
		

        var msg = document.querySelector('#mensagem')
	    msg.innerHTML = " "

		pedePrograma.classList.add("hidden")
		jogo.classList.remove("hidden")
        programa = programaSelector
        gabarito = programasEGabaritos.get(`${programaSelector}`)
        programaSelector = '0'

        console.log(gabarito)


	}
	else {
	
		var msg = document.querySelector('#mensagem')
		msg.innerHTML = 'O programa não pôde ser localizado. Tente outro programa!'
		
	}

    //reiniciando variaveis
    pontos = 0;
    num_pergunta = 1;
    num_tentativa = 1;
}

function pontuar(){
    pontos += 4 - num_tentativa;
}

function verificarResposta (gabarito, tentativa) {
    console.log(num_tentativa)
    switch (tentativa) {

        case 'a':
            estadoBotao = estadoVermelho
            break
        case 'b':
            estadoBotao = estadoAmarelo
            break
        case 'c':
            estadoBotao = estadoAzul
            break
        case 'd':
            estadoBotao = estadoVerde
            break
                    
   }
    if ((gabarito[(parseInt(questionNumber.innerHTML) - 1)]) == tentativa && estadoBotao == true) {
        
        pontuar()
        proximaQuestao()

    //errou
    } else if (estadoBotao == true) {
        switch (tentativa) {

            case 'a':
                estadoVermelho = false
                botaoVermelho.style.backgroundColor = 'gray'
                break
            case 'b':
                estadoAmarelo = false
                botaoAmarelo.style.backgroundColor = 'gray'
                break
            case 'c':
                estadoAzul = false
                botaoAzul.style.backgroundColor = 'gray'
                break
            case 'd':
                estadoVerde = false
                botaoVerde.style.backgroundColor = 'gray'
                break
                        
       }
        num_tentativa++
        if (num_tentativa > 3) {
            proximaQuestao()
        }
    }
}

function proximaQuestao () {
	num_tentativa = 1
    estadoAzul = true
    estadoVerde = true
    estadoAmarelo = true
    estadoVermelho = true

    botaoVerde.style.backgroundColor = 'green'
    botaoVermelho.style.backgroundColor = 'red'
    botaoAmarelo.style.backgroundColor = 'yellow'
    botaoAzul.style.backgroundColor = 'blue'
    console.log("gabarito length:" + gabarito.length)
    console.log(gabarito)
    if (questionNumber.innerHTML != gabarito.length)
        questionNumber.innerHTML = parseInt(questionNumber.innerHTML) + 1
    else {
        finalizarPrograma()
	}

}

function finalizarPrograma() {

    // Fazer um lugar para receber o próximo programa
    // Caso já tenham ido todos, abrir uma tela para mostrar os pontos
    // E talvez botar o nome e gravar no JSON pontos.JSON o nome e os pontos e os programas jogados? -> pode deixar pra av2
    estadoAzul = true
    estadoVerde = true
    estadoAmarelo = true
    estadoVermelho = true

    botaoVerde.style.backgroundColor = 'green'
    botaoVermelho.style.backgroundColor = 'red'
    botaoAmarelo.style.backgroundColor = 'yellow'
    botaoAzul.style.backgroundColor = 'blue'

    //guardando os pontos do programa
    //pontos_programa.set(programa, pontos)
	pontos_programa[filaPrograma][0] = programa
	pontos_programa[filaPrograma][1] = pontos
	filaPrograma++
	questionNumber.innerHTML = 1
	pontos_totais = pontos_totais + pontos
	
	if (filaPrograma == 6)
		
		jogoTerminou()

   else {

		pedir_programa()
	
    }
}    

function pedir_programa() {
	
	pedePrograma.classList.remove("hidden")
	jogo.classList.add("hidden")
    pedePrograma.value = ''
	
}

function jogoTerminou () {
	
	jogo.classList.add("hidden")
	
	for (i = 0; i < 6; i++) {
		
		var block = document.getElementsByClassName('score')[i]
		
		block.innerHTML = ` Programa ${pontos_programa[i][0]} <div class = 'numerico'>${pontos_programa[i][1]}</div> `
		
	}
	
	var total = document.querySelector('.total')
	total.innerHTML = `Pontos: <div class = 'valueTotal'>${pontos_totais}</div>`
	feedback.classList.remove("hidden")
	
}

function partida_comeca () {
	
	partidaInicio.classList.add("hidden")
	pedePrograma.classList.remove("hidden")
	
}

botaoVermelho.addEventListener('click', function () {verificarResposta(gabarito, 'a');})
botaoAmarelo.addEventListener('click', function () {verificarResposta(gabarito, 'b');})
botaoAzul.addEventListener('click', function () {verificarResposta(gabarito, 'c');})
botaoVerde.addEventListener('click', function () {verificarResposta(gabarito, 'd');})
inicio.addEventListener('click', function () {iniciar_programa();})
botaoComecaJogo.addEventListener('click', function () {partida_comeca();})