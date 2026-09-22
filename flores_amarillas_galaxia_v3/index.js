const $=s=>document.querySelector(s);
const PASSWORD = "CERATIZ91";

const passwordScreen = $('#passwordScreen');
const passwordInput = $('#passwordInput');
const passwordBtn = $('#passwordBtn');
const passwordError = $('#passwordError');

function checkPassword(){
    const enteredPassword = passwordInput.value;

    if(enteredPassword === PASSWORD){
        passwordScreen.classList.add('hidden');

        setTimeout(() => {
            passwordScreen.style.display = 'none';
        }, 800);

    }else{
        passwordError.classList.add('show');

        passwordInput.value = '';
        passwordInput.focus();

        setTimeout(() => {
            passwordError.classList.remove('show');
        }, 2500);
    }
}

passwordBtn.addEventListener('click', checkPassword);

passwordInput.addEventListener('keydown', e => {
    if(e.key === 'Enter'){
        checkPassword();
    }
});

const intro=$('#intro'),galaxy=$('#galaxyScreen'),travel=$('#travelScreen'),finalS=$('#finalScreen');
const music = $('#music');
const musicBtn = $('#musicBtn');
const space = $('#space');
const ctx = space ? space.getContext('2d') : null;

const travelCanvas = $('#travel');
const tctx = travelCanvas ? travelCanvas.getContext('2d') : null;let introClicks = 0;
let galaxyStarted = false;

let angle = 0;
let targetAngle = 0;

let cameraPitch = 0.25;
let targetPitch = 0.35;

let mouseX = .5;
let mouseY = .5;

let dragging = false;
let dragStartY = 0;
let dragStartPitch = 0;
const bloomScreen = $('#bloomScreen');
const bloomCanvas = $('#bloomCanvas');
const bctx = bloomCanvas ? bloomCanvas.getContext('2d') : null;

let bloomFlowers = [];
let bloomStarted = false;
let bloomStartTime = 0;

function resizeBloom(){

    if(!bloomCanvas || !bctx) return;

    const d = devicePixelRatio || 1;

    bloomCanvas.width = innerWidth * d;
    bloomCanvas.height = innerHeight * d;

    bctx.setTransform(d,0,0,d,0,0);
}

addEventListener('resize', resizeBloom);
resizeBloom();
function createBloomFlowers(){

    bloomFlowers = [];

    const colors = [
        '#e53935', // rojo
        '#f4c542', // amarillo
        '#fff8e7'  // blanco
    ];

    for(let i = 0; i < 55; i++){

        const side = Math.random() < .5 ? -1 : 1;

        bloomFlowers.push({
            x: innerWidth * (
                .08 + Math.random() * .84
            ),

            baseY: innerHeight * (
                .78 + Math.random() * .20
            ),

            size: 7 + Math.random() * 11,

            height:
                70 + Math.random() * 190,

            delay:
                Math.random() * 3.5,

            color:
                colors[Math.floor(Math.random() * colors.length)],

            sway:
                Math.random() * Math.PI * 2,

            side
        });
    }
}


function show(s){

    [intro, galaxy, travel, finalS, bloomScreen].forEach(x => {

        if(x){
            x.classList.remove('active');
        }

    });

    if(s){
        s.classList.add('active');
    }
}
function playMusic(){
    music.volume=.72;
    music.play().then(()=>musicBtn.textContent='● música').catch(()=>{})
}


musicBtn.onclick=()=>{if(music.paused)playMusic();else{music.pause();musicBtn.textContent='• música'}};

function introPress(){
 introClicks++;
 if(introClicks===1){$('#introTitle').textContent='Ahora otra vez…';$('#introHint').textContent='Pero esta vez, presióname dos veces ✦'}
 else startGalaxy();
}
$('#startBtn').onclick=introPress;$('#introFlower').onclick=introPress;

const stars = [];
const flowers = [];

for(let i = 560; i--;){

    stars.push({

        a: Math.random() * Math.PI * 2,

        r: 180 + Math.pow(Math.random(), .72) * 900,

        y: (Math.random() - .5) * 260,

        z: .4 + Math.random() * 1.2,

        size: .4 + Math.random() * 1.8,

        alpha: .15 + Math.random() * .65

    });

}


