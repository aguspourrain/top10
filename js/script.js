const PROMPTS = [
  // --- FIESTA Y AMIGOS (party) ---
  { text: "Haces una fiesta sorpresa para tu mamá, ¿cómo se sorprende?", scale: "1: Indiferente - 10: Infarto", category: "party" },
  { text: "Un amigo llega 1 hora tarde a tu cumple, ¿qué tan enojado/a estás?", scale: "1: Zen - 10: Rencoroso", category: "party" },
  { text: "Te toca limpiar la casa después de una fiesta clandestina destructiva, ¿qué tan terrible es el desastre?", scale: "1: Limpito - 10: Desastre", category: "party" },
  { text: "Alguien propone jugar a un juego de mesa en la previa, ¿cuántas ganas tenés?", scale: "1: Embole - 10: Fanático", category: "party" },
  { text: "Tu amigo borracho te pide las llaves para manejar él, ¿qué tan firme te negás?", scale: "1: Permisivo - 10: Intransigente", category: "party" },
  { text: "Te cancelan un plan un viernes a la noche a último momento, ¿cómo te lo tomás?", scale: "1: Aliviado - 10: Indignado", category: "party" },
  { text: "Se corta la música en medio del clímax de la fiesta, ¿cómo reaccionás?", scale: "1: Copado - 10: Bajón", category: "party" },
  { text: "Te invitan a un asado pero te enterás de que es todo vegano, ¿qué tanto te afecta?", scale: "1: Adaptable - 10: Carnívoro", category: "party" },
  { text: "Tu amigo cuenta un secreto tuyo haciéndose el gracioso en el grupo, ¿cómo te sentís?", scale: "1: Inmune - 10: Traicionado", category: "party" },
  { text: "Te cruzas en un boliche a tu profesor/jefe bailando descontrolado, ¿qué hacés?", scale: "1: Cómplice - 10: Traumado", category: "party" },

  // --- GEEK & POP CULTURE (geek) ---
  { text: "Tenés que hablar en público ante 100 personas, ¿cómo te sentís?", scale: "1: Relajado - 10: Pánico", category: "geek" },
  { text: "Perdés el Wi-Fi por todo el fin de semana, ¿cómo lo manejás?", scale: "1: Desconectado - 10: Abstinencia", category: "geek" },
  { text: "Anuncian que cancelan tu serie favorita en un final abierto, ¿qué tanta indignación tenés?", scale: "1: Resignado - 10: Furia", category: "geek" },
  { text: "Te spoilean el final de la película que ibas a ver hoy en el cine, ¿cómo reaccionás?", scale: "1: Curioso - 10: Asesino", category: "geek" },
  { text: "Te dicen que dejes los videojuegos o internet porque 'es para nenes', ¿qué le respondés?", scale: "1: Indiferente - 10: Ofendido", category: "geek" },
  { text: "Comprás una figura o bazar geek y te llega rota por el correo, ¿cómo reclamás?", scale: "1: Comprensivo - 10: Destructivo", category: "geek" },
  { text: "Te regalan tecnología de hace 15 años diciendo que es 'lo último', ¿qué cara ponés?", scale: "1: Agradecido - 10: Sarcástico", category: "geek" },
  { text: "Te desafían a un duelo de trivia de tu saga favorita, ¿qué nivel de conocimiento demostrás?", scale: "1: Novato - 10: Erudito", category: "geek" },
  { text: "Se te borra la partida guardada de un juego de 80 horas de progreso, ¿cómo reaccionás?", scale: "1: Apático - 10: Depresivo", category: "geek" },
  { text: "Te toca armar una PC gamer desde cero con piezas carísimas, ¿qué tan seguro te sentís?", scale: "1: Seguro - 10: Aterrado", category: "geek" },

  // --- PICANTES / INCÓMODAS (hot) ---
  { text: "Tu ex te manda un mensaje a las 2am, ¿cómo reaccionás?", scale: "1: Superado - 10: Obsesivo", category: "hot" },
  { text: "Ves a tu crush de sorpresa en el súper, ¿cuánto te ponés nervioso/a?", scale: "1: Caradura - 10: Tímido", category: "hot" },
  { text: "Te ofrecen comer un insecto vivo por plata, ¿cuánto te cuesta decidirte?", scale: "1: Interesado - 10: Asco", category: "hot" },
  { text: "Tus padres piden revisar tu celular ahora mismo, ¿cómo te ponés?", scale: "1: Transparente - 10: Culpable", category: "hot" },
  { text: "Le mandás por error un mensaje criticando a alguien... ¡A esa misma persona!, ¿qué hacés?", scale: "1: Descarado - 10: Trágame-tierra", category: "hot" },
  { text: "Te das cuenta de que tenés la bragueta abierta o la ropa al revés en una cita, ¿cómo lo manejás?", scale: "1: Despreocupado - 10: Humillado", category: "hot" },
  { text: "Tu pareja te propone abrir la relación de la nada, ¿cuál es tu postura?", scale: "1: Liberal - 10: Conservador", category: "hot" },
  { text: "Te confunden con un mozo o empleado en un lugar cheto, ¿cómo reaccionás?", scale: "1: Humilde - 10: Pretencioso", category: "hot" },
  { text: "Te suena el estómago extremadamente fuerte en un examen silencioso, ¿qué cara ponés?", scale: "1: Divertido - 10: Avergonzado", category: "hot" },
  { text: "Tu suegro/a te hace un comentario político muy polémico cenando, ¿cómo respondés?", scale: "1: Diplomático - 10: Combativo", category: "hot" },

  // --- FÚTBOL (football) ---
  { text: "Estás viendo un partido, te gritan el gol antes de tiempo y al final la pelota no entra, ¿cómo reaccionás?", scale: "1: Ni te inmutás - 10: Echás a tu amigo por mufa", category: "football" },
  { text: "Tu equipo pierde una final continental contra tu clásico rival por un gol en contra sobre la hora, ¿cómo pasás la semana?", scale: "1: Es solo un jueguito - 10: Pedís carpeta médica en el trabajo", category: "football" },
  { text: "El 5 rústico de tu equipo le mete una patada voladora criminal al delantero rival, ¿qué decís en la tribuna / sillón?", scale: "1: Uh, qué bruto - 10: Todo pelota, siga siga", category: "football" },
  { text: "Te invitan a jugar un picadito de urgencia con desconocidos y te dan la camiseta número 10, ¿cómo jugás?", scale: "1: Escondido en el lateral - 10: Modo Diego en el 86", category: "football" },
  { text: "Te enterás de que el nuevo novio de tu hermana es fanático enfermo del clásico rival, ¿cómo lo recibís en el asado?", scale: "1: Con la mejor onda - 10: Le servís la carne cruda", category: "football" },
  { text: "El mejor jugador de tu equipo erra un penal decisivo en una tanda eliminatoria, ¿qué gritás frente a la pantalla?", scale: "1: Apoyo incondicional - 10: Insultos en idiomas inexistentes", category: "football" },
  { text: "Estás jugando un partido de fútbol 5 de noche y te toca ir al arco porque nadie quiere, ¿qué actitud tomás?", scale: "1: Una estatua de madera - 10: Volás como el Dibu", category: "football" },
  { text: "Ves al director técnico de tu club cenando solo en un restaurante después de perder tres partidos seguidos, ¿qué hacés?", scale: "1: Lo dejás tranquilo - 10: Le armás el equipo en la servilleta", category: "football" },
  { text: "Tu amigo cancela el partido de fútbol 5 de los martes diez minutos antes de arrancar porque 'está cansado', ¿qué le ponés en el grupo?", scale: "1: No pasa nada pa - 10: Sos un ex-amigo", category: "football" },
  { text: "Estás mirando un partido clave y el árbitro cobra un penal totalmente inventado en contra de tu equipo, ¿qué hacés?", scale: "1: Resignación absoluta - 10: Le tirás el control a la tele", category: "football" }
];
function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

