const PROMPTS=[
  {text:"Haces una fiesta sorpresa para tu mamá, ¿cómo se sorprende?", scale:"1: Nada - 10: Se desmaya del susto"},
  {text:"Tu ex te manda un mensaje a las 2am, ¿cómo reaccionás?", scale:"1: Lo ignorás - 10: Crisis existencial total"},
  {text:"Tenés que hablar en público ante 100 personas, ¿cómo te sentís?", scale:"1: Re cómodo/a - 10: Preferís morir"},
  {text:"Un amigo llega 1 hora tarde a tu cumple, ¿qué tan enojado/a estás?", scale:"1: Ni me importa - 10: Lo borrás de tu vida"},
  {text:"Ves a tu crush de sorpresa en el súper, ¿cuánto te ponés nervioso/a?", scale:"1: Normal - 10: Salís corriendo"},
  {text:"Te ofrecen comer un insecto vivo por plata, ¿cuánto te cuesta decidirte?", scale:"1: Lo comés sin pensar - 10: Jamás en la vida"},
  {text:"Tus padres piden revisar tu celular ahora mismo, ¿cómo te ponés?", scale:"1: Sin drama - 10: Te vas del país"},
  {text:"Perdés el Wi-Fi por todo el fin de semana, ¿cómo lo manejás?", scale:"1: Ni lo notás - 10: Abstinencia total"}
];

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

let STATE={players:[],captainIdx:0,assignments:{},sortOrder:[],captainOrder:[],usedPrompts:[],promptIdx:0,secretIdx:0,seenCount:0,revealed:false, round:1};

/* ---- TEMA CLARO/OSCURO ---- */
function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  root.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
}

/* ---- MODALES DE REGLAS, TABLA Y AVISO ---- */
function openRulesModal() {
  document.getElementById('rules-modal').style.display = 'flex';
}
function closeRulesModal() {
  document.getElementById('rules-modal').style.display = 'none';
}

function openScoreModal() {
  const list = document.getElementById('modal-scoreboard-list');
  const sorted = [...STATE.players].sort((a,b)=>b.score-a.score);
  list.innerHTML = generatePodiumHTML(sorted);
  document.getElementById('score-modal').style.display = 'flex';
}
function closeScoreModal() {
  document.getElementById('score-modal').style.display = 'none';
}

function closeWarningModal() {
  document.getElementById('warning-modal').style.display = 'none';
}

/* ---- GENERADOR DE PODIO Y TABLA ---- */
function generatePodiumHTML(sortedPlayers) {
  if (sortedPlayers.length === 0) return '<p class="dimmed" style="text-align:center;font-size:13px;">Agregá jugadores para ver los puntajes.</p>';

  let html = '<div class="podium-container">';
  if(sortedPlayers[1]) {
      html += `<div class="podium-place podium-2"><div class="podium-name">${sortedPlayers[1].name}</div><div class="podium-score">${sortedPlayers[1].score}</div></div>`;
  }
  if(sortedPlayers[0]) {
      html += `<div class="podium-place podium-1"><div class="podium-name">${sortedPlayers[0].name}</div><div class="podium-score">${sortedPlayers[0].score}</div></div>`;
  }
  if(sortedPlayers[2]) {
      html += `<div class="podium-place podium-3"><div class="podium-name">${sortedPlayers[2].name}</div><div class="podium-score">${sortedPlayers[2].score}</div></div>`;
  }
  html += '</div>';

  for(let i = 3; i < sortedPlayers.length; i++) {
      let p = sortedPlayers[i];
      html += `<div class="score-row">
          <span><span style="color:var(--text-dimmed);margin-right:8px;">${i+1}.</span> ${p.name}</span>
          <span style="color:${p.score > 0 ? 'var(--success)' : p.score < 0 ? 'var(--danger)' : 'var(--text-dimmed)'}">${p.score}</span>
      </div>`;
  }
  return html;
}

function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));const el=document.getElementById(id);el.classList.add('active');el.classList.remove('fade-in');void el.offsetWidth;el.classList.add('fade-in');}

/* ---- SETUP ---- */
function renderPlayerInputs(vals){
  const c=document.getElementById('players-container');
  c.innerHTML='';
  vals.forEach((v,i)=>{
    const row=document.createElement('div');
    row.style.cssText='display:flex;gap:8px;margin-bottom:10px;align-items:center;';
    const badge=document.createElement('div');
    badge.style.cssText='width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;';
    badge.textContent=i+1;
    
    const inp=document.createElement('input');
    inp.value=v; inp.placeholder='Jugador '+(i+1); inp.maxLength=14;
    
    const removeBtn=document.createElement('button');
    removeBtn.style.cssText='width:30px;height:30px;border:1px solid var(--danger);background:transparent;border-radius:8px;cursor:pointer;color:var(--danger);font-size:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center;';
    removeBtn.innerHTML='&times;';
    
    removeBtn.onclick=()=>{
      const cur=getInputValues();
      if(cur.length<=3){
          const err = document.getElementById('setup-error');
          err.textContent = 'El mínimo de jugadores es de 3 👀';
          err.style.display = 'block';
          setTimeout(() => err.style.display = 'none', 3000);
          return;
      }
      cur.splice(i,1);
      renderPlayerInputs(cur);
    };
    
    row.appendChild(badge);row.appendChild(inp);row.appendChild(removeBtn);
    c.appendChild(row);
  });
  
  if(vals.length<10){
    const addBtn=document.createElement('button');
    addBtn.style.cssText='width:100%;padding:10px;background:transparent;border:1px dashed var(--secondary);border-radius:10px;color:var(--secondary);cursor:pointer;font-family:Poppins,sans-serif;font-weight:600;font-size:13px;margin-top:5px;';
    addBtn.textContent='+ Agregar jugador';
    addBtn.onclick=()=>{const cur=getInputValues();cur.push('');renderPlayerInputs(cur);};
    c.appendChild(addBtn);
  }
}
function getInputValues(){return [...document.querySelectorAll('#players-container input')].map(i=>i.value);}