for(let i = 42; i--;){

    flowers.push({

        a: Math.random() * Math.PI * 2,

        r: 230 + Math.random() * 760,

        y: (Math.random() - .5) * 280,

        size: 5 + Math.random() * 7,

        z: .45 + Math.random() * 1.15,

        speed: (Math.random() - .5) * .0005

    });

}
const texts=[
 ['te quiero mucho',-2.4,260,1],['te pienso todos los dias',-1.25,350,1.2],['te admiro por todo',-.2,285,.9],
 ['Gracias por ser buena persona',.75,370,1.2],['te amo demasiado',1.65,310,1],['me haces muy feliz',2.55,390,1.1]
];

function resize(c){

    if(!c) return;

    const d = devicePixelRatio || 1;

    c.width = innerWidth * d;
    c.height = innerHeight * d;

    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
}

resize(space);
resize(travelCanvas);

addEventListener('resize', () => {

    resize(space);
    resize(travelCanvas);
    resizeBloom();

});
addEventListener('mousemove', e => {

    if(!galaxy.classList.contains('active')) return;

    mouseX = e.clientX / innerWidth;
    mouseY = e.clientY / innerHeight;

});
addEventListener('pointerdown', e => {

    if (!galaxy.classList.contains('active')) return;

    dragging = true;

    dragStartY = e.clientY;

    dragStartPitch = targetPitch;

});


addEventListener('pointermove', e => {

    if (!dragging) return;

    const movement = e.clientY - dragStartY;

    targetPitch =
        dragStartPitch + movement * 0.008;

    // Limitar la cámara
    targetPitch = Math.max(
        -Math.PI / 2,
        Math.min(
            Math.PI / 2,
            targetPitch
        )
    );

});


addEventListener('pointerup', () => {

    dragging = false;

});