let STATE = {
  players: [],
  captainIdx: 0,
  assignments: {},
  sortOrder: [],
  captainOrder: [],
  usedPrompts: [],
  promptIdx: 0,
  secretIdx: 0,
  seenCount: 0,
  revealed: false,
  round: 1,
  selectedCategory: 'all'
};

/* ---- TEMA CLARO/OSCURO ---- */
function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  root.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
}

/* ---- MODALES ---- */
function openRulesModal() { document.getElementById('rules-modal').classList.remove('hidden'); }
function closeRulesModal() { document.getElementById('rules-modal').classList.add('hidden'); }

function openScoreModal() {
  const list = document.getElementById('modal-scoreboard-list');
  const sorted = [...STATE.players].sort((a, b) => b.score - a.score);
  list.innerHTML = generatePodiumHTML(sorted);
  document.getElementById('score-modal').classList.remove('hidden');
}
function closeScoreModal() { document.getElementById('score-modal').classList.add('hidden'); }
function closeWarningModal() { document.getElementById('warning-modal').classList.add('hidden'); }

/* ---- GENERADOR DE PODIO Y TABLA ---- */
function generatePodiumHTML(sortedPlayers) {
  if (sortedPlayers.length === 0) {
    return '<p class="dimmed text-center fs-13">Agregá jugadores para ver los puntajes.</p>';
  }

  let html = '<div class="podium-container">';
  if (sortedPlayers[1]) {
    html += `<div class="podium-place podium-2"><div class="podium-name">${sortedPlayers[1].name}</div><div class="podium-score">${sortedPlayers[1].score}</div></div>`;
  }
  if (sortedPlayers[0]) {
    html += `<div class="podium-place podium-1"><div class="podium-name">${sortedPlayers[0].name}</div><div class="podium-score">${sortedPlayers[0].score}</div></div>`;
  }
  if (sortedPlayers[2]) {
    html += `<div class="podium-place podium-3"><div class="podium-name">${sortedPlayers[2].name}</div><div class="podium-score">${sortedPlayers[2].score}</div></div>`;
  }
  html += '</div>';

  for (let i = 3; i < sortedPlayers.length; i++) {
    let p = sortedPlayers[i];
    let scoreColor = p.score > 0 ? 'var(--success)' : p.score < 0 ? 'var(--danger)' : 'var(--text-dimmed)';
    html += `<div class="score-row">
        <span><span class="js-score-rank">${i + 1}.</span> ${p.name}</span>
        <span style="color:${scoreColor}">${p.score}</span>
    </div>`;
  }
  return html;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  el.classList.add('active');
  el.classList.remove('fade-in');
  void el.offsetWidth; // Force Reflow
  el.classList.add('fade-in');
}

