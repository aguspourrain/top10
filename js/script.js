const PROMPTS=[
  {text:"Haces una fiesta sorpresa para tu mamá, ¿cómo se sorprende?",scale:"1 = nada · 10 = se desmaya del susto"},
  {text:"Tu ex te manda un mensaje a las 2am, ¿cómo reaccionás?",scale:"1 = lo ignorás · 10 = crisis existencial total"},
  {text:"Tenés que hablar en público ante 100 personas, ¿cómo te sentís?",scale:"1 = re cómodo/a · 10 = preferís morir"},
  {text:"Un amigo llega 1 hora tarde a tu cumple, ¿qué tan enojado/a estás?",scale:"1 = ni me importa · 10 = lo borrás de tu vida"},
  {text:"Ves a tu crush de sorpresa en el súper, ¿cuánto te ponés nervioso/a?",scale:"1 = normal · 10 = salís corriendo"},
  {text:"Te ofrecen comer un insecto vivo por plata, ¿cuánto te cuesta decidirte?",scale:"1 = lo comés sin pensar · 10 = jamás en la vida"},
  {text:"Tus padres piden revisar tu celular ahora mismo, ¿cómo te ponés?",scale:"1 = sin drama · 10 = te vas del país"},
  {text:"Perdés el Wi-Fi por todo el fin de semana, ¿cómo lo manejás?",scale:"1 = ni lo notás · 10 = abstinencia total"},
  {text:"Llega el momento de pagar la cuenta, ¿qué tan rápido sacás la billetera?",scale:"1 = sos el primero · 10 = te hacés el distraído"},
  {text:"El profe te dio nota de más por error, ¿qué hacés?",scale:"1 = lo decís enseguida · 10 = no hablás nunca"},
  {text:"Llegás tarde y tu jefe/profe te mira cuando entrás, ¿cuánto te morís?",scale:"1 = nada · 10 = querés que te trague la tierra"},
  {text:"Te piden organizar el plan del finde para todo el grupo, ¿cuántas ganas tenés?",scale:"1 = ninguna · 10 = ya tenés el itinerario armado"},
  {text:"Encontrás una araña enorme en tu habitación, ¿cómo reaccionás?",scale:"1 = la agarrás con la mano · 10 = dormís en otro barrio"},
  {text:"Llegaste con hambre y no hay nada para comer, ¿cómo te ponés?",scale:"1 = sin drama · 10 = crisis existencial"},
  {text:"Te piden que cuides un bebé ajeno por una tarde, ¿cuánto miedo te da?",scale:"1 = con gusto · 10 = te inventás un viaje"},
  {text:"Recibís un correo que empieza con 'Necesitamos hablar', ¿cuánto te asusta?",scale:"1 = tranquilo/a · 10 = pánico total"},
  {text:"Tenés que pedir un favor grande a alguien, ¿cuánto te cuesta pedirlo?",scale:"1 = lo pedís sin drama · 10 = preferís no pedirlo"},
  {text:"Alguien te canta el feliz cumpleaños en público, ¿cómo te sentís?",scale:"1 = lo disfrutás · 10 = querés desaparecer"},
];

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

let STATE={players:[],captainIdx:0,assignments:{},sortOrder:[],captainOrder:[],usedPrompts:[],promptIdx:0,secretIdx:0,seenCount:0,revealed:false,readyNext:false};

function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));const el=document.getElementById(id);el.classList.add('active');el.classList.remove('fade-in');void el.offsetWidth;el.classList.add('fade-in');}

/* ---- SETUP ---- */
function buildSetupUI(){
  const c=document.getElementById('players-container');
  const rows=STATE.players.length||0;
  const names=STATE.players.map(p=>p.name);
  let count=Math.max(3,names.length);
  const vals=Array.from({length:count},(_, i)=>names[i]||'');
  renderPlayerInputs(vals);
}
function renderPlayerInputs(vals){
  const c=document.getElementById('players-container');
  c.innerHTML='';
  vals.forEach((v,i)=>{
    const row=document.createElement('div');
    row.style.cssText='display:flex;gap:8px;margin-bottom:10px;align-items:center;';
    const badge=document.createElement('div');
    badge.style.cssText='width:28px;height:28px;border-radius:50%;background:#6B35C7;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;';
    badge.textContent=i+1;
    const inp=document.createElement('input');
    inp.value=v; inp.placeholder='Jugador '+(i+1); inp.maxLength=14;
    inp.oninput=()=>syncInputs();
    const removeBtn=document.createElement('button');
    removeBtn.style.cssText='width:30px;height:30px;border:1px solid rgba(255,68,102,0.4);background:rgba(255,68,102,0.15);border-radius:8px;cursor:pointer;color:#FF4466;font-size:16px;flex-shrink:0;';
    removeBtn.innerHTML='&times;';
    removeBtn.onclick=()=>{const cur=getInputValues();cur.splice(i,1);if(cur.length<3)cur.push('');renderPlayerInputs(cur);};
    if(vals.length<=3)removeBtn.disabled=true;
    row.appendChild(badge);row.appendChild(inp);row.appendChild(removeBtn);
    c.appendChild(row);
  });
  if(vals.length<10){
    const addBtn=document.createElement('button');
    addBtn.style.cssText='width:100%;padding:10px;background:rgba(0,229,255,0.07);border:1px dashed rgba(0,229,255,0.35);border-radius:10px;color:#00E5FF;cursor:pointer;font-family:Exo 2,sans-serif;font-weight:600;font-size:14px;margin-top:2px;';
    addBtn.textContent='+ Agregar jugador';
    addBtn.onclick=()=>{const cur=getInputValues();cur.push('');renderPlayerInputs(cur);};
    c.appendChild(addBtn);
  }
}
function getInputValues(){return [...document.querySelectorAll('#players-container input')].map(i=>i.value);}
function syncInputs(){}