addEventListener('pointercancel', () => {

    dragging = false;

});
addEventListener('wheel', e => {

    if(!galaxy.classList.contains('active')) return;

    e.preventDefault();

    targetAngle += e.deltaY * .0035;

}, { passive:false });
function flower(
    c,
    x,
    y,
    s,
    rot,
    a = 1,
    glow = false
){

    c.save();

    c.translate(x,y);

    c.rotate(rot);


    if(glow){

        c.shadowBlur = 18;

        c.shadowColor =
            'rgba(255,205,73,.65)';

    }


    const g =
        c.createLinearGradient(
            0,
            -s * 2,
            0,
            s * 2
        );


    g.addColorStop(
        0,
        `rgba(255,239,166,${a})`
    );


    g.addColorStop(
        1,
        `rgba(213,157,26,${a})`
    );


    c.fillStyle = g;


    for(let i = 0; i < 6; i++){

        c.save();

        c.rotate(
            i * Math.PI / 3
        );


        c.beginPath();

        c.ellipse(

            0,

            -s * 1.15,

            s * .55,

            s * .95,

            0,

            0,

            Math.PI * 2

        );

        c.fill();

        c.restore();

    }


    c.shadowBlur = 0;


    c.fillStyle =
        `rgba(171,105,8,${a})`;


    c.beginPath();

    c.arc(
        0,
        0,
        s * .43,
        0,
        Math.PI * 2
    );

    c.fill();


    c.restore();

}
function startGalaxy(){
    show(galaxy);
    playMusic();
    galaxyStarted=true;requestAnimationFrame(drawGalaxy)

}
function drawGalaxy(){

    if(!galaxy.classList.contains('active')) return;

    const d = devicePixelRatio || 1;

    ctx.setTransform(d,0,0,d,0,0);

    ctx.clearRect(
        0,
        0,
        innerWidth,
        innerHeight
    );


    angle += (targetAngle - angle) * .055;

    cameraPitch +=
    (targetPitch - cameraPitch) * .055;


    /*
    =========================================
    CENTRO REAL DE LA GALAXIA
    =========================================
    */

    const cx = innerWidth * .50 + (mouseX - .5) * 45,
      cy = innerHeight * .50 + (mouseY - .5) * 30;


    /*
    =========================================
    MOVEMOS EL NÚCLEO Y EL TEXTO
    =========================================
    */

    const galaxyCore = $('#galaxyCore');
const galaxyCopy = $('#galaxyCopy');

galaxyCore.style.left = cx + 'px';
galaxyCore.style.top = cy + 'px';

galaxyCopy.style.left = cx + 'px';
galaxyCopy.style.top = (cy - 10) + 'px';


    /*
    =========================================
    ESTRELLAS
    =========================================
    */

    for(const s of stars){

        const a = s.a + angle;

        const depth =
            (Math.sin(a) + 1) / 2;

        let x =
            cx +
            Math.cos(a) *
            s.r;

        let y =
            cy +
            Math.sin(a) *
            s.r *
            .22;

        /*
        inclinación de cámara
        */

        y +=
            s.y *
            Math.cos(cameraPitch);


        /*
        perspectiva vertical
        */

        y +=
            s.r *
            Math.sin(cameraPitch) *
            .18;


        const scale =
            .55 +
            depth * .7;


        ctx.fillStyle =
            `rgba(255,224,126,${
                s.alpha *
                (.25 + depth * .75)
            })`;


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            s.size * scale,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    /*
    =========================================
    NEBULOSA
    =========================================
    */

    const neb =
        ctx.createRadialGradient(
            cx,
            cy,
            5,
            cx,
            cy,
            330
        );


    neb.addColorStop(
        0,
        'rgba(255,215,75,.28)'
    );

    neb.addColorStop(
        .25,
        'rgba(220,170,40,.13)'
    );

    neb.addColorStop(
        .55,
        'rgba(150,110,25,.05)'
    );

    neb.addColorStop(
        1,
        'rgba(0,0,0,0)'
    );


    ctx.fillStyle = neb;

    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        330,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /*
    =========================================
    ÓRBITAS
    =========================================
    */

    ctx.strokeStyle =
        'rgba(232,184,61,.13)';

    ctx.lineWidth = 1;


    for (let i = 0; i < 6; i++) {

    const rx = 210 + i * 95;

    const ry =
        rx *
        Math.abs(Math.sin(cameraPitch));

    ctx.beginPath();

    ctx.ellipse(
        cx,
        cy,
        rx,
        Math.max(2, ry),
        0,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    }


    /*
    =========================================
    FLORES
    =========================================
    */

    for (const f of flowers) {

    f.a += f.speed;

    const a = f.a + angle;


    /*
    =====================================
    POSICIÓN DE LA ÓRBITA
    =====================================
    */

    const orbitX =
        Math.cos(a) * f.r;

    const orbitY =
        Math.sin(a) * f.r;


    /*
    =====================================
    CÁMARA
    =====================================
    */

    const pitch =
        cameraPitch;


    /*
    Vista de lado:
    pitch = 0

    Vista superior:
    pitch = PI/2

    Vista inferior:
    pitch = -PI/2
    */


    let x =
        cx + orbitX;


    let y =
        cy +
        orbitY *
        Math.sin(pitch);


    /*
    Profundidad.
    Sirve para saber qué tan cerca
    está la flor del espectador.
    */

    const depth =
        Math.cos(a) *
        Math.cos(pitch);


    /*
    =====================================
    MOVIMIENTO VERTICAL
    =====================================
    */

    y +=
        f.y *
        Math.cos(pitch);


    /*
    =====================================
    PROFUNDIDAD VISUAL
    =====================================
    */

    const distanceFromCamera =
        .55 +
        (depth + 1) * .22;


    /*
    =====================================
    TAMAÑO
    =====================================
    */

    const scale =
        .72 +
        distanceFromCamera * .28;


    const finalSize =
        f.size * scale;


    /*
    =====================================
    OPACIDAD
    =====================================
    */

    const alpha =
        .30 +
        distanceFromCamera * .45;


    /*
    =====================================
    NÚCLEO
    =====================================
    */

    const dx = x - cx;

    const dy = y - cy;

    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (distance < 170) {

        continue;

    }


    flower(
        ctx,
        x,
        y,
        finalSize,
        a,
        alpha,
        distanceFromCamera > .92
    );

}
    /*
    =========================================
    SIGUIENTE FRAME
    =========================================
    */
    /*
=========================================
TEXTOS DE LA GALAXIA
=========================================
*/

ctx.textAlign = 'center';

for(const t of texts){

    const a = t[1] + angle * .72;

    const orbitX =
        Math.cos(a) * t[2];

    const orbitY =
        Math.sin(a) * t[2];

    const depth =
        Math.cos(a) * Math.cos(cameraPitch);

    let x =
        cx + orbitX;

    let y =
        cy +
        orbitY * Math.sin(cameraPitch);

    y +=
        Math.sin(a) *
        35 *
        Math.cos(cameraPitch);

    const scale =
        .65 + ((depth + 1) / 2) * .55;

    const alpha =
        .25 + ((depth + 1) / 2) * .75;

    ctx.save();

    ctx.font =
        `italic ${Math.max(13,24 * scale * t[3])}px Georgia`;

    ctx.fillStyle =
        `rgba(255,225,145,${alpha})`;

    ctx.shadowBlur =
        depth > .45 ? 14 : 0;

    ctx.shadowColor =
        'rgba(255,195,62,.55)';

    ctx.fillText(
        t[0],
        x,
        y
    );

    ctx.restore();
}
    requestAnimationFrame(drawGalaxy);

}

/* El viaje comienza de inmediato al pulsar "hay algo más". */
const photos=['assets/img/recuerdos/01.jpg','assets/img/recuerdos/02.jpg','assets/img/recuerdos/03.jpg','assets/img/recuerdos/04.jpg'];
const messages=['Te quiero mucho.','Te amo mi yanira.','Te amo mucho.','Tea amo mi amor.','No sabes cuando te amo <3.'];
const streaks=[];
for(let i=0;i<220;i++)streaks.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,z:.1+Math.random(),len:5+Math.random()*50});

