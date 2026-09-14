/* ══════════════════════════════════
   PREGUNTAS
══════════════════════════════════ */
const RETOS_BETA = [
  {titulo:"Reto de la serie",             pregunta:"Parcheen la red: 3, 6, 9, [ ? ], 15, 18. ¿Qué número falta?",                                        correcta:12, opciones:[10,11,12]},
  {titulo:"Reto de las mitades",          pregunta:"El servidor tiene 100 gigas. El sistema usa 50 y los juegos usan 25. ¿Cuántos gigas libres quedan?",  correcta:25, opciones:[20,25,30]},
  {titulo:"Reto del reparto",             pregunta:"45 contraseñas entre 5 carpetas en partes iguales. ¿Cuántas van en cada carpeta?",                    correcta:9,  opciones:[7,9,11]},
  {titulo:"Reto del siglo",               pregunta:"Un siglo tiene 100 años. La universidad cumple la cuarta parte. ¿Cuántos años festeja?",               correcta:25, opciones:[20,25,50]},
  {titulo:"Reto de los chocolates",       pregunta:"6 paquetes con 8 chocolates cada uno. ¿Cuántos chocolates hay en total?",                             correcta:48, opciones:[42,48,56]},
  {titulo:"Reto de las horas",            pregunta:"El reloj marca las 11:45 a.m. ¿Cuántos minutos faltan para las 12:00?",                               correcta:15, opciones:[10,15,20]},
  {titulo:"Reto del triple",              pregunta:"Para desactivar la alarma: el triple de 15.",                                                          correcta:45, opciones:[30,45,60]},
  {titulo:"Reto de las manzanas",         pregunta:"Hay 12 manzanas. El equipo se come la mitad y regala 2 más. ¿Cuántas quedan?",                        correcta:4,  opciones:[4,6,8]},
  {titulo:"Reto de la cuenta regresiva",  pregunta:"Completen la serie: 40, 32, 24, [ ? ], 8. ¿Qué número falta?",                                       correcta:16, opciones:[14,16,18]},
  {titulo:"Reto del número misterioso",   pregunta:"Piensen en un número: multiplicado por 4 da 36. ¿De qué número se trata?",                            correcta:9,  opciones:[7,8,9]},
  {titulo:"Reto de multiplicación",       pregunta:"7 × 6 = ?",                                                                                           correcta:42, opciones:[36,42,48]},
  {titulo:"Reto de división",             pregunta:"32 ÷ 8 = ?",                                                                                           correcta:4,  opciones:[3,4,5]},
  {titulo:"Reto de multiplicación",       pregunta:"9 × 5 = ?",                                                                                           correcta:45, opciones:[40,45,50]},
  {titulo:"Reto de división",             pregunta:"54 ÷ 6 = ?",                                                                                           correcta:9,  opciones:[7,9,11]},
  {titulo:"Reto de multiplicación",       pregunta:"12 × 4 = ?",                                                                                          correcta:48, opciones:[42,48,56]},
  {titulo:"Reto de división",             pregunta:"100 ÷ 5 = ?",                                                                                         correcta:20, opciones:[15,20,25]},
  {titulo:"Reto de la serie",             pregunta:"Completa la serie: 4, 8, 12, __, 20.",                                                                correcta:16, opciones:[14,16,18]},
  {titulo:"Reto serie regresiva",         pregunta:"Completa la serie hacia atrás: 30, 25, 20, __, 10.",                                                   correcta:15, opciones:[12,15,18]},
  {titulo:"Reto de la mitad de 80",       pregunta:"¿Cuánto es la mitad de 80?",                                                                          correcta:40, opciones:[35,40,45]},
  {titulo:"Reto de la tercera parte",     pregunta:"¿Cuánto es la tercera parte de 30?",                                                                  correcta:10, opciones:[8,10,12]},
  {titulo:"Reto de las monedas",          pregunta:"Si tengo 3 monedas de $10 y 4 monedas de $5, ¿cuánto dinero tengo?",                                 correcta:50, opciones:[40,50,60]},
  {titulo:"Reto del cuarto de hora",      pregunta:"¿Cuántos minutos hay en un cuarto de hora (1/4 de hora)?",                                            correcta:15, opciones:[10,15,20]},
  {titulo:"Reto del área",                pregunta:"Si un rectángulo mide 5 cm de base y 3 cm de altura, ¿cuál es su área?",                              correcta:15, opciones:[10,15,20]},
  {titulo:"Reto del triple misterioso",   pregunta:"El triple de un número es 21. ¿Cuál es ese número?",                                                  correcta:7,  opciones:[6,7,8]},
  {titulo:"Reto de suma y resta",         pregunta:"15 + 15 − 10 = ?",                                                                                    correcta:20, opciones:[15,20,25]}
];

