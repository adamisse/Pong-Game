//Elementos
let btIniciar, bola, cpu, jog, painelPontosCpu, painelPontosJog;
//Animação
let game, frames;
//Posições
let posBolaX, posBolaY, posJogX, posJogY, posCpuX, posCpuY;
//Direção teclado
let direJogY;
//Tamanhos
let campoX=0
let campoY=0
let campoW=1000
let campoH=580
let barraJogW=20
let barraJogH=150
let barraCpuW=20
let barraCpuH=150
let bolaW=20
let bolaH=20
//Direção
let bolaX, bolaY
let cpuY = 0
//Velocidade
let velBola, velCpu, velJog
//Controle
let pontosJog=0
let pontosCpu=0
let tecla
let jogo=false
//Posições iniciais
let posJogIniX=5
let posJogIniY=200
let posCpuIniX=973
let posCpuIniY=50
let posBolaIniX=490
let posBolaIniY=285
//**********************//
function cpuControl(){
    console.log('altura da bola:'+posBolaY)
    console.log('altura do jogador:'+posJogY)
    console.log('altura do cpu:'+posCpuY)
    console.log('altura da bola defasada:'+(posBolaY-235))
    console.log('se a bola ta mais alta que essa merda mova para baixo etc...:'+(posCpuY+(barraCpuH/2)))
    //obs: velCpu serve para dar um atraso no movimento da barra, para não ficar tão irreal;
    if(jogo==true){
        if(posBolaX>(campoW/2) && (bolaX>0)){   //movimentar CPU caso a bola passe do meio de campo;
            if(((posBolaY-235)>((posCpuY))+velCpu)){  //mover para baixo;
                if((posCpuY+barraCpuH)<=(campoH-175)){//o valor subtraido altera o limite inferior da cpu;
                    posCpuY+=velCpu
                }

            }else if((posBolaY-235)<((posCpuY))-velCpu){  //mover para cima;
                if(posCpuY>=(-275)){
                    posCpuY-=velCpu
                }
            }   
        }else{  //posicionar CPU no centro caso a bola não passe do centro;
            if((posCpuY+170)+(barraCpuH/2) < (campoH/2)){
                posCpuY = posCpuY+velCpu
            }else if((posCpuY+150)+(barraCpuH/2) > (campoH/2)){
                posCpuY = posCpuY-velCpu
            }
        }
        cpu.style.top=`${posCpuY}px`
    }
}

function playerControl(){
    if(jogo==true){
        posJogY+=velJog*direJogY
        if((posJogY+barraJogH)>=(campoH)||(posJogY)<=-20){
            posJogY+=(velJog*direJogY)*(-1)
        }
        jog.style.top=`${posJogY}px`
    }
}

function ballControl(){
    /*console.log('altura da bola:'+posBolaY)
    console.log('altura do jogador:'+posJogY)
    console.log('altura do cpu:'+posCpuY)*/
    //Movimentção da bola
    posBolaX+=velBola*bolaX
    posBolaY+=velBola*bolaY
    //Colisão com o jogador
    if(((posBolaX)<=(posJogX+barraJogW))&&((posBolaY+bolaH/2)>=(posJogY))&&((posBolaY)<=(posJogY+barraJogH))){
        bolaY=(((posBolaY-(bolaH/2))-(posJogY+(barraJogH/2)))/50)
        bolaX = bolaX*(-1)
    }
    //Colisão com o CPU
    if(((posBolaX)>=(posCpuX-barraCpuW))&&((posBolaY+bolaH/2)>=(posCpuY+150))&&((posBolaY)<=(posCpuY+150+barraCpuH))){
        bolaY=(posBolaY-(bolaH/2)-(posCpuY+150+(barraCpuH/2)))/50 //altera a sensibilidade;
        bolaX = bolaX*(-1)
    }
    //Limites Superior e Inferior
    if((posBolaY >= 572) || (posBolaY<=0)){
        bolaY = bolaY*(-1)
    } 
    //Pontuação Esquerda e Direita
    if(posBolaX>=(1000-bolaW)){
        velBola=0
        posJogY=posJogIniY
        posBolaX=posBolaIniX
        posBolaY=posBolaIniY
        posJogX=posJogIniX
        posCpuX=posCpuIniX
        posCpuY=posCpuIniY
        pontosJog++
        painelPontosJog.value=pontosJog
        jogo=false
        jog.style.top=`${posJogY}px`
        cpu.style.top=`${posCpuY}px`
    }else if(posBolaX <= (0-bolaW/2)){
        velBola=0
        posJogY=posJogIniY
        posBolaX=posBolaIniX
        posBolaY=posBolaIniY
        posJogX=posJogIniX
        posCpuX=posCpuIniX
        posCpuY=posCpuIniY
        pontosCpu++
        painelPontosCpu.value=pontosCpu
        jogo=false
        jog.style.top=`${posJogY}px`
        cpu.style.top=`${posCpuY}px`
    }
    bola.style.top=`${posBolaY}px`
    bola.style.left=`${posBolaX}px`
}

function keyDw(){
    tecla=event.keyCode
    if(tecla==38){
        direJogY=(-1)
    }else if(tecla==40){
        direJogY=1
    }
}

function keyUp(){
    tecla=event.keyCode
    if(tecla==38){
        direJogY=0
    }else if(tecla==40){
        direJogY=0
    }
}

function gameplay(){
    if(jogo==true){
        playerControl()
        ballControl()
        cpuControl()
    }
    frames=requestAnimationFrame(gameplay)
}

function gameStart(){
    if(jogo==false){
        velBola=8
        velCpu=6
        velJog=8
        cancelAnimationFrame(frames)
        jogo=true
        direJogY = 0 
        bolaY = 0
        if((Math.random()*10)<5){
            bolaX=(-1)
        }else{
            bolaX=-1
        }
        posBolaX = posBolaIniX
        posBolaY = posBolaIniY
        posJogX = posJogIniX
        posJogY = posJogIniY
        posCpuX = posCpuIniX
        posCpuY = posCpuIniY
        gameplay()
    }
}

function start(){
    velBola=8
    velCpu=8
    velJog=8
    btIniciar = document.getElementById('iniciar')
    btIniciar.addEventListener("click", gameStart)
    jog = document.getElementById('jogador')
    cpu = document.getElementById('cpu')
    bola = document.getElementById('bola')
    painelPontosJog = document.getElementById('pontuacaoJogador')
    painelPontosCpu = document.getElementById('pontuacaoCpu')
    document.addEventListener('keydown', keyDw)
    document.addEventListener('keyup', keyUp)
}
window.addEventListener('load',start)