$('#moreBtn').onclick=()=>{

    show(bloomScreen);

    createBloomFlowers();

    bloomStarted = true;
    bloomStartTime = performance.now();

    const audio = $('#audioJonathan');

    if(audio){
        audio.currentTime = 0;
        audio.play().catch(()=>{});
    }

    requestAnimationFrame(drawBloom);
};
function startTravel(){
 const start=performance.now();
 function frame(now){
  if(!travel.classList.contains('active'))return;
  const d=devicePixelRatio||1;tctx.setTransform(d,0,0,d,0,0);
  tctx.fillStyle='rgba(2,7,5,.23)';tctx.fillRect(0,0,innerWidth,innerHeight);
  const cx=innerWidth/2,cy=innerHeight/2,elapsed=(now-start)/1000,speed=Math.min(1,elapsed/3);
  for(const s of streaks){
   const dx=s.x-cx,dy=s.y-cy,k=(.9+speed*10)*s.z;s.x=cx+dx*k;s.y=cy+dy*k;
   if(s.x<-80||s.x>innerWidth+80||s.y<-80||s.y>innerHeight+80){s.x=Math.random()*innerWidth;s.y=Math.random()*innerHeight}
   tctx.strokeStyle=`rgba(255,220,120,${.15+.55*s.z})`;tctx.lineWidth=1+s.z*2;tctx.beginPath();tctx.moveTo(s.x,s.y);tctx.lineTo(s.x-dx*.05,s.y-dy*.05);tctx.stroke();
  }
  requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);sequence();
}
function sequence(){
 const words=$('#travelWords');words.innerHTML='';
 messages.forEach((m,i)=>{const s=document.createElement('div');s.className='travel-word';s.textContent=m;s.style.left=(18+Math.random()*64)+'%';s.style.top=(17+Math.random()*66)+'%';words.appendChild(s)});
 [...words.children].forEach((s,i)=>setTimeout(()=>s.animate([{opacity:0,transform:'translate(-50%,-50%) scale(.4)'},{opacity:1,transform:'translate(-50%,-50%) scale(1.05)'},{opacity:0,transform:'translate(-50%,-50%) scale(1.8)'}],{duration:1700,fill:'forwards'}),i*1700));
 [0,1,2,3].forEach((i)=>setTimeout(()=>showPhoto(i),900+i*1800));
 setTimeout(()=>show(finalS),9000);
}
function showPhoto(i){
 const f=$('#travelPhoto'),img=$('#travelImage'),m=$('#travelMessage');img.src=photos[i];m.textContent=messages[i];
 f.animate([{opacity:0,transform:'translate(-50%,-50%) scale(.06) rotate(-8deg)'},{opacity:1,transform:'translate(-50%,-50%) scale(1) rotate(0)'},{opacity:0,transform:'translate(-50%,-50%) scale(2.5) rotate(2deg)'}],{duration:1850,easing:'cubic-bezier(.18,.72,.2,1)',fill:'forwards'});
 m.animate([{opacity:0},{opacity:1,offset:.35},{opacity:0}],{duration:1850,fill:'forwards'});
}