/* ══ ESTADO ══ */
let virusPositions = ['B2','C4'];
let virusMode = 'random';
let usadosReto = [];
let preguntaIdx = 0;
let retosRonda = [];
let respuestasRonda = [];
let timerInterval = null;
let timerSeg = 30;
let esperandoNext = false;
let columnaInicio = 1;

/* ══ CONFETTI ══ */
(function initConfetti() {
  const c = document.getElementById('confetti-global');
  const colors = ['#6ee7b7','#c084fc','#fde047','#93c5fd','#f9a8d4','#fb923c','#f472b6'];
  const simbolos = ['+','−','×','÷','=','0','1','2','3','4','5','6','7','8','9','○','△','□'];
  for (let i = 0; i < 150; i++) {
    const p = document.createElement('div');
    p.className = 'cp';
    p.textContent = simbolos[Math.floor(Math.random()*simbolos.length)];
    const size = Math.random()*8 + 12;
    p.style.cssText = `color:${colors[i%colors.length]};left:${Math.random()*100}%;font-size:${size}px;font-family:'Space Grotesk',sans-serif;font-weight:700;text-shadow:0 0 6px currentColor;animation-duration:${Math.random()*4+3}s;animation-delay:-${Math.random()*7}s;`;
    c.appendChild(p);
  }
})();

