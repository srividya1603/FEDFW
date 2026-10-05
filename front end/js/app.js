/* Shared UI + auth */
const $=(s,e=document)=>e.querySelector(s),inr=n=>'₹'+Number(n).toLocaleString('en-IN');
document.documentElement.dataset.theme=localStorage.theme||'light';
const me=()=>getData('users').find(u=>u.id==localStorage.session);
function toast(m,t='ok'){const d=document.createElement('div');d.className='toast '+t;d.textContent=(t=='ok'?'✓ ':t=='err'?'✕ ':'ℹ️ ')+m;document.body.append(d);setTimeout(()=>d.remove(),3000)}
function modal(h){closeModal();const o=document.createElement('div');o.className='ov';o.innerHTML=`<div class="modal"><button class="x" onclick="closeModal()">×</button>${h}</div>`;document.body.append(o)}
function closeModal(){$('.ov')?.remove()}
function confirmBox(msg,fn){modal(`<h3>${msg}</h3><div class="row"><button class="btn d" id="yes">Yes, confirm</button><button class="btn o" onclick="closeModal()">Cancel</button></div>`);$('#yes').onclick=()=>{fn();closeModal()}}
function notify(msg){const n=getData('notifications');n.unshift({id:Date.now(),uid:me().id,msg,date:new Date().toISOString()});saveData('notifications',n)}
function login(email,pw){const u=getData('users').find(x=>x.email==email&&x.password==pw);
 if(!u)return toast('Invalid email or password','err');if(u.blocked)return toast('Account blocked by admin','err');
 localStorage.session=u.id;location=u.role=='admin'?'admin.html':'dashboard.html'}
function logout(){localStorage.removeItem('session');location='login.html'}
function toggleTheme(){localStorage.theme=localStorage.theme=='dark'?'light':'dark';document.documentElement.dataset.theme=localStorage.theme}
/* Sidebar shell: shell('events.html') on dashboard pages */
function shell(active){const u=me();if(!u){location='login.html';return false}
 const L=[['dashboard.html','📊 Dashboard'],['events.html','🎉 Events'],['tickets.html','🎟 My Tickets'],['guests.html','👥 Guests / Attendees'],['profile.html','👤 Profile']];
 if(u.role!='user')L.push(['create-event.html','➕ Create Event']);if(u.role=='admin')L.push(['admin.html','🛡 Admin']);
 document.body.insertAdjacentHTML('afterbegin',`<button class="btn burger" onclick="$('.side').classList.toggle('open')">☰</button><aside class="side"><div class="logo">EventEase</div><p style="margin:10px 0;color:var(--mu)">${u.name} (${u.role})</p>${L.map(l=>`<a href="${l[0]}" class="${l[0]==active?'on':''}">${l[1]}</a>`).join('')}<a href="#" onclick="toggleTheme()">🌓 Dark / Light</a><a href="#" onclick="logout()">🚪 Logout</a></aside>`);
 return true}
