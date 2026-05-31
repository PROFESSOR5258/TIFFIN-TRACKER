// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App












import { useState, useEffect, useRef } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_FULL = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const DAYS_SHORT = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const USERS = ["prathmesh","aditya"];
const USER_LABELS = { prathmesh:"Prathmesh", aditya:"Aditya" };
const USER_INITIALS = { prathmesh:"P", aditya:"A" };

function dateKey(date){ return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`; }
function today(){ return new Date(); }
function parseKey(k){ const [y,m,d]=k.split("-").map(Number); return new Date(y,m-1,d); }

/* ─── Edit Modal ─────────────────────────────────────────────────────────── */
function EditModal({ dateStr, entry, user, onSave, onDelete, onClose }){
  const d = parseKey(dateStr);
  const label = d.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const [status,setStatus] = useState(entry?.status||"taken");
  const [reason,setReason] = useState(entry?.reason||"");
  const inputRef = useRef(null);
  useEffect(()=>{ if(status==="missed") setTimeout(()=>inputRef.current?.focus(),80); },[status]);

  return(
    <div style={M.overlay} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={M.modal}>
        <div style={M.mHead}>
          <div>
            <div style={M.mTitle}>Edit Entry</div>
            <div style={M.mSub}>{label}</div>
          </div>
          <button onClick={onClose} style={M.closeBtn}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div style={M.userPill}>
          <div style={M.userDot}/>
          <span style={M.userPillName}>{USER_LABELS[user]}</span>
        </div>
        <div style={M.toggleRow}>
          <button onClick={()=>setStatus("taken")} style={{...M.toggleBtn,...(status==="taken"?M.toggleTaken:{})}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 8.5l4 4 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Taken
          </button>
          <button onClick={()=>setStatus("missed")} style={{...M.toggleBtn,...(status==="missed"?M.toggleMissed:{})}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Missed
          </button>
        </div>
        {status==="missed"&&(
          <input ref={inputRef} value={reason} onChange={e=>setReason(e.target.value)}
            placeholder="Reason for missing (optional)" style={M.reasonInput}
            onKeyDown={e=>e.key==="Enter"&&onSave(dateStr,{status,reason:reason.trim(),ts:Date.now()})}/>
        )}
        <div style={M.mFooter}>
          <button onClick={()=>onSave(dateStr,{status,reason:status==="missed"?reason.trim():"",ts:Date.now()})} style={M.saveBtn}>Save Changes</button>
          {entry&&<button onClick={()=>onDelete(dateStr)} style={M.removeBtn}>Remove</button>}
        </div>
      </div>
    </div>
  );
}

/* ─── Streak flame ───────────────────────────────────────────────────────── */
function FlameIcon({ active }){
  return(
    <svg width="18" height="22" viewBox="0 0 22 28" fill="none">
      <path d="M11 2C11 2 14 6 14 10C14 10 17 8 17 5C17 5 22 10 22 16C22 22.627 17.075 28 11 28C4.925 28 0 22.627 0 16C0 10 5 5 5 5C5 5 5 9 8 10C8 6 11 2 11 2Z"
        fill={active?"url(#fl)":"rgba(255,255,255,0.15)"}/>
      <defs>
        <linearGradient id="fl" x1="11" y1="2" x2="11" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A"/>
          <stop offset="100%" stopColor="#F59E0B"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Mini bar sparkline ─────────────────────────────────────────────────── */
function MonthBars({ userData, year, month }){
  const dim = new Date(year,month+1,0).getDate();
  const bars = [];
  for(let d=1;d<=dim;d++){
    const k=`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    bars.push({ d, status: userData[k]?.status||null });
  }
  const W=480, H=40, gap=2;
  const bw = Math.floor((W - gap*(dim-1)) / dim);
  return(
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",display:"block"}}>
      {bars.map((b,i)=>{
        const x = i*(bw+gap);
        const col = b.status==="taken" ? "#22c55e" : b.status==="missed" ? "#f87171" : "rgba(255,255,255,0.07)";
        const h = b.status==="taken" ? H : b.status==="missed" ? H*0.65 : H*0.18;
        return <rect key={i} x={x} y={H-h} width={bw} height={h} rx="2" fill={col}/>;
      })}
    </svg>
  );
}