/* ---- SETUP ---- */
function renderPlayerInputs(vals) {
  const c = document.getElementById('players-container');
  c.innerHTML = '';
  vals.forEach((v, i) => {
    const row = document.createElement('div');
    row.className = 'js-player-row';

    const badge = document.createElement('div');
    badge.className = 'js-player-badge';
    badge.textContent = i + 1;

    const inp = document.createElement('input');
    inp.value = v; inp.placeholder = 'Jugador ' + (i + 1); inp.maxLength = 14;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'js-btn-remove';
    removeBtn.innerHTML = '&times;';

    removeBtn.onclick = () => {
        const cur = getInputValues();
        // Acá está la lógica del cartelito rojo
        if (cur.length <= 3) {
            const err = document.getElementById('setup-error');
            err.textContent = 'El mínimo de jugadores es de 3 👀';
            err.style.display = 'block';
            setTimeout(() => err.style.display = 'none', 3000); // Se oculta a los 3 segundos
            return;
        }
        cur.splice(i, 1);
        renderPlayerInputs(cur);
      };

    row.appendChild(badge); row.appendChild(inp); row.appendChild(removeBtn);
    c.appendChild(row);
  });

  if (vals.length < 10) {
    const addBtn = document.createElement('button');
    addBtn.className = 'js-btn-add';
    addBtn.textContent = '+ Agregar jugador';
    addBtn.onclick = () => { const cur = getInputValues(); cur.push(''); renderPlayerInputs(cur); };
    c.appendChild(addBtn);
  }
}

function getInputValues() { return [...document.querySelectorAll('#players-container input')].map(i => i.value); }

function startGame() {
  const vals = getInputValues().map(v => v.trim()).filter(Boolean);
  const err = document.getElementById('setup-error');
  if (vals.length < 3) { err.textContent = 'Necesitás al menos 3 jugadores'; err.classList.add('active'); return; }
  if (new Set(vals.map(v => v.toLowerCase())).size !== vals.length) { err.textContent = 'Los nombres deben ser únicos'; err.classList.add('active'); return; }
  err.classList.remove('active');

  // Guardar categoría seleccionada
  STATE.selectedCategory = document.getElementById('theme-selector').value;

  document.getElementById('btn-end-global').classList.remove('hidden');

  STATE.players = vals.map(n => ({ name: n, score: 0 }));
  STATE.usedPrompts = [];
  STATE.captainIdx = Math.floor(Math.random() * STATE.players.length);
  pickPromptAndAssign();
  renderCaptainScreen();
  showScreen('s-captain');
}