function startGame(){
  const vals=getInputValues().map(v=>v.trim()).filter(Boolean);
  const err=document.getElementById('setup-error');
  if(vals.length<3){err.textContent='Necesitás al menos 3 jugadores 👀';err.style.display='block';return;}
  if(new Set(vals.map(v=>v.toLowerCase())).size!==vals.length){err.textContent='Los nombres deben ser únicos';err.style.display='block';return;}
  err.style.display='none';
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
  assignNumbers();
}
function assignNumbers(){
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
  document.getElementById('prompt-scale').textContent='📊 '+p.scale;
}
function goToSecret(){
  const actors=getActors();
  STATE.secretIdx=0;STATE.seenCount=0;STATE.revealed=false;STATE.readyNext=false;
  renderSecretScreen();
  showScreen('s-secret');
}

/* ---- SECRET ---- */
function renderSecretScreen(){
  const actors=getActors();
  const cur=actors[STATE.secretIdx];
  const hint=document.getElementById('secret-hint');
  const btnNext=document.getElementById('btn-next-player');
  const done=document.getElementById('secret-done');
  const counter=document.getElementById('secret-counter');
  const progress=document.getElementById('secret-progress');
  const allSeen=STATE.seenCount===actors.length;
  counter.textContent=STATE.seenCount+'/'+actors.length;
  progress.style.width=(STATE.seenCount/actors.length*100)+'%';
  if(allSeen){hint.textContent='';btnNext.style.display='none';done.style.display='block';}
  else{hint.textContent=STATE.readyNext?'Pasá el celular a '+(actors[STATE.secretIdx+1]||'...'):'Toca tu nombre, '+cur;btnNext.style.display=STATE.readyNext?'block':'none';done.style.display='none';}
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
    btn.style.borderColor=hasSeen?'#00FF88':isCur&&!STATE.readyNext?'#6B35C7':'rgba(107,53,199,0.25)';
    btn.style.background=hasSeen?'rgba(0,255,136,0.1)':isCur&&!STATE.readyNext?'rgba(107,53,199,0.5)':'rgba(107,53,199,0.12)';
    btn.style.boxShadow=isCur&&!STATE.readyNext&&!hasSeen?'0 0 20px rgba(107,53,199,0.5)':'none';
    btn.style.cursor=isCur&&!STATE.readyNext?'pointer':'default';
    if(isRev){
      btn.innerHTML='<div class="zoom-in" style="text-align:center"><div style="font-family:Orbitron,sans-serif;font-size:52px;font-weight:900;color:#00E5FF;text-shadow:0 0 20px #00E5FF,0 0 40px #00E5FF;line-height:1;">'+STATE.assignments[name]+'</div><div style="font-size:10px;color:#8899AA;margin-top:4px;">toca para ocultar</div></div>';
      btn.onclick=()=>{if(!STATE.revealed)return;STATE.revealed=false;STATE.seenCount++;STATE.readyNext=true;renderSecretScreen();};
    }else{
      btn.innerHTML='<div style="font-weight:700;font-size:15px;">'+name+'</div>'+(hasSeen?'<div style="font-size:11px;color:#00FF88;margin-top:4px;">✓ Visto</div>':'');
      btn.onclick=()=>{if(!isCur||STATE.revealed||STATE.readyNext||hasSeen)return;STATE.revealed=true;renderSecretScreen();};
    }
    grid.appendChild(btn);
  });
}
function nextPlayer(){STATE.secretIdx++;STATE.revealed=false;STATE.readyNext=false;renderSecretScreen();}
function goToSort(){
  const actors=getActors();
  STATE.sortOrder=shuffle([...actors]);
  renderSortScreen();
  showScreen('s-sort');
}