$('#lastBtn').onclick=()=>{$('#heartText').textContent='Aquí escribe la frase que quieras poner dentro del corazón.';$('#heart').classList.add('show');$('#lastBtn').style.opacity='0';$('#lastBtn').style.pointerEvents='none'};
function drawBloom(time){
    if(!bloomScreen || !bloomScreen.classList.contains('active')) return;

    const d = devicePixelRatio || 1;

    bctx.setTransform(d, 0, 0, d, 0, 0);
    bctx.clearRect(0, 0, innerWidth, innerHeight);

    const elapsed = (time - bloomStartTime) / 1000;

    // Fondo con pequeñas partículas
    for(let i = 0; i < 80; i++){
        const x = (i * 97) % innerWidth;
        const y = (i * 53) % innerHeight;

        bctx.fillStyle = 'rgba(255,230,150,.18)';
        bctx.beginPath();
        bctx.arc(x, y, 1.2, 0, Math.PI * 2);
        bctx.fill();
    }

    // Dibujar flores
    for(const f of bloomFlowers){

        const flowerProgress = Math.max(
            0,
            Math.min(1, (elapsed - f.delay) / 2.5)
        );

        if(flowerProgress <= 0) continue;

        const growth = flowerProgress;

        const sway =
            Math.sin(elapsed * 1.2 + f.sway) * 10;

        const x = f.x + sway;
        const baseY = f.baseY;

        const topY =
            baseY - f.height * growth;

        // Tallo
        bctx.save();

        bctx.strokeStyle = 'rgba(70,120,48,.85)';
        bctx.lineWidth = 2;

        bctx.beginPath();
        bctx.moveTo(baseY === undefined ? f.baseY : f.x, f.baseY);
        bctx.quadraticCurveTo(
            f.x + sway * .4,
            f.baseY - f.height * .5,
            x,
            topY
        );
        bctx.stroke();

        // Hojas
        bctx.fillStyle = 'rgba(83,135,55,.8)';

        bctx.beginPath();
        bctx.ellipse(
            x - 7,
            topY + 35,
            5,
            11,
            -.6,
            0,
            Math.PI * 2
        );
        bctx.fill();

        bctx.beginPath();
        bctx.ellipse(
            x + 7,
            topY + 55,
            5,
            11,
            .6,
            0,
            Math.PI * 2
        );
        bctx.fill();

        // Flor
        bctx.translate(x, topY);

        const size = f.size * growth;

        bctx.shadowBlur = 18;
        bctx.shadowColor = f.color;

        bctx.fillStyle = f.color;

        for(let p = 0; p < 6; p++){

            const a = p * Math.PI / 3;

            bctx.save();
            bctx.rotate(a);

            bctx.beginPath();
            bctx.ellipse(
                0,
                -size * 1.1,
                size * .55,
                size,
                0,
                0,
                Math.PI * 2
            );
            bctx.fill();

            bctx.restore();
        }

        // Centro
        bctx.shadowBlur = 0;
        bctx.fillStyle = '#d89b22';

        bctx.beginPath();
        bctx.arc(
            0,
            0,
            size * .45,
            0,
            Math.PI * 2
        );
        bctx.fill();

        bctx.restore();
    }

    // Durante los primeros segundos las flores siguen creciendo.
    // La animación completa queda activa aproximadamente 2 minutos.
    if(elapsed < 120){
        requestAnimationFrame(drawBloom);
    }
}