function pickPromptAndAssign() {
  // Filtrar consignas según temática elegida
  let pool = PROMPTS.map((p, i) => ({ ...p, originalIdx: i }));
  if (STATE.selectedCategory !== 'all') {
    pool = pool.filter(p => p.category === STATE.selectedCategory);
  }

  const avail = pool.filter(p => !STATE.usedPrompts.includes(p.originalIdx));
  
  let chosen;
  if (avail.length) {
    chosen = avail[Math.floor(Math.random() * avail.length)];
  } else {
    // Si se agotan, reiniciamos pool para esa temática
    STATE.usedPrompts = STATE.usedPrompts.filter(idx => !pool.some(p => p.originalIdx === idx));
    chosen = pool[Math.floor(Math.random() * pool.length)];
  }

  STATE.promptIdx = chosen.originalIdx;
  STATE.usedPrompts.push(chosen.originalIdx);

  const actors = getActors();
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, actors.length);
  STATE.assignments = {};
  actors.forEach((n, i) => STATE.assignments[n] = nums[i]);
}

function getActors() { return STATE.players.filter((_, i) => i !== STATE.captainIdx).map(p => p.name); }
function getCaptain() { return STATE.players[STATE.captainIdx].name; }

/* ---- CAPTAIN ---- */
function renderCaptainScreen() {
  document.getElementById('captain-name').textContent = getCaptain();
  const p = PROMPTS[STATE.promptIdx];
  document.getElementById('prompt-text').textContent = p.text;
  document.getElementById('prompt-scale').textContent = 'Escala: ' + p.scale;
}

function skipPrompt() {
  pickPromptAndAssign();
  renderCaptainScreen();
}

function goToSecret() {
  STATE.secretIdx = 0; STATE.seenCount = 0; STATE.revealed = false;
  renderSecretScreen();
  showScreen('s-secret');
}

/* ---- SECRET ---- */
function renderSecretScreen() {
  const actors = getActors();
  const cur = actors[STATE.secretIdx];
  const hint = document.getElementById('secret-hint');
  const done = document.getElementById('secret-done');
  const counter = document.getElementById('secret-counter');
  const progress = document.getElementById('secret-progress');
  const allSeen = STATE.seenCount === actors.length;

  counter.textContent = STATE.seenCount + '/' + actors.length;
  progress.style.width = (STATE.seenCount / actors.length * 100) + '%';

  if (allSeen) {
    hint.textContent = ''; done.classList.remove('hidden');
  } else {
    hint.textContent = 'Toca tu nombre, ' + cur; done.classList.add('hidden');
  }
  buildSecretGrid(actors, allSeen);
}

function buildSecretGrid(actors, allSeen) {
  const grid = document.getElementById('secret-grid');
  grid.innerHTML = '';
  actors.forEach((name, i) => {
    const isCur = name === actors[STATE.secretIdx];
    const hasSeen = i < STATE.seenCount;
    const isRev = isCur && STATE.revealed;
    const btn = document.createElement('button');
    btn.className = 'num-btn';

    if (hasSeen) {
      btn.style.borderColor = 'var(--success)'; btn.style.background = 'rgba(32, 212, 137, 0.1)';
    } else if (isCur) {
      btn.style.borderColor = 'var(--primary)';
    } else {
      btn.style.borderColor = 'var(--card-border)'; btn.style.opacity = '0.6';
    }

    if (isRev) {
      btn.innerHTML = `<div class="zoom-in js-zoom-inner">
        <div class="js-zoom-num">${STATE.assignments[name]}</div>
        <div class="js-zoom-sub">toca para ocultar</div>
      </div>`;
      btn.onclick = () => {
        STATE.revealed = false;
        STATE.seenCount++;
        STATE.secretIdx++;
        renderSecretScreen();
      };
    } else {
      btn.innerHTML = `<div>${name}</div>` + (hasSeen ? `<div class="js-txt-seen">Visto</div>` : '');
      btn.onclick = () => {
        if (!isCur || STATE.revealed || hasSeen) return;
        STATE.revealed = true;
        renderSecretScreen();
      };
    }
    grid.appendChild(btn);
  });
}

function goToSort() {
  const actors = getActors();
  STATE.sortOrder = shuffle([...actors]);
  renderSortScreen();
  showScreen('s-sort');
}

