const MISSIONS=[
  {id:1,title:'⭐ Star repo ini di GitHub',reward:10},
  {id:2,title:'🍴 Fork repo ini',reward:15},
  {id:3,title:'👀 Follow pemilik repo',reward:10},
  {id:4,title:'📝 Buat issue di repo',reward:20},
  {id:5,title:'📢 Share project ini',reward:25},
];
const state={completed:JSON.parse(localStorage.getItem('missions')||'[]')};
const listEl=document.getElementById('missionList');
const btnClaim=document.getElementById('claimBtn');
const toastEl=document.getElementById('toast');
MISSIONS.forEach(m=>{
  const done=state.completed.includes(m.id);
  const el=document.createElement('div');
  el.className='mission'+(done?' done':'');
  el.innerHTML=`<div class="mission-info"><div class="mission-title">${m.title}</div><div class="mission-reward">+${m.reward} poin</div></div><button class="btn-do" ${done?'disabled':''}>${done?'✅ Selesai':'Kerjakan'}</button>`;
  el.querySelector('button').onclick=()=>completeMission(m.id);
  listEl.appendChild(el);
});
function completeMission(id){
  if(state.completed.includes(id))return;
  state.completed.push(id);
  localStorage.setItem('missions',JSON.stringify(state.completed));
  showToast('🎉 Misi selesai! +poin ditambahkan');
  setTimeout(()=>location.reload(),600);
}
function updateStats(){
  const totalPoin=state.completed.reduce((s,id)=>{const m=MISSIONS.find(x=>x.id===id);return s+(m?m.reward:0);},0);
  document.getElementById('totalMissions').textContent=MISSIONS.length;
  document.getElementById('doneMissions').textContent=state.completed.length;
  document.getElementById('totalReward').textContent=totalPoin;
  btnClaim.disabled=state.completed.length<MISSIONS.length;
}
function showToast(msg){toastEl.textContent=msg;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),2500);}
btnClaim.onclick=()=>{showToast('💰 Selamat! Kamu mendapat reward penuh! 🎁');localStorage.removeItem('missions');setTimeout(()=>location.reload(),2000);};
updateStats();
