derecha=0
izquierda=0
derechax=0
derechay=0
izquierdax=0
izquierday=0
var cancion=""
function preload(){
    cancion=loadSound("cancion.mp3")
}
function reproducir(){
    cancion.play()
    cancion.setVolume(1)
    cancion.rate(1)
}
function detener(){
    cancion.stop()
}
function setup(){
    lienzo=createCanvas(300, 300)
    lienzo.center()
    camara=createCapture(VIDEO)
    camara.hide()
    modelo=ml5.poseNet(camara, modelocargado)
    modelo.on("pose", gotPoses)
} 
function draw(){
    image(camara, 0, 0, 300, 300)
    fill("blue")
    stroke("blue")
    if(izquierda>0.2){
        circle(izquierdax, izquierday, 20)
        var numero=Number(izquierday)
        var decimales=floor(numero)
        var volumen=decimales/300
        document.getElementById("volumen2").innerHTML=volumen
        cancion.setVolume(volumen)
    }
    if(derecha>0.2){
        circle(derechax, derechay, 20)
        if(derechay>0 && derechay<=60){
            document.getElementById("velocidad2").innerHTML="velocidad: 0.5"
            cancion.rate(0.5)
        }
        else if(derechay>60 && derechay<=120){
            document.getElementById("velocidad2").innerHTML="velocidad: 1"
            cancion.rate(1)
        }
        else if(derechay>120 && derechay<=180){
            document.getElementById("velocidad2").innerHTML="velocidad: 1.5"
            cancion.rate(1.5)
        }
        else if(derechay>180 && derechay<=240){
            document.getElementById("velocidad2").innerHTML="velocidad: 2"
            cancion.rate(2)
        }
        else if(derechay>240){
            document.getElementById("velocidad2").innerHTML="velocidad: 2.5"
            cancion.rate(2.5)
        }
    }
}
function modelocargado(){
    console.log("modelo listo")
}
function gotPoses(results){
if(results.length>0){
    console.log(results)
derecha=results[0].pose.keypoints[10].score
izquierda=results[0].pose.keypoints[9].score
derechax=results[0].pose.rightWrist.x
derechay=results[0].pose.rightWrist.y
izquierdax=results[0].pose.leftWrist.x
izquierday=results[0].pose.leftWrist.y
}
}