/* ─── Main App ───────────────────────────────────────────────────────────── */
export default function App(){
  const [user,setUser] = useState("prathmesh");
  const [data,setData] = useState({prathmesh:{},aditya:{}});
  const [viewMonth,setViewMonth] = useState(()=>{ const t=new Date(); return new Date(t.getFullYear(),t.getMonth(),1); });
  const [showMissedForm,setShowMissedForm] = useState(false);
  const [missedReason,setMissedReason] = useState("");
  const [toast,setToast] = useState(null);
  const [showHistory,setShowHistory] = useState(false);
  const [editModal,setEditModal] = useState(null);
  const reasonRef = useRef(null);
  const todayKey = dateKey(today());

  useEffect(()=>{
    try{
      const raw = localStorage.getItem("tiffin-v3");
      if(raw) setData(JSON.parse(raw));
    }catch(e){}
  },[]);

  async function save(nd){
    setData(nd);
    try{ localStorage.setItem("tiffin-v3", JSON.stringify(nd)); }catch(e){}
  }
  function showToast(msg,type="ok"){ setToast({msg,type}); setTimeout(()=>setToast(null),2600); }

  async function markTaken(){
    await save({...data,[user]:{...data[user],[todayKey]:{status:"taken",ts:Date.now()}}});
    setShowMissedForm(false); showToast("Marked as taken.");
  }
  async function markMissed(){
    await save({...data,[user]:{...data[user],[todayKey]:{status:"missed",reason:missedReason.trim(),ts:Date.now()}}});
    setShowMissedForm(false); setMissedReason(""); showToast("Logged as missed.","warn");
  }
  async function undoToday(){
    const ud={...data[user]}; delete ud[todayKey];
    await save({...data,[user]:ud}); showToast("Entry cleared.");
  }
  async function handleEditSave(ds,entry){
    await save({...data,[user]:{...data[user],[ds]:entry}});
    setEditModal(null);
    showToast(`${parseKey(ds).toLocaleDateString("en-IN",{day:"numeric",month:"short"})} updated.`);
  }
  async function handleEditDelete(ds){
    const ud={...data[user]}; delete ud[ds];
    await save({...data,[user]:ud}); setEditModal(null); showToast("Entry removed.");
  }

  function getStats(u,y,m){
    const ud=data[u]||{}; let taken=0,missed=0;
    const dim=new Date(y,m+1,0).getDate();
    for(let d=1;d<=dim;d++){
      const k=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      if(ud[k]) ud[k].status==="taken"?taken++:missed++;
    }
    return {taken,missed};
  }
  function getStreak(u){
    const ud=data[u]||{}; let s=0,d=new Date(today());
    while(true){ const k=dateKey(d); if(ud[k]?.status==="taken"){s++;d.setDate(d.getDate()-1);}else break; }
    return s;
  }
  function getCalDays(){
    const y=viewMonth.getFullYear(),m=viewMonth.getMonth();
    const first=new Date(y,m,1).getDay(), dim=new Date(y,m+1,0).getDate();
    const ud=data[user]||{}, t=today(), days=[];
    for(let i=0;i<first;i++) days.push(null);
    for(let d=1;d<=dim;d++){
      const k=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      const cellDate = new Date(y,m,d);
      days.push({ d, k, entry:ud[k]||null,
        isToday: y===t.getFullYear()&&m===t.getMonth()&&d===t.getDate(),
        isFuture: cellDate > t,
        dayOfWeek: cellDate.getDay()
      });
    }
    return days;
  }
  function getHistory(u,limit=15){
    return Object.entries(data[u]||{})
      .sort((a,b)=>b[0].localeCompare(a[0])).slice(0,limit)
      .map(([k,v])=>({key:k,...v}));
  }

  const todayEntry = (data[user]||{})[todayKey];
  const { taken, missed } = getStats(user, viewMonth.getFullYear(), viewMonth.getMonth());
  const total = taken+missed;
  const pct = total>0 ? Math.round(taken/total*100) : 0;
  const str = getStreak(user);
  const other = user==="prathmesh" ? "aditya" : "prathmesh";
  const oStats = getStats(other, viewMonth.getFullYear(), viewMonth.getMonth());
  const oStr = getStreak(other);
  const calDays = getCalDays();

  return(
    <div style={A.root}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        input::placeholder{color:rgba(255,255,255,0.28);}
        input:focus{outline:none;border-color:rgba(200,169,110,0.6)!important;background:rgba(255,255,255,0.07)!important;}
        button{font-family:'DM Sans',sans-serif;}
        .cal-day-cell{transition:all 0.12s ease;}
        .cal-day-cell:hover{filter:brightness(1.25);transform:scale(1.04);}
        .cal-day-cell-future{cursor:default!important;}
        .cal-day-cell-future:hover{filter:none!important;transform:none!important;}
        .hist-row:hover{background:rgba(255,255,255,0.05)!important;}
        .tab-pill:hover{border-color:rgba(200,169,110,0.5)!important;}
        @keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes popIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
      `}</style>

      <div style={A.gridBg}/>

      {toast&&(
        <div style={{...A.toast,...(toast.type==="warn"?A.toastWarn:{})}}>
          {toast.msg}
        </div>
      )}

      {editModal&&(
        <EditModal dateStr={editModal.dateStr} entry={(data[user]||{})[editModal.dateStr]||null}
          user={user} onSave={handleEditSave} onDelete={handleEditDelete} onClose={()=>setEditModal(null)}/>
      )}

      <div style={A.wrap}>

        {/* ── Header ── */}
        <header style={A.header}>
          <div style={A.brand}>
            <div style={A.brandMark}>TT</div>
            <div>
              <div style={A.brandName}>TIFFIN TRACKER</div>
              <div style={A.brandSub}>Daily Meal Log</div>
            </div>
          </div>
          <div style={A.headerRight}>
            <div style={A.headerDayName}>{DAYS_FULL[today().getDay()]}</div>
            <div style={A.headerDateStr}>
              {today().getDate()} {MONTHS[today().getMonth()].slice(0,3)} {today().getFullYear()}
            </div>
          </div>
        </header>

        <div style={A.goldRule}/>

        {/* ── User switcher ── */}
        <div style={A.userRow}>
          {USERS.map(u=>(
            <button key={u} className="tab-pill"
              onClick={()=>{setUser(u);setShowMissedForm(false);setShowHistory(false);}}
              style={{...A.tabPill,...(user===u?A.tabPillActive:{})}}>
              <div style={{...A.tabAvatar,...(user===u?A.tabAvatarActive:{})}}>{USER_INITIALS[u]}</div>
              <div style={A.tabText}>
                <div style={{...A.tabName,...(user===u?{color:"#FFFFFF",fontWeight:700}:{})}}>{USER_LABELS[u]}</div>
                {data[u]?.[todayKey]?(
                  <div style={{fontSize:11,color:data[u][todayKey].status==="taken"?"#4ade80":"#f87171",fontWeight:600,letterSpacing:"0.04em",marginTop:2}}>
                    {data[u][todayKey].status==="taken"?"Taken today":"Missed today"}
                  </div>
                ):(
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:2}}>Not logged</div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* ── Today card ── */}
        <div style={{...A.card,marginBottom:14,animation:"slideUp 0.35s ease"}}>
          <div style={A.sectionLabel}>TODAY</div>
          <div style={A.todayInner}>
            <div style={{flex:1}}>
              <div style={A.todayBigDate}>
                {today().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}
              </div>
              {!todayEntry&&!showMissedForm&&(
                <div style={A.awaitingRow}>
                  <span style={A.awaitingPulse}/>
                  <span style={A.awaitingText}>Awaiting entry</span>
                </div>
              )}
              {todayEntry&&(
                <div style={todayEntry.status==="taken"?A.statusGreen:A.statusRed}>
                  <span style={{...A.statusDot,background:todayEntry.status==="taken"?"#4ade80":"#f87171"}}/>
                  {todayEntry.status==="taken"
                    ? "Tiffin taken"
                    : `Missed${todayEntry.reason?` — ${todayEntry.reason}`:""}`}
                </div>
              )}
            </div>
            <div style={A.todayBtns}>
              {!todayEntry&&!showMissedForm&&(
                <>
                  <button onClick={markTaken} style={A.btnGold}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{marginRight:7,flexShrink:0}}><path d="M1.5 7l3.5 3.5 6.5-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Taken
                  </button>
                  <button onClick={()=>{setShowMissedForm(true);setTimeout(()=>reasonRef.current?.focus(),80);}} style={A.btnRedOutline}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{marginRight:7,flexShrink:0}}><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    Missed
                  </button>
                </>
              )}
              {todayEntry&&(
                <>
                  <button onClick={()=>setEditModal({dateStr:todayKey})} style={A.btnGoldOutline}>Edit</button>
                  <button onClick={undoToday} style={A.btnDim}>Undo</button>
                </>
              )}
            </div>
          </div>
          {showMissedForm&&!todayEntry&&(
            <div style={A.missedPane}>
              <input ref={reasonRef} value={missedReason} onChange={e=>setMissedReason(e.target.value)}
                placeholder="Reason for missing (optional)" style={A.missedInput}
                onKeyDown={e=>e.key==="Enter"&&markMissed()}/>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <button onClick={markMissed} style={A.btnRedSolid}>Log as Missed</button>
                <button onClick={()=>setShowMissedForm(false)} style={A.btnDim}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* ── This Month Stats ── */}
        <div style={{...A.card,marginBottom:14}}>
          <div style={A.sectionLabel}>THIS MONTH — {MONTHS[viewMonth.getMonth()].toUpperCase()} {viewMonth.getFullYear()}</div>

          {/* Big stat row */}
          <div style={A.bigStatRow}>
            <div style={{...A.bigStatBox,...A.bigStatGreen}}>
              <div style={A.bigStatNum}>{taken}</div>
              <div style={A.bigStatLabel}>Days Taken</div>
            </div>
            <div style={{...A.bigStatBox,...A.bigStatRed}}>
              <div style={{...A.bigStatNum,color:"#f87171"}}>{missed}</div>
              <div style={A.bigStatLabel}>Missed</div>
            </div>
            <div style={{...A.bigStatBox,...A.bigStatGold}}>
              <div style={A.streakRow}>
                <FlameIcon active={str>0}/>
                <div style={{...A.bigStatNum,color:str>0?"#FDE68A":"rgba(255,255,255,0.25)"}}>{str}</div>
              </div>
              <div style={A.bigStatLabel}>Day Streak</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={A.progressSection}>
            <div style={A.progressMeta}>
              <span style={A.progressLabel}>{total} days logged</span>
              <span style={{...A.progressLabel, color: pct>=80?"#4ade80":pct>=50?"#FDE68A":"#f87171", fontWeight:700}}>{pct}%</span>
            </div>
            <div style={A.progressTrack}>
              <div style={{...A.progressFill, width:`${pct}%`, background: pct>=80?"linear-gradient(90deg,#16a34a,#4ade80)":pct>=50?"linear-gradient(90deg,#d97706,#FDE68A)":"linear-gradient(90deg,#b91c1c,#f87171)"}}/>
            </div>
          </div>

          {/* Sparkline */}
          <div style={{marginTop:16}}>
            <div style={A.sparkLabel}>Daily activity — {MONTHS[viewMonth.getMonth()]}</div>
            <div style={{marginTop:8}}>
              <MonthBars userData={data[user]||{}} year={viewMonth.getFullYear()} month={viewMonth.getMonth()}/>
            </div>
            <div style={A.sparkLegend}>
              <span style={A.sparkLegItem}><span style={{...A.sparkPip,background:"#22c55e"}}/><span style={{color:"#4ade80"}}>Taken</span></span>
              <span style={A.sparkLegItem}><span style={{...A.sparkPip,background:"#f87171"}}/><span style={{color:"#f87171"}}>Missed</span></span>
              <span style={A.sparkLegItem}><span style={{...A.sparkPip,background:"rgba(255,255,255,0.12)"}}/><span>No entry</span></span>
            </div>
          </div>
        </div>

        {/* ── Calendar ── */}
        <div style={{...A.card,marginBottom:14,padding:0,overflow:"hidden"}}>
          {/* Cal header */}
          <div style={A.calTopBar}>
            <button onClick={()=>setViewMonth(m=>new Date(m.getFullYear(),m.getMonth()-1,1))} style={A.calNavBtn}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={A.calMonthTitle}>
              <span style={A.calMonthName}>{MONTHS[viewMonth.getMonth()]}</span>
              <span style={A.calMonthYear}>{viewMonth.getFullYear()}</span>
            </div>
            <button onClick={()=>setViewMonth(m=>new Date(m.getFullYear(),m.getMonth()+1,1))} style={A.calNavBtn}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <div style={A.calHint}>Tap any date to add or edit entry</div>

          {/* Day name headers */}
          <div style={A.calDayHeaders}>
            {DAYS_SHORT.map(d=>(
              <div key={d} style={{...A.calDayHeader,...(d==="SUN"||d==="SAT"?{color:"rgba(200,169,110,0.7)"}:{})}}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={A.calBody}>
            {calDays.map((day,i)=>{
              if(!day) return <div key={`e${i}`} style={A.calEmptyCell}/>;
              const {d,k,entry,isToday,isFuture,dayOfWeek} = day;
              const isWeekend = dayOfWeek===0||dayOfWeek===6;

              let cellBg = "transparent";
              let cellColor = isWeekend ? "rgba(200,169,110,0.7)" : "rgba(255,255,255,0.6)";
              let cellBorder = "1px solid rgba(255,255,255,0.05)";
              let fontWeight = 500;
              let statusIndicator = null;

              if(entry?.status==="taken"){
                cellBg = "rgba(34,197,94,0.18)";
                cellColor = "#4ade80";
                cellBorder = "1px solid rgba(34,197,94,0.35)";
                fontWeight = 700;
                statusIndicator = (
                  <div style={A.calStatusBar}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5l2.5 2.5 4.5-4.5" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                );
              } else if(entry?.status==="missed"){
                cellBg = "rgba(239,68,68,0.14)";
                cellColor = "#f87171";
                cellBorder = "1px solid rgba(239,68,68,0.3)";
                fontWeight = 700;
                statusIndicator = (
                  <div style={A.calStatusBar}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </div>
                );
              }

              if(isToday){
                cellBorder = "2px solid #C8A96E";
                if(!entry) cellColor = "#EDD9A3";
              }

              return(
                <div key={d}
                  className={`cal-day-cell${isFuture?" cal-day-cell-future":""}`}
                  style={{
                    ...A.calDayCell,
                    background: cellBg,
                    border: cellBorder,
                    opacity: isFuture ? 0.22 : 1,
                    cursor: isFuture ? "default" : "pointer",
                  }}
                  onClick={()=>!isFuture&&setEditModal({dateStr:k})}
                  title={isFuture?"":entry?(entry.status==="taken"?"Taken — click to edit":`Missed${entry.reason?`: ${entry.reason}`:""} — click to edit`):"No entry — click to add"}
                >
                  <div style={{...A.calDayNum, color:cellColor, fontWeight}}>
                    {d}
                  </div>
                  {statusIndicator}
                  {isToday&&<div style={A.calTodayDot}/>}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={A.calLegendBar}>
            <span style={A.calLegItem}>
              <span style={{...A.calLegPip,background:"rgba(34,197,94,0.25)",border:"1px solid rgba(34,197,94,0.6)"}}/>
              <span style={{color:"#4ade80"}}>Taken</span>
            </span>
            <span style={A.calLegItem}>
              <span style={{...A.calLegPip,background:"rgba(239,68,68,0.2)",border:"1px solid rgba(239,68,68,0.6)"}}/>
              <span style={{color:"#f87171"}}>Missed</span>
            </span>
            <span style={A.calLegItem}>
              <span style={{...A.calLegPip,background:"transparent",border:"2px solid #C8A96E"}}/>
              <span style={{color:"#EDD9A3"}}>Today</span>
            </span>
          </div>
        </div>

        {/* ── Companion ── */}
        <div style={{...A.card,marginBottom:14}}>
          <div style={A.sectionLabel}>COMPANION</div>
          <div style={A.companionRow}>
            <div style={A.companionAvatar}>{USER_INITIALS[other]}</div>
            <div style={{flex:1}}>
              <div style={A.companionName}>{USER_LABELS[other]}</div>
              <div style={A.companionStats}>
                <span style={{color:"#4ade80",fontWeight:600}}>{oStats.taken} taken</span>
                <span style={{color:"rgba(255,255,255,0.3)",margin:"0 6px"}}>·</span>
                <span style={{color:"#f87171",fontWeight:600}}>{oStats.missed} missed</span>
                {oStr>0&&<><span style={{color:"rgba(255,255,255,0.3)",margin:"0 6px"}}>·</span><span style={{color:"#FDE68A",fontWeight:600}}>{oStr} day streak</span></>}
              </div>
            </div>
            {data[other]?.[todayKey]&&(
              <div style={{...A.companionTodayBadge, color:data[other][todayKey].status==="taken"?"#4ade80":"#f87171", borderColor:data[other][todayKey].status==="taken"?"rgba(74,222,128,0.3)":"rgba(248,113,113,0.3)", background:data[other][todayKey].status==="taken"?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)"}}>
                {data[other][todayKey].status==="taken"?"Taken":"Missed"}
              </div>
            )}
          </div>
          <div style={{marginTop:14}}>
            <MonthBars userData={data[other]||{}} year={viewMonth.getFullYear()} month={viewMonth.getMonth()}/>
          </div>
        </div>

        {/* ── History ── */}
        <div style={{marginBottom:36}}>
          <button onClick={()=>setShowHistory(h=>!h)} style={A.histToggle}>
            <span style={{color:"#FFFFFF",fontWeight:600,letterSpacing:"0.14em",fontSize:11}}>RECENT HISTORY</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{transform:showHistory?"rotate(180deg)":"none",transition:"transform 0.2s",color:"rgba(255,255,255,0.5)"}}><path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {showHistory&&(
            <div style={{border:"1px solid rgba(255,255,255,0.07)",borderTop:"none",borderRadius:"0 0 6px 6px",overflow:"hidden"}}>
              {getHistory(user).length===0&&(
                <div style={{textAlign:"center",color:"rgba(255,255,255,0.3)",padding:32,fontSize:14}}>
                  No entries yet. Start tracking today.
                </div>
              )}
              {getHistory(user).map((e,i)=>{
                const dp=parseKey(e.key);
                return(
                  <div key={e.key} className="hist-row"
                    onClick={()=>setEditModal({dateStr:e.key})}
                    style={{...A.histRow,borderTop:i>0?"1px solid rgba(255,255,255,0.05)":"none"}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:e.status==="taken"?"#4ade80":"#f87171",flexShrink:0}}/>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.75)",fontWeight:500,minWidth:110}}>
                      {dp.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}
                    </div>
                    <div style={{fontSize:13,fontWeight:700,color:e.status==="taken"?"#4ade80":"#f87171",minWidth:60}}>
                      {e.status==="taken"?"Taken":"Missed"}
                    </div>
                    {e.reason&&(
                      <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",flex:1,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontStyle:"italic"}}>
                        {e.reason}
                      </div>
                    )}
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{color:"rgba(255,255,255,0.25)",flexShrink:0}}><path d="M7.5 1.5l2 2-6 6H1.5v-2l6-6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{textAlign:"center"}}>
          <div style={{height:"0.5px",background:"linear-gradient(90deg,transparent,rgba(200,169,110,0.3),transparent)",marginBottom:14}}/>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.2)",letterSpacing:"0.2em"}}>TIFFIN TRACKER — PRATHMESH & ADITYA</div>
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════════════════ */
const A = {
  root:{ minHeight:"100vh", background:"#07111F", fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.9)", position:"relative" },
  gridBg:{ position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(200,169,110,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.03) 1px,transparent 1px)",backgroundSize:"48px 48px",pointerEvents:"none",zIndex:0 },
  wrap:{ maxWidth:540,margin:"0 auto",padding:"28px 18px 48px",position:"relative",zIndex:1 },

  toast:{ position:"fixed",top:18,left:"50%",transform:"translateX(-50%)",background:"rgba(15,42,24,0.97)",border:"1px solid rgba(74,222,128,0.5)",color:"#4ade80",padding:"11px 26px",borderRadius:5,fontWeight:700,fontSize:13,zIndex:1000,letterSpacing:"0.05em",whiteSpace:"nowrap",boxShadow:"0 8px 32px rgba(0,0,0,0.5)" },
  toastWarn:{ background:"rgba(42,16,16,0.97)",border:"1px solid rgba(248,113,113,0.5)",color:"#f87171" },

  /* Header */
  header:{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18 },
  brand:{ display:"flex",alignItems:"center",gap:14 },
  brandMark:{ width:42,height:42,borderRadius:5,background:"linear-gradient(135deg,#C8A96E,#EDD9A3)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Serif Display',serif",fontSize:14,fontWeight:700,color:"#07111F",letterSpacing:"0.05em",flexShrink:0 },
  brandName:{ fontSize:16,fontWeight:700,color:"#FFFFFF",letterSpacing:"0.18em" },
  brandSub:{ fontSize:11,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",marginTop:2 },
  headerRight:{ textAlign:"right" },
  headerDayName:{ fontSize:13,fontWeight:600,color:"#EDD9A3",letterSpacing:"0.08em" },
  headerDateStr:{ fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2,letterSpacing:"0.06em" },
  goldRule:{ height:"0.5px",background:"linear-gradient(90deg,transparent,rgba(200,169,110,0.5),transparent)",marginBottom:22 },

  /* User tabs */
  userRow:{ display:"flex",gap:10,marginBottom:14 },
  tabPill:{ flex:1,display:"flex",alignItems:"center",gap:12,padding:"13px 16px",borderRadius:6,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.03)",cursor:"pointer",textAlign:"left",transition:"border-color 0.15s" },
  tabPillActive:{ border:"1px solid rgba(200,169,110,0.45)",background:"rgba(200,169,110,0.07)" },
  tabAvatar:{ width:36,height:36,borderRadius:4,background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Serif Display',serif",fontSize:17,color:"rgba(255,255,255,0.45)",flexShrink:0 },
  tabAvatarActive:{ background:"linear-gradient(135deg,#C8A96E,#EDD9A3)",color:"#07111F" },
  tabText:{ flex:1 },
  tabName:{ fontSize:15,fontWeight:600,color:"rgba(255,255,255,0.55)",letterSpacing:"0.01em" },

  /* Card base */
  card:{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:"20px" },
  sectionLabel:{ fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:"0.2em",fontWeight:700,marginBottom:14 },

  /* Today */
  todayInner:{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12 },
  todayBigDate:{ fontSize:20,fontWeight:700,color:"#FFFFFF",fontFamily:"'DM Serif Display',serif",letterSpacing:"-0.3px",marginBottom:12,lineHeight:1.3 },
  awaitingRow:{ display:"flex",alignItems:"center",gap:8 },
  awaitingPulse:{ width:7,height:7,borderRadius:"50%",background:"rgba(255,255,255,0.3)",display:"block" },
  awaitingText:{ fontSize:13,color:"rgba(255,255,255,0.45)",fontWeight:500 },
  statusGreen:{ display:"inline-flex",alignItems:"center",gap:8,fontSize:14,fontWeight:600,color:"#4ade80" },
  statusRed:{ display:"inline-flex",alignItems:"center",gap:8,fontSize:14,fontWeight:600,color:"#f87171" },
  statusDot:{ width:7,height:7,borderRadius:"50%",flexShrink:0 },
  todayBtns:{ display:"flex",flexDirection:"column",gap:8,flexShrink:0 },

  /* Buttons */
  btnGold:{ display:"flex",alignItems:"center",padding:"10px 18px",borderRadius:4,border:"none",background:"linear-gradient(135deg,#B8922A,#EDD9A3)",color:"#07111F",fontWeight:700,fontSize:13,cursor:"pointer",letterSpacing:"0.05em",whiteSpace:"nowrap" },
  btnRedOutline:{ display:"flex",alignItems:"center",padding:"10px 18px",borderRadius:4,border:"1px solid rgba(248,113,113,0.45)",background:"rgba(239,68,68,0.1)",color:"#f87171",fontWeight:700,fontSize:13,cursor:"pointer",letterSpacing:"0.05em",whiteSpace:"nowrap" },
  btnGoldOutline:{ padding:"9px 16px",borderRadius:4,border:"1px solid rgba(200,169,110,0.5)",background:"rgba(200,169,110,0.08)",color:"#EDD9A3",fontWeight:600,fontSize:12,cursor:"pointer",letterSpacing:"0.06em" },
  btnDim:{ padding:"9px 16px",borderRadius:4,border:"1px solid rgba(255,255,255,0.1)",background:"transparent",color:"rgba(255,255,255,0.4)",fontWeight:500,fontSize:12,cursor:"pointer" },
  btnRedSolid:{ padding:"10px 20px",borderRadius:4,border:"none",background:"rgba(239,68,68,0.2)",color:"#f87171",fontWeight:700,fontSize:13,cursor:"pointer",border:"1px solid rgba(239,68,68,0.4)",letterSpacing:"0.05em" },
  missedPane:{ marginTop:16,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.07)" },
  missedInput:{ width:"100%",padding:"11px 14px",borderRadius:4,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.05)",color:"#FFFFFF",fontSize:14,fontWeight:400,boxSizing:"border-box",transition:"all 0.15s" },

  /* This Month Stats */
  bigStatRow:{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16 },
  bigStatBox:{ borderRadius:5,padding:"16px 14px",textAlign:"center",border:"1px solid transparent" },
  bigStatGreen:{ background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.2)" },
  bigStatRed:{ background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.18)" },
  bigStatGold:{ background:"rgba(200,169,110,0.08)",border:"1px solid rgba(200,169,110,0.2)" },
  bigStatNum:{ fontSize:32,fontWeight:800,color:"#FFFFFF",fontFamily:"'DM Serif Display',serif",lineHeight:1,letterSpacing:"-1px" },
  bigStatLabel:{ fontSize:10,color:"rgba(255,255,255,0.45)",letterSpacing:"0.12em",fontWeight:700,marginTop:6,textTransform:"uppercase" },
  streakRow:{ display:"flex",alignItems:"center",justifyContent:"center",gap:6 },

  progressSection:{ marginBottom:4 },
  progressMeta:{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7 },
  progressLabel:{ fontSize:12,color:"rgba(255,255,255,0.5)",fontWeight:500 },
  progressTrack:{ height:6,background:"rgba(255,255,255,0.08)",borderRadius:999,overflow:"hidden" },
  progressFill:{ height:"100%",borderRadius:999,transition:"width 0.7s ease" },

  sparkLabel:{ fontSize:10,color:"rgba(255,255,255,0.35)",letterSpacing:"0.12em",fontWeight:600 },
  sparkLegend:{ display:"flex",gap:16,marginTop:8 },
  sparkLegItem:{ display:"flex",alignItems:"center",gap:6,fontSize:11,color:"rgba(255,255,255,0.45)" },
  sparkPip:{ width:8,height:8,borderRadius:2,display:"inline-block",flexShrink:0 },

  /* Calendar */
  calTopBar:{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 20px 0" },
  calMonthTitle:{ display:"flex",alignItems:"baseline",gap:8 },
  calMonthName:{ fontSize:20,fontWeight:700,color:"#FFFFFF",fontFamily:"'DM Serif Display',serif",letterSpacing:"-0.3px" },
  calMonthYear:{ fontSize:14,color:"rgba(255,255,255,0.4)",fontWeight:500 },
  calNavBtn:{ width:34,height:34,borderRadius:4,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.6)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" },
  calHint:{ fontSize:10,color:"rgba(255,255,255,0.25)",letterSpacing:"0.08em",textAlign:"center",padding:"8px 20px 0",fontWeight:500 },
  calDayHeaders:{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",padding:"14px 12px 6px",gap:4 },
  calDayHeader:{ textAlign:"center",fontSize:10,color:"rgba(255,255,255,0.35)",fontWeight:700,letterSpacing:"0.1em",padding:"4px 0" },
  calBody:{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",padding:"0 12px 12px",gap:4 },
  calEmptyCell:{ aspectRatio:"1" },
  calDayCell:{
    aspectRatio:"1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
    borderRadius:5, position:"relative", userSelect:"none",
  },
  calDayNum:{ fontSize:14,lineHeight:1 },
  calStatusBar:{ position:"absolute",bottom:5,display:"flex",alignItems:"center",justifyContent:"center" },
  calTodayDot:{ position:"absolute",top:4,right:4,width:4,height:4,borderRadius:"50%",background:"#C8A96E" },
  calLegendBar:{ display:"flex",gap:18,justifyContent:"center",padding:"12px 20px 16px",borderTop:"1px solid rgba(255,255,255,0.05)" },
  calLegItem:{ display:"flex",alignItems:"center",gap:7,fontSize:11,fontWeight:500 },
  calLegPip:{ width:12,height:12,borderRadius:3,display:"inline-block",flexShrink:0 },

  /* Companion */
  companionRow:{ display:"flex",alignItems:"center",gap:14 },
  companionAvatar:{ width:42,height:42,borderRadius:4,background:"rgba(99,102,241,0.2)",border:"1px solid rgba(99,102,241,0.35)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Serif Display',serif",fontSize:20,color:"#a5b4fc",flexShrink:0 },
  companionName:{ fontSize:16,fontWeight:700,color:"#FFFFFF",marginBottom:4 },
  companionStats:{ fontSize:13,display:"flex",alignItems:"center",flexWrap:"wrap",gap:0 },
  companionTodayBadge:{ fontSize:11,fontWeight:700,letterSpacing:"0.08em",padding:"4px 10px",borderRadius:3,border:"1px solid",flexShrink:0 },

  /* History */
  histToggle:{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderRadius:6,border:"1px solid rgba(255,255,255,0.09)",background:"rgba(255,255,255,0.03)",cursor:"pointer" },
  histRow:{ display:"flex",alignItems:"center",gap:12,padding:"12px 18px",cursor:"pointer",transition:"background 0.12s" },
};

/* ── Modal ─────────────────────────────────────────────────────────────────── */
const M = {
  overlay:{ position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(8px)" },
  modal:{ background:"#0C1A2C",border:"1px solid rgba(200,169,110,0.25)",borderRadius:6,padding:28,width:"100%",maxWidth:400,boxShadow:"0 40px 100px rgba(0,0,0,0.8)",animation:"popIn 0.22s ease" },
  mHead:{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20 },
  mTitle:{ fontSize:20,fontFamily:"'DM Serif Display',serif",color:"#FFFFFF",letterSpacing:"-0.3px" },
  mSub:{ fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:4,fontWeight:500 },
  closeBtn:{ width:32,height:32,borderRadius:4,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.5)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0 },
  userPill:{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"rgba(200,169,110,0.08)",border:"1px solid rgba(200,169,110,0.2)",borderRadius:4,marginBottom:20 },
  userDot:{ width:8,height:8,borderRadius:"50%",background:"#C8A96E",flexShrink:0 },
  userPillName:{ fontSize:13,fontWeight:700,color:"#EDD9A3",letterSpacing:"0.08em" },
  toggleRow:{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18 },
  toggleBtn:{ padding:"15px",borderRadius:4,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.4)",fontSize:15,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9,transition:"all 0.15s",letterSpacing:"0.04em" },
  toggleTaken:{ background:"rgba(34,197,94,0.14)",border:"1px solid rgba(34,197,94,0.45)",color:"#4ade80" },
  toggleMissed:{ background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.4)",color:"#f87171" },
  reasonInput:{ width:"100%",padding:"12px 14px",borderRadius:4,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.05)",color:"#FFFFFF",fontSize:14,fontFamily:"'DM Sans',sans-serif",boxSizing:"border-box",marginBottom:18 },
  mFooter:{ display:"flex",gap:10 },
  saveBtn:{ flex:1,padding:"13px",borderRadius:4,border:"none",background:"linear-gradient(135deg,#B8922A,#EDD9A3)",color:"#07111F",fontWeight:800,fontSize:14,cursor:"pointer",letterSpacing:"0.06em" },
  removeBtn:{ padding:"13px 18px",borderRadius:4,border:"1px solid rgba(239,68,68,0.35)",background:"rgba(239,68,68,0.08)",color:"#f87171",fontWeight:600,fontSize:13,cursor:"pointer",letterSpacing:"0.04em" },
};