/* ---- SORT (Drag & Drop) ---- */
function renderSortScreen() {
  const list = document.getElementById('sort-list');
  document.getElementById('sort-captain').textContent = getCaptain();
  list.innerHTML = '';
  STATE.sortOrder.forEach((name, i) => {
    const row = document.createElement('div');
    row.className = 'order-row fade-in';
    row.dataset.name = name;
    row.style.animationDelay = (i * 0.05) + 's';

    const badge = document.createElement('div'); badge.className = 'order-badge'; badge.textContent = i + 1;
    const nameDiv = document.createElement('div'); nameDiv.className = 'order-name'; nameDiv.textContent = name;
    const handle = document.createElement('div'); handle.className = 'drag-handle'; handle.innerHTML = '&#8801;';

    row.appendChild(badge); row.appendChild(nameDiv); row.appendChild(handle);
    list.appendChild(row);
  });

  new Sortable(list, {
    animation: 150,
    ghostClass: 'sortable-ghost',
    onEnd: function () {
      STATE.sortOrder = [...list.children].map(row => row.dataset.name);
      renderSortScreen();
    }
  });
}

function revealResult() {
  STATE.captainOrder = [...STATE.sortOrder];
  const correct = Object.entries(STATE.assignments).sort((a, b) => a[1] - b[1]).map(([n]) => n);
  let delta = 0;
  STATE.captainOrder.forEach((name, i) => { if (name === correct[i]) delta++; else delta--; });
  STATE.players = STATE.players.map((p, i) => i === STATE.captainIdx ? { ...p, score: p.score + delta } : p);
  renderResults(delta, correct);
  showScreen('s-results');
}

/* ---- RESULTS ---- */
function renderResults(delta, correctOrder) {
  document.getElementById('res-captain').textContent = getCaptain();
  const d = document.getElementById('res-delta');
  d.textContent = (delta > 0 ? '+' : '') + delta;
  d.style.color = delta >= 0 ? 'var(--success)' : 'var(--danger)';

  const orderDiv = document.getElementById('res-order');
  orderDiv.innerHTML = '';
  correctOrder.forEach((name, i) => {
    const ok = STATE.captainOrder[i] === name;
    const row = document.createElement('div'); row.className = 'result-row fade-in'; row.style.animationDelay = (i * 0.08) + 's';

    const pos = document.createElement('div'); pos.className = 'result-pos';
    pos.style.borderColor = ok ? 'var(--success)' : 'var(--danger)';
    pos.style.color = ok ? 'var(--success)' : 'var(--danger)';
    pos.textContent = i + 1;

    const card = document.createElement('div'); card.className = 'result-card';
    card.style.borderColor = ok ? 'var(--success)' : 'var(--danger)';
    
    card.innerHTML = `<span class="js-res-name">${name}</span>
                     <span class="js-res-val">${STATE.assignments[name]}</span>`;

    const icon = document.createElement('span');
    icon.className = 'js-res-icon';
    icon.style.color = ok ? 'var(--success)' : 'var(--danger)';
    icon.textContent = ok ? 'Correcto' : 'Error';

    row.appendChild(pos); row.appendChild(card); row.appendChild(icon);
    orderDiv.appendChild(row);
  });
}

function nextRound() {
  STATE.round++;
  if (STATE.round % 4 === 0 && STATE.round > 0) {
    document.getElementById('warning-modal').classList.remove('hidden');
  }
  STATE.captainIdx = (STATE.captainIdx + 1) % STATE.players.length;
  pickPromptAndAssign();
  renderCaptainScreen();
  showScreen('s-captain');
}

function endGame() {
  document.getElementById('btn-end-global').classList.add('hidden');
  const list = document.getElementById('final-scoreboard-list');
  const sorted = [...STATE.players].sort((a, b) => b.score - a.score);
  list.innerHTML = generatePodiumHTML(sorted);
  showScreen('s-final');
}

function resetGame() {
  document.getElementById('btn-end-global').classList.add('hidden');
  STATE = { players: [], captainIdx: 0, assignments: {}, sortOrder: [], captainOrder: [], usedPrompts: [], promptIdx: 0, secretIdx: 0, seenCount: 0, revealed: false, round: 1, selectedCategory: 'all' };
  renderPlayerInputs(['', '', '']);
  showScreen('s-setup');
}

// Inicialización
renderPlayerInputs(['', '', '']);
window.onload = () => { openRulesModal(); };