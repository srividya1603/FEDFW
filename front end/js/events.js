/* Events, registration, payment, tickets */
function card(e){const left=e.capacity-e.registered;return `<div class="card ev"><div class="bn">${e.emoji}</div><span class="tag">${e.category}</span><h3>${e.name}</h3><p>📅 ${e.date} · 📍 ${e.city}</p><p><b>${e.price?inr(e.price):'Free · RSVP'}</b> · ${left} seats left</p><div class="bar"><i style="width:${e.registered/e.capacity*100}%"></i></div><div class="row"><button class="btn o" onclick="location='event-details.html?id=${e.id}'">View Details</button><button class="btn" onclick="${e.mode=='personal'?'rsvp':'reg'}(${e.id})" ${left<1?'disabled':''}>${left<1?'Sold out':e.mode=='personal'?'RSVP':'Register'}</button></div></div>`}
const evOf=id=>getData('events').find(e=>e.id==id);
function details(id){const e=evOf(id);modal(`<div class="ev"><div class="bn">${e.emoji}</div></div><h2>${e.name}</h2><p>${e.desc}</p><p>👤 ${e.organizer}<br>📅 ${e.date} ⏰ ${e.time}<br>📍 ${e.venue}, ${e.city}<br>💰 From ${inr(e.price)} · ${e.capacity-e.registered} seats left</p><button class="btn" onclick="reg(${id})">Register Now</button>`)}
function reg(id){const u=me();if(!u){location='login.html';return}const e=evOf(id);
 modal(`<h2>Register: ${e.name}</h2><input id="rn" value="${u.name}" placeholder="Full name"><input id="re" value="${u.email}" placeholder="Email"><input id="rp" value="${u.phone||''}" placeholder="Phone (10 digits)"><select id="rt" onchange="calc()"><option value="499">General — ₹499</option><option value="999">VIP — ₹999</option><option value="1499">Premium — ₹1499</option></select><input id="rq" type="number" min="1" max="10" value="1" oninput="calc()"><select id="rm"><option>UPI</option><option>Credit Card</option><option>Debit Card</option><option>Net Banking</option></select><div class="sum" id="sum"></div><div class="err-t" id="er"></div><button class="btn" onclick="pay(${id})">Pay Now</button>`);calc()}
function calc(){const sub=$('#rt').value*Math.max(1,+$('#rq').value||1),tax=Math.round(sub*.18);$('#sum').innerHTML=`Subtotal: ${inr(sub)}<br>Tax (18%): ${inr(tax)}<br><b>Total: ${inr(sub+tax)}</b>`;return sub+tax}
function pay(id){const e=evOf(id),q=+$('#rq').value,er=m=>$('#er').textContent=m;
 if(!$('#rn').value.trim())return er('Name is required');if(!/^\S+@\S+\.\S+$/.test($('#re').value))return er('Enter a valid email');
 if(!/^\d{10}$/.test($('#rp').value))return er('Phone must be 10 digits');if(!(q>=1)||q>e.capacity-e.registered)return er('Invalid ticket count / not enough seats');
 const total=calc(),n=getData('registrations').length,type=$('#rt').selectedOptions[0].text.split(' ')[0];
 const r={id:"EVT2026-"+(10450+n),ticketId:"TKT-"+(7000+n),eventId:id,userId:me().id,name:$('#rn').value,type,qty:q,total,status:"Confirmed",payment:"Paid",attended:false,date:new Date().toISOString()};
 saveData('registrations',[...getData('registrations'),r]);
 saveData('payments',[...getData('payments'),{id:"TXN"+Date.now(),regId:r.id,amount:total,method:$('#rm').value,status:"Success",date:r.date}]);
 updateData('events',id,{registered:e.registered+q});notify("✅ Registration confirmed for "+e.name);
 modal(`<h2>✅ Payment Successful</h2><p>Registration Successful!<br>Registration ID: <b>${r.id}</b><br>Ticket ID: <b>${r.ticketId}</b><br>Amount: ${inr(total)} · ${$('#rm').value}<br>Date: ${new Date().toLocaleString()}</p><a class="btn" href="tickets.html">View My Tickets</a>`);toast('Registration successful')}
function ticketCard(r){const e=evOf(r.eventId)||{name:'Event',date:'',venue:'',time:''};return `<div class="card tk"><h3>${e.name}</h3><p>${r.name} · ${r.type} ×${r.qty}<br>${e.date} · ${e.time}<br>${e.venue}<br><b>${r.ticketId}</b> · ${r.id}</p><div class="row"><button class="btn o" onclick="viewTicket('${r.id}')">View / Download</button><button class="btn d" onclick="cancelReg('${r.id}')">Cancel</button></div></div>`}
function viewTicket(rid){const r=getData('registrations').find(x=>x.id==rid),e=evOf(r.eventId);
 const qr=[...(r.ticketId+r.id)].map((c,i)=>`<i style="background:${(c.charCodeAt(0)+i)%2?'#000':'#fff'};display:inline-block;width:14px;height:14px"></i>`).join('');
 modal(`<h2>🎟 ${e.name}</h2><p>${r.name}<br>${e.date} ${e.time}<br>${e.venue}, ${e.city}<br>${r.type} ×${r.qty}<br><b>${r.ticketId}</b></p><div style="border:1px solid #000;padding:6px;line-height:0;width:max-content;max-width:100%">${qr}</div><br><button class="btn" onclick="print()">Print / Download</button>`)}
function cancelReg(rid){confirmBox('Cancel this registration?',()=>{const r=getData('registrations').find(x=>x.id==rid);updateData('events',r.eventId,{registered:evOf(r.eventId).registered-r.qty});saveData('registrations',getData('registrations').filter(x=>x.id!=rid));toast('Registration cancelled','inf');renderTickets()})}
function renderTickets(){const l=getData('registrations').filter(r=>r.userId==me().id);$('#list').innerHTML=l.length?l.map(ticketCard).join(''):'<p>🎫 No tickets yet. Register for an event!</p>'}

/* RSVP: guest picks Attending / Not Attending / Maybe -> saved in 'guests' */
function rsvp(id){const u=me();if(!u){location='login.html';return}const e=evOf(id);
 modal(`<h2>RSVP: ${e.name}</h2><input id="gn" value="${u.name}"><input id="ge" value="${u.email}"><select id="gs"><option value="Confirmed">✓ Attending</option><option value="Declined">✕ Not Attending</option><option value="Maybe">? Maybe</option></select><div class="err-t" id="er"></div><button class="btn" onclick="saveRsvp(${id})">Submit RSVP</button>`)}
function saveRsvp(id){if(!/^\S+@\S+\.\S+$/.test($('#ge').value))return $('#er').textContent='Enter a valid email';
 const G=getData('guests'),old=G.find(g=>g.eventId==id&&g.email==$('#ge').value);
 if(old)updateData('guests',old.id,{status:$('#gs').value});else saveData('guests',[...G,{id:Date.now(),eventId:id,name:$('#gn').value,email:$('#ge').value,phone:'',status:$('#gs').value}]);
 notify('✓ RSVP confirmed for '+evOf(id).name);closeModal();toast('RSVP saved')}