/* ══ NAVEGACIÓN ══ */
function irA(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

/* ══ INICIO ══ */
function iniciarJuego() {
  usadosReto = [];
  virusPositions = ['B2','C4'];
  document.getElementById('ruta-box').classList.remove('visible');
  document.getElementById('ruta-icon').textContent = 'lock';
  document.getElementById('ruta-label').textContent = 'Staff — mostrar ruta sugerida';
  setMode('random');
  construirMiniTablero();
  asignarInicioAleatorio();
  irA('s-mision');
}

function asignarInicioAleatorio() {
  columnaInicio = Math.floor(Math.random() * 5) + 1;
  const txt = document.getElementById('mission-text-p');
  if (txt) {
    txt.innerHTML = `¡Ingenieros! Su Robot inicia en <span class="highlight-cell" style="background:#fde68a;border:2px solid #d97706;color:#78350f">A${columnaInicio}</span> — posición elegida al azar de la fila A. Debe llegar a <span class="highlight-cell">E5</span>.`;
  }
  construirTablero();
}

/* ══ MODO VIRUS ══ */
function setMode(mode) {
  virusMode = mode;
  document.getElementById('btn-random').classList.toggle('selected', mode==='random');
  document.getElementById('btn-eleccion').classList.toggle('selected', mode==='eleccion');
  document.getElementById('virus-random-info').style.display   = mode==='random'   ? 'flex' : 'none';
  document.getElementById('virus-eleccion-info').style.display = mode==='eleccion' ? 'block': 'none';
  if (mode==='random') {
    virusPositions = ['B2','C4'];
    actualizarVirusInfo();
    construirTablero();
  }
}

function generarVirusRandom() {
  const filas = ['B','C','D'];
  const cols  = [1,2,3,4,5];
  const candidatos = [];
  filas.forEach(f => cols.forEach(c => { if (f+c !== 'E5') candidatos.push(f+c); }));
  shuffle(candidatos);
  virusPositions = candidatos.slice(0,2);
  actualizarVirusInfo();
  construirTablero();
}

function actualizarVirusInfo() {
  const txt = document.getElementById('virus-random-text');
  if (txt) txt.innerHTML = `Virus ubicados en: <strong style="color:var(--on-error)">${virusPositions.join(' y ')}</strong>`;
  actualizarRutaStaff();
}

/* ══ MINI TABLERO ══ */
let virusEleccion = [];

function construirMiniTablero() {
  virusEleccion = [];
  const filas = ['E','D','C','B','A'];
  const t = document.getElementById('mini-tablero');
  t.innerHTML = '';
  filas.forEach(f => {
    [1,2,3,4,5].forEach(c => {
      const coord = f+c;
      const cell = document.createElement('div');
      const isStart = f==='A';
      const isEnd   = coord==='E5';
      cell.className = isStart ? 'mini-cell cell-start' : 'mini-cell';
      cell.textContent = isStart ? (coord==='A1'?'INI':coord) : (isEnd?'META':coord);
      if (isEnd) { cell.style.background='var(--tertiary-container)'; cell.style.borderColor='var(--tertiary)'; cell.style.color='var(--on-tertiary)'; cell.style.cursor='default'; cell.style.fontSize='8px'; }
      if (!isStart && !isEnd) {
        cell.addEventListener('click', () => toggleVirusEleccion(coord, cell));
      }
      t.appendChild(cell);
    });
  });
  document.getElementById('virus-count-label').textContent = 'Virus colocados: 0/2';
}

function toggleVirusEleccion(coord, cell) {
  if (virusEleccion.includes(coord)) {
    virusEleccion = virusEleccion.filter(v => v!==coord);
    cell.classList.remove('virus-selected');
    cell.textContent = coord;
  } else {
    if (virusEleccion.length >= 2) return;
    virusEleccion.push(coord);
    cell.classList.add('virus-selected');
    cell.textContent = '☠';
  }
  document.getElementById('virus-count-label').textContent = `Virus colocados: ${virusEleccion.length}/2`;
  virusPositions = virusEleccion.length>0 ? [...virusEleccion] : ['B2','C4'];
  construirTablero();
  actualizarRutaStaff();
}

/* ══ RUTA BFS ══ */
function actualizarRutaStaff() {
  const ruta = calcularRuta(virusPositions);
  const cont = document.getElementById('route-steps-display');
  cont.innerHTML = '';
  ruta.forEach((paso,i) => {
    const d = document.createElement('div');
    d.className = 'route-step' + (paso==='A'+columnaInicio?' start':(paso==='E5'?' end':''));
    d.textContent = paso;
    cont.appendChild(d);
    if (i < ruta.length-1) {
      const arr = document.createElement('span');
      arr.className = 'route-arrow'; arr.textContent = '→';
      cont.appendChild(arr);
    }
  });
}

function calcularRuta(virus) {
  const filas = ['A','B','C','D','E'];
  const idx = c => filas.indexOf(c);
  const coord = (f,c) => filas[f]+c;
  const start = 'A'+columnaInicio, end = 'E5';
  const virusSet = new Set(virus);
  const queue = [[start]];
  const visited = new Set([start]);
  while (queue.length) {
    const path = queue.shift();
    const cur = path[path.length-1];
    if (cur===end) return path;
    const f = idx(cur[0]), c = parseInt(cur[1]);
    const vecinos = [[f-1,c],[f+1,c],[f,c-1],[f,c+1]];
    for (const [nf,nc] of vecinos) {
      if (nf<0||nf>4||nc<1||nc>5) continue;
      const nc2 = coord(nf,nc);
      if (visited.has(nc2)||virusSet.has(nc2)) continue;
      visited.add(nc2);
      queue.push([...path,nc2]);
    }
  }
  return [start,'(sin ruta segura)',end];
}

function toggleRuta() {
  actualizarRutaStaff();
  const box = document.getElementById('ruta-box');
  const icon = document.getElementById('ruta-icon');
  const label = document.getElementById('ruta-label');
  const visible = box.classList.toggle('visible');
  icon.textContent = visible ? 'lock_open' : 'lock';
  icon.style.fontVariationSettings = visible ? "'FILL' 1" : "'FILL' 0";
  label.textContent = visible ? 'Staff — ocultar ruta sugerida' : 'Staff — mostrar ruta sugerida';
}

/* ══ TABLERO GRANDE ══ */
function construirTablero() {
  const ruta    = calcularRuta(virusPositions);
  const rutaSet = new Set(ruta);
  const filas   = ['E','D','C','B','A'];
  const t = document.getElementById('tablero');
  t.innerHTML = '';
  filas.forEach(f => {
    [1,2,3,4,5].forEach(c => {
      const coord = f+c;
      const cell = document.createElement('div');
      const isStartCell = coord === 'A'+columnaInicio;
      if      (coord==='E5')                    cell.className='cell end';
      else if (virusPositions.includes(coord))  cell.className='cell virus';
      else if (isStartCell)                     cell.className='cell start';
      else if (rutaSet.has(coord))              cell.className='cell path';
      else                                      cell.className='cell';
      if      (coord==='E5')                    cell.textContent='META';
      else if (virusPositions.includes(coord))  cell.textContent='☠';
      else                                      cell.textContent=coord;
      t.appendChild(cell);
    });
  });
}

/* ══ TIMER ══ */
const TIMER_TOTAL = 30;
const CIRCUNF = 2 * Math.PI * 20;

function startTimer() {
  stopTimer();
  timerSeg = TIMER_TOTAL;
  updateTimerUI(timerSeg);
  timerInterval = setInterval(() => {
    timerSeg--;
    updateTimerUI(timerSeg);
    if (timerSeg <= 0) {
      stopTimer();
      tiempoAgotado();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function updateTimerUI(seg) {
  document.getElementById('timer-num').textContent = seg;
  const bar = document.getElementById('timer-bar');
  const offset = CIRCUNF * (1 - seg/TIMER_TOTAL);
  bar.style.strokeDashoffset = offset;
  bar.classList.toggle('warn', seg <= 7);
}

function tiempoAgotado() {
  if (esperandoNext) return;
  esperandoNext = true;
  document.querySelectorAll('.opt-btn').forEach(b => {
    if (parseInt(b.textContent) === retosRonda[preguntaIdx].correcta) b.className='opt-btn correct';
    else b.className='opt-btn wrong';
  });
  const fb = document.getElementById('feedback');
  fb.textContent = `⏰ ¡Tiempo! La respuesta era ${retosRonda[preguntaIdx].correcta}.`;
  fb.className = 'feedback-msg feedback-ko';
  registrarRespuesta(false);
}

/* ══ RETO: INICIO ══ */
function iniciarReto() {
  preguntaIdx = 0;
  respuestasRonda = [];

  if (usadosReto.length + 3 > RETOS_BETA.length) usadosReto = [];
  const disponibles = RETOS_BETA.map((_,i)=>i).filter(i=>!usadosReto.includes(i));
  shuffle(disponibles);
  retosRonda = disponibles.slice(0,3).map(i=>RETOS_BETA[i]);
  retosRonda.forEach(r => usadosReto.push(RETOS_BETA.indexOf(r)));

  [0,1,2].forEach(i => {
    const d = document.getElementById('dot-'+i);
    d.className = 'prog-dot pending';
    d.textContent = i+1;
  });

  document.getElementById('hackeo-banner').style.display = 'none';
  document.getElementById('reto-actions').style.display  = 'none';
  document.getElementById('btn-completada').style.display = 'none';
  const btnReintentar = document.getElementById('btn-reintentar');
  btnReintentar.onclick = reiniciarReto;
  btnReintentar.style.display = 'inline-flex';

  irA('s-reto');
  mostrarPregunta();
}

function mostrarPregunta() {
  esperandoNext = false;
  stopTimer();
  const reto = retosRonda[preguntaIdx];
  document.getElementById('reto-titulo').textContent   = reto.titulo;
  document.getElementById('reto-pregunta').textContent = reto.pregunta;
  document.getElementById('feedback').textContent      = '';
  document.getElementById('feedback').className        = 'feedback-msg';

  const cont = document.getElementById('opciones-container');
  cont.innerHTML = '';
  shuffle([...reto.opciones]).forEach(op => {
    const b = document.createElement('button');
    b.className = 'opt-btn';
    b.textContent = op;
    b.onclick = () => responder(op);
    cont.appendChild(b);
  });

  startTimer();
}

/* ══ RESPONDER ══ */
function responder(valor) {
  if (esperandoNext) return;
  esperandoNext = true;
  stopTimer();
  const reto = retosRonda[preguntaIdx];
  const esCorrecta = valor === reto.correcta;

  document.querySelectorAll('.opt-btn').forEach(b => {
    b.className = 'opt-btn ' + (parseInt(b.textContent)===reto.correcta ? 'correct' : 'wrong');
  });
  const fb = document.getElementById('feedback');
  if (esCorrecta) { fb.textContent='¡Correcto! 🎉'; fb.className='feedback-msg feedback-ok'; }
  else            { fb.textContent=`No es esa. La respuesta era ${reto.correcta}.`; fb.className='feedback-msg feedback-ko'; }

  registrarRespuesta(esCorrecta);
}

function registrarRespuesta(ok) {
  respuestasRonda.push(ok);
  const dot = document.getElementById('dot-'+preguntaIdx);
  dot.className = 'prog-dot ' + (ok ? 'correct' : 'wrong');
  dot.textContent = ok ? '✓' : '✗';

  const fallos = respuestasRonda.filter(r => !r).length;
  const sinSalvacion = fallos >= 2;

  setTimeout(() => {
    preguntaIdx++;
    if (preguntaIdx < 3 && !sinSalvacion) {
      mostrarPregunta();
    } else {
      finalizarRonda();
    }
  }, 1400);
}

function finalizarRonda() {
  stopTimer();
  const correctas = respuestasRonda.filter(Boolean).length;
  const aprobado  = correctas >= 2;
  const fb = document.getElementById('feedback');
  const btnReintentar = document.getElementById('btn-reintentar');
  if (aprobado) {
    fb.textContent = `✅ ¡${correctas}/3 correctas! Sistema liberado.`;
    fb.className   = 'feedback-msg feedback-ok';
    document.getElementById('hackeo-banner').style.display = 'none';
    document.getElementById('reto-actions').style.display  = 'flex';
    document.getElementById('btn-completada').style.display = 'inline-flex';
    btnReintentar.style.display = 'none';
  } else {
    fb.textContent = `❌ Solo ${correctas}/3 correctas.`;
    fb.className   = 'feedback-msg feedback-ko';
    document.getElementById('hackeo-banner').style.display = 'block';
    document.getElementById('reto-actions').style.display  = 'flex';
    document.getElementById('btn-completada').style.display = 'none';
    btnReintentar.style.display = 'inline-flex';
    btnReintentar.onclick = volverAFaseAConSorteo;
  }
  document.querySelectorAll('.opt-btn').forEach(b => b.disabled=true);
}

function volverAFaseAConSorteo() {
  document.getElementById('hackeo-banner').style.display = 'none';
  virusPositions = ['B2','C4'];
  setMode('random');
  generarVirusRandom();
  construirMiniTablero();
  asignarInicioAleatorio();
  irA('s-mision');
}

function reiniciarReto() {
  document.getElementById('hackeo-banner').style.display = 'none';
  iniciarReto();
}

/* ══ UTILS ══ */
function shuffle(arr) {
  for (let i=arr.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function reiniciar() {
  stopTimer();
  usadosReto = [];
  virusPositions = ['B2','C4'];
  virusEleccion = [];
  document.getElementById('ruta-box').classList.remove('visible');
  document.getElementById('ruta-icon').textContent = 'lock';
  document.getElementById('ruta-label').textContent = 'Staff — mostrar ruta sugerida';
  setMode('random');
  construirMiniTablero();
  construirTablero();
  irA('s-bienvenida');
}

construirMiniTablero();
construirTablero();
actualizarVirusInfo();