function startGame(){
  const vals=getInputValues().map(v=>v.trim()).filter(Boolean);
  const err=document.getElementById('setup-error');
  if(vals.length<3){err.textContent='Necesitás al menos 3 jugadores';err.style.display='block';return;}
  if(new Set(vals.map(v=>v.toLowerCase())).size!==vals.length){err.textContent='Los nombres deben ser únicos';err.style.display='block';return;}
  err.style.display='none';
  
  // Mostrar el botón FIN global al empezar la partida
  document.getElementById('btn-end-global').style.display = 'block';

  STATE.players=vals.map(n=>({name:n,score:0}));
  STATE.usedPrompts=[];
  STATE.captainIdx=Math.floor(Math.random()*STATE.players.length);
  pickPromptAndAssign();
  renderCaptainScreen();
  showScreen('s-captain');
}
function pickPromptAndAssign(){
  const avail=PROMPTS.map((_,i)=>i).filter(i=>!STATE.usedPrompts.includes(i));
  STATE.promptIdx=avail.length?avail[Math.floor(Math.random()*avail.length)]:Math.floor(Math.random()*PROMPTS.length);
  STATE.usedPrompts=[...STATE.usedPrompts,STATE.promptIdx];
  if(STATE.usedPrompts.length>PROMPTS.length)STATE.usedPrompts=[];
  const actors=getActors();
  const nums=shuffle([1,2,3,4,5,6,7,8,9,10]).slice(0,actors.length);
  STATE.assignments={};
  actors.forEach((n,i)=>STATE.assignments[n]=nums[i]);
}
function getActors(){return STATE.players.filter((_,i)=>i!==STATE.captainIdx).map(p=>p.name);}
function getCaptain(){return STATE.players[STATE.captainIdx].name;}

/* ---- CAPTAIN ---- */
function renderCaptainScreen(){
  document.getElementById('captain-name').textContent=getCaptain();
  const p=PROMPTS[STATE.promptIdx];
  document.getElementById('prompt-text').textContent=p.text;
  document.getElementById('prompt-scale').textContent='Escala: '+p.scale;
}

// Nueva función para saltar consigna
function skipPrompt() {
  pickPromptAndAssign();
  renderCaptainScreen();
}

function goToSecret(){
  STATE.secretIdx=0;STATE.seenCount=0;STATE.revealed=false;
  renderSecretScreen();
  showScreen('s-secret');
}

/* ---- SECRET ---- */
function renderSecretScreen(){
  const actors=getActors();
  const cur=actors[STATE.secretIdx];
  const hint=document.getElementById('secret-hint');
  const done=document.getElementById('secret-done');
  const counter=document.getElementById('secret-counter');
  const progress=document.getElementById('secret-progress');
  const allSeen=STATE.seenCount===actors.length;
  
  counter.textContent=STATE.seenCount+'/'+actors.length;
  progress.style.width=(STATE.seenCount/actors.length*100)+'%';
  
  if(allSeen){
    hint.textContent=''; done.style.display='block';
  } else {
    hint.textContent='Toca tu nombre, '+cur; done.style.display='none';
  }
  buildSecretGrid(actors,allSeen);
}

function buildSecretGrid(actors,allSeen){
  const grid=document.getElementById('secret-grid');
  grid.innerHTML='';
  actors.forEach((name,i)=>{
    const isCur=name===actors[STATE.secretIdx];
    const hasSeen=i<STATE.seenCount;
    const isRev=isCur&&STATE.revealed;
    const btn=document.createElement('button');
    btn.className='num-btn';
    
    if(hasSeen) {
        btn.style.borderColor='var(--success)'; btn.style.background='rgba(32, 212, 137, 0.1)';
    } else if(isCur) {
        btn.style.borderColor='var(--primary)';
    } else {
        btn.style.borderColor='var(--card-border)'; btn.style.opacity='0.6';
    }

    if(isRev){
      btn.innerHTML='<div class="zoom-in" style="text-align:center"><div style="font-size:42px;font-weight:900;color:var(--secondary);line-height:1;">'+STATE.assignments[name]+'</div><div style="font-size:10px;color:var(--text-dimmed);margin-top:4px;">toca para ocultar</div></div>';
      btn.onclick=()=>{
        STATE.revealed=false; 
        STATE.seenCount++; 
        STATE.secretIdx++; 
        renderSecretScreen();
      };
    }else{
      btn.innerHTML='<div>'+name+'</div>'+(hasSeen?'<div style="font-size:10px;color:var(--success);margin-top:4px;">Visto</div>':'');
      btn.onclick=()=>{
        if(!isCur||STATE.revealed||hasSeen) return;
        STATE.revealed=true; 
        renderSecretScreen();
      };
    }
    grid.appendChild(btn);
  });
}