/* ---- SORT ---- */
function renderSortScreen(){
  const actors=getActors();
  document.getElementById('sort-captain').textContent=getCaptain();
  document.getElementById('sort-max-label').textContent='MÁS · '+actors.length;
  const list=document.getElementById('sort-list');
  list.innerHTML='';
  STATE.sortOrder.forEach((name,i)=>{
    const row=document.createElement('div');
    row.className='order-row fade-in';
    row.style.animationDelay=(i*0.06)+'s';
    const badge=document.createElement('div');badge.className='order-badge';badge.textContent=i+1;
    const nameDiv=document.createElement('div');nameDiv.className='order-name';nameDiv.textContent=name;
    const arrs=document.createElement('div');arrs.style.cssText='display:flex;flex-direction:column;gap:3px;';
    const up=document.createElement('button');up.className='arr-btn';up.textContent='▲';up.disabled=i===0;up.onclick=()=>moveItem(i,-1);
    const dn=document.createElement('button');dn.className='arr-btn';dn.textContent='▼';dn.disabled=i===STATE.sortOrder.length-1;dn.onclick=()=>moveItem(i,1);
    arrs.appendChild(up);arrs.appendChild(dn);
    row.appendChild(badge);row.appendChild(nameDiv);row.appendChild(arrs);
    list.appendChild(row);
  });
}
function moveItem(i,dir){
  const j=i+dir;if(j<0||j>=STATE.sortOrder.length)return;
  [STATE.sortOrder[i],STATE.sortOrder[j]]=[STATE.sortOrder[j],STATE.sortOrder[i]];
  renderSortScreen();
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
  d.style.color=delta>=0?'#00FF88':'#FF4466';
  d.style.textShadow='0 0 25px '+(delta>=0?'#00FF88':'#FF4466');
  const orderDiv=document.getElementById('res-order');
  orderDiv.innerHTML='';
  correctOrder.forEach((name,i)=>{
    const ok=STATE.captainOrder[i]===name;
    const row=document.createElement('div');row.className='result-row fade-in';row.style.animationDelay=(i*0.08)+'s';
    const pos=document.createElement('div');pos.className='result-pos';
    pos.style.cssText='width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;background:'+(ok?'rgba(0,255,136,0.2)':'rgba(255,68,102,0.2)')+';border:2px solid '+(ok?'#00FF88':'#FF4466')+';color:'+(ok?'#00FF88':'#FF4466')+';';
    pos.textContent=i+1;
    const card=document.createElement('div');card.className='result-card';
    card.style.cssText='flex:1;display:flex;align-items:center;justify-content:space-between;border-radius:12px;padding:10px 14px;background:'+(ok?'rgba(0,255,136,0.08)':'rgba(255,68,102,0.08)')+';border:1px solid '+(ok?'rgba(0,255,136,0.3)':'rgba(255,68,102,0.3)')+';';
    card.innerHTML='<span style="font-weight:600;">'+name+'</span><span style="font-family:Orbitron,sans-serif;font-weight:900;font-size:22px;color:#00E5FF;">'+STATE.assignments[name]+'</span>';
    const icon=document.createElement('span');icon.style.fontSize='18px';icon.textContent=ok?'✅':'❌';
    row.appendChild(pos);row.appendChild(card);row.appendChild(icon);
    orderDiv.appendChild(row);
  });
  const medals=['🥇','🥈','🥉'];
  const sorted=[...STATE.players].sort((a,b)=>b.score-a.score);
  const sb=document.getElementById('res-scoreboard');sb.innerHTML='';
  sorted.forEach((p,i)=>{
    const row=document.createElement('div');row.className='score-row';
    row.style.background=p.name===getCaptain()?'rgba(255,215,0,0.08)':'transparent';
    const m=document.createElement('span');m.style.cssText='width:24px;font-size:16px;';m.textContent=medals[i]||(i+1)+'.'
    const n=document.createElement('span');n.style.cssText='flex:1;font-weight:600;';n.textContent=p.name;
    const s=document.createElement('span');
    s.style.cssText='font-family:Orbitron,sans-serif;font-weight:700;font-size:18px;color:'+(p.score>0?'#00FF88':p.score<0?'#FF4466':'#8899AA')+';';
    s.textContent=p.score;
    row.appendChild(m);row.appendChild(n);row.appendChild(s);
    sb.appendChild(row);
  });
}
function nextRound(){
  STATE.captainIdx=(STATE.captainIdx+1)%STATE.players.length;
  pickPromptAndAssign();
  renderCaptainScreen();
  showScreen('s-captain');
}
function endGame(){
  STATE={players:[],captainIdx:0,assignments:{},sortOrder:[],captainOrder:[],usedPrompts:[],promptIdx:0,secretIdx:0,seenCount:0,revealed:false,readyNext:false};
  renderPlayerInputs(['','','']);
  showScreen('s-setup');
}

// Init
renderPlayerInputs(['','','']);
