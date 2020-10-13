document.addEventListener('DOMContentLoaded', ()=>{

    const cvs = document.getElementById("canvas");
    const ctx = cvs.getContext('2d');


    //load images

    let bird = new Image();
    let bg = new Image();
    let fg = new Image();
    let pipeNorth = new Image();
    let pipeSouth = new Image();

    bird.src = 'images/bird2.png';
    bg.src = 'images/bg1.png';
    fg.src = 'images/fg1.png';
    pipeNorth.src = 'images/pipeNorth1.png';
    pipeSouth.src = 'images/pipeSouth1.png';

    //variables

    let bX = 10;
    let bY = 150;
    let gravity = 1.5;
    let randomGap = Math.floor(Math.random()*5);
    let gap = 85 + randomGap;
    let score = 0;

    //audio files

    let flyAudio = new Audio();
    let scoreAudio = new Audio();

    flyAudio.src = "sounds/fly.mp3";
    scoreAudio.src = "sounds/score.mp3";

    //keyboard

    document.addEventListener('keydown', ()=>{
        bY-=30;
        flyAudio.play();
    });

    document.addEventListener('touchend', ()=>{
        bY-=30;
        flyAudio.play();
    })

    //pipe coordinates

    let pipe = [];

    pipe[0] = {
        x: cvs.width,
        y: 0
    }

    //drawing images

    function draw(){
        ctx.drawImage(bg, 0, 0);
        //drawing pipes
        for (let i = 0; i < pipe.length; i++){

            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+pipeNorth.height+gap);
            ctx.drawImage(fg, 0, cvs.height-fg.height);
            ctx.drawImage(bird, bX, bY);
            pipe[i].x--;

            if(pipe[i].x == 100) {
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                });
            }
            //detect collision
            if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x  + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y+pipeNorth.height+gap) || bY + bird.height > cvs.height-fg.height){
                window.alert("Reload?")
                location.reload(); //reloads the page
            }

            if(pipe[i].x == -7){
                score++;
                scoreAudio.play();
            }
        }
        
        bY+=gravity;
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score: "+score, 10, cvs.height-20);
        
        ctx.fillStyle = "red";
        ctx.font = "12px Verdana";
        ctx.fillText("Current Height "+ (bY+bird.height), 150, cvs.height-20);
        ctx.fillText("Floor "+ (cvs.height-fg.height), 150, cvs.height-40);
        ctx.fillText("Hit the floor "+ (bY + bird.height > cvs.height-fg.height), 150, cvs.height-60);
        requestAnimationFrame(draw);
    }

    window.onload = draw();
});