function goToSort(){
  const actors=getActors();
  STATE.sortOrder=shuffle([...actors]);
  renderSortScreen();
  showScreen('s-sort');
}

/* ---- SORT (Drag & Drop) ---- */
function renderSortScreen(){
  const list=document.getElementById('sort-list');
  document.getElementById('sort-captain').textContent=getCaptain();
  list.innerHTML='';
  STATE.sortOrder.forEach((name,i)=>{
    const row=document.createElement('div');
    row.className='order-row fade-in';
    row.dataset.name = name; 
    row.style.animationDelay=(i*0.05)+'s';
    
    const badge=document.createElement('div');badge.className='order-badge';badge.textContent=i+1;
    const nameDiv=document.createElement('div');nameDiv.className='order-name';nameDiv.textContent=name;
    const handle=document.createElement('div');handle.className='drag-handle';handle.innerHTML='&#8801;';
    
    row.appendChild(badge);row.appendChild(nameDiv);row.appendChild(handle);
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

function revealResult(){
  STATE.captainOrder=[...STATE.sortOrder];
  const correct=Object.entries(STATE.assignments).sort((a,b)=>a[1]-b[1]).map(([n])=>n);
  let delta=0;
  STATE.captainOrder.forEach((name,i)=>{if(name===correct[i])delta++;else delta--;});
  STATE.players=STATE.players.map((p,i)=>i===STATE.captainIdx?{...p,score:p.score+delta}:p);
  renderResults(delta,correct);
  showScreen('s-results');
}

/* ---- RESULTS ---- */
function renderResults(delta,correctOrder){
  document.getElementById('res-captain').textContent=getCaptain();
  const d=document.getElementById('res-delta');
  d.textContent=(delta>0?'+':'')+delta;
  d.style.color=delta>=0?'var(--success)':'var(--danger)';
  
  const orderDiv=document.getElementById('res-order');
  orderDiv.innerHTML='';
  correctOrder.forEach((name,i)=>{
    const ok=STATE.captainOrder[i]===name;
    const row=document.createElement('div');row.className='result-row fade-in';row.style.animationDelay=(i*0.08)+'s';
    
    const pos=document.createElement('div');pos.className='result-pos';
    pos.style.cssText='border:2px solid '+(ok?'var(--success)':'var(--danger)')+';color:'+(ok?'var(--success)':'var(--danger)')+';';
    pos.textContent=i+1;
    
    const card=document.createElement('div');card.className='result-card';
    card.style.cssText='background:var(--card-bg);border:1px solid '+(ok?'var(--success)':'var(--danger)')+';';
    card.innerHTML='<span style="font-weight:600;font-size:14px;">'+name+'</span><span style="font-weight:800;font-size:18px;color:var(--secondary);">'+STATE.assignments[name]+'</span>';
    
    const icon=document.createElement('span');
    icon.style.cssText='font-size:12px;font-weight:bold;color:'+(ok?'var(--success)':'var(--danger)')+';';
    icon.textContent=ok?'Correcto':'Error';
    
    row.appendChild(pos);row.appendChild(card);row.appendChild(icon);
    orderDiv.appendChild(row);
  });
}

function nextRound(){
  STATE.round++;
  
  // Aparece el modal cada vez que se juega un múltiplo exacto de 4 rondas
  if (STATE.round % 4 === 0 && STATE.round > 0) {
      document.getElementById('warning-modal').style.display = 'flex';
  }
  
  STATE.captainIdx=(STATE.captainIdx+1)%STATE.players.length;
  pickPromptAndAssign();
  renderCaptainScreen();
  showScreen('s-captain');
}

/* ---- FIN DEL JUEGO ---- */
function endGame(){
  // Ocultar el botón global al llegar al final
  document.getElementById('btn-end-global').style.display = 'none';
  
  const list = document.getElementById('final-scoreboard-list');
  const sorted = [...STATE.players].sort((a,b)=>b.score-a.score);
  list.innerHTML = generatePodiumHTML(sorted);
  showScreen('s-final');
}

function resetGame(){
  document.getElementById('btn-end-global').style.display = 'none';
  STATE={players:[],captainIdx:0,assignments:{},sortOrder:[],captainOrder:[],usedPrompts:[],promptIdx:0,secretIdx:0,seenCount:0,revealed:false,round:1};
  renderPlayerInputs(['','','']);
  showScreen('s-setup');
}

// Init
renderPlayerInputs(['','','']);

// Mostrar Reglas automáticamente la primera vez que se carga la página
window.onload = () => {
    openRulesModal();
};