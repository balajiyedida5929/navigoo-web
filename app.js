const app=document.getElementById("app");

const state={screen:"home", selectedCar:"Maruti Swift", service:"", bookingId:"SD12345678"};

const cars=[
 {name:"Maruti Swift",emoji:"🚗",type:"Manual • Petrol",price:"₹1599",rating:"4.6"},
 {name:"Hyundai i20",emoji:"🚙",type:"Manual • Petrol",price:"₹1799",rating:"4.6"},
 {name:"Kia Seltos",emoji:"🚘",type:"Automatic • Diesel",price:"₹2999",rating:"4.7"},
 {name:"Tata Nexon",emoji:"🚗",type:"Manual • Petrol",price:"₹2499",rating:"4.7"}
];

function topbar(title,back=true){
 return `<div class="topbar">${back?`<button class="back" onclick="go('home')">‹</button>`:`<span></span>`}<div class="title">${title}</div><div class="right">⋯</div></div>`;
}
function nav(active="home"){
 return `<div class="bottom-nav">
   <button class="nav-item ${active==='home'?'active':''}" onclick="go('home')"><span>⌂</span><span>Home</span></button>
   <button class="nav-item ${active==='services'?'active':''}" onclick="go('services')"><span>▣</span><span>My Services</span></button>
   <button class="nav-item ${active==='profile'?'active':''}" onclick="go('profile')"><span>●</span><span>Profile</span></button>
 </div>`;
}
function home(){
 return `<div class="screen">
   <div class="home-head">
     <button class="icon-btn" onclick="go('notifications')">♟<span class="badge">3</span></button>
     <div class="brand"><div class="pin-logo">📍</div><h1>NaviGoo</h1><p>Your Journey. Our Support.</p></div>
     <div class="location"><span class="green">●</span>Current Location: Hyderabad <span class="chev">⌄</span></div>
     <div class="search"><span class="glass">⌕</span>Where to? (Ask Nyra.ai)<span class="ai">✨ nyra.ai</span></div>
   </div>
   <div class="hero">
     <div class="service-grid">
       ${serviceCard("🚗","Self-Drive Rentals & Cars With Drivers","rentals")}
       ${serviceCard("🛠️","Roadside Assistance","roadside")}
       ${serviceCard("🛵","Route Based Delivery","delivery")}
       ${serviceCard("🚑","SOS Emergency","sos","sos")}
     </div>
     <div class="road"><div class="city">🏙️ 🏙️ 🏙️</div></div>
   </div>
   <div class="cta"><h2>One Platform For Your<br>Endless Destinations</h2><button class="primary" onclick="go('rentals')">Start Journey</button></div>
   ${nav("home")}
 </div>`;
}
function serviceCard(icon,text,target,cls=""){return `<button class="service ${cls}" onclick="go('${target}')"><div class="art">${icon}</div><h3>${text}</h3></button>`}

function rentals(){
 return `<div class="screen">${topbar("Self-Drive Rentals")}
 <div class="content">
   <div class="location" style="margin-top:0"><span class="green">●</span> Hyderabad <span style="margin-left:auto;color:#0757db;font-size:11px">Change</span></div>
   <div class="search" style="box-shadow:none;border:1px solid #dce6f2;margin-top:9px;height:48px"><span class="glass">⌕</span>Search cars, e.g., Swift, Creta...<span style="margin-left:auto">⚱</span></div>
   <div class="filters">${["All","Hatchback","Sedan","SUV","Luxury"].map((x,i)=>`<button class="chip ${i===0?'active':''}">${x}</button>`).join("")}</div>
   <div style="margin-top:10px">${cars.map((c,i)=>carRow(c,i)).join("")}</div>
   <p class="center" style="font-size:11px;color:#758198">Can't find what you're looking for?<br><b style="color:#0757db">Tell us →</b></p>
 </div>${nav("services")}</div>`;
}
function carRow(c,i){return `<button class="car-row" onclick="selectCar(${i})"><div class="car-img">${c.emoji}</div><div class="car-main"><b>${c.name}</b><span class="rating">★ ${c.rating}</span><div class="meta">${c.type}</div><div class="price">${c.price} <span style="color:#738097;font-size:9px">/ day</span></div><span class="status">Available</span></div></button>`}

function carDetails(){
 const c=cars.find(x=>x.name===state.selectedCar)||cars[0];
 return `<div class="screen">${topbar("Car Details")}
 <div class="content">
  <div class="panel">
   <div class="detail-image">${c.emoji}</div>
   <div class="detail-title">${c.name}</div>
   <div class="meta">★ ${c.rating} (120+ Reviews) · H Manual · ⛽ Petrol · 👥 5 Seats · ❄ AC</div>
   <div class="price" style="font-size:18px;margin-top:10px">${c.price}<span style="font-size:11px;color:#718098"> / day</span></div>
   <div class="meta">+ Taxes & Security Deposit</div>
  </div>
  <div class="panel"><div class="section-title">Car Features</div><div class="feature-list">${["Bluetooth","AC","USB Charger","Airbags","GPS","Rear Camera","Central Locking"].map(x=>`<span class="feature">${x}</span>`).join("")}</div></div>
  <div class="panel"><div class="section-title">Pickup Location <span style="float:right;color:#0757db;font-size:10px">Change</span></div>
   <div class="kv"><span>Pickup Date & Time</span><b>12 May, 10:00 AM</b></div><div class="kv"><span>Return Date & Time</span><b>13 May, 10:00 AM</b></div>
  </div>
  <button class="primary full" onclick="go('booking-summary')">Book Now</button>
 </div></div>`;
}
function bookingSummary(){
 return `<div class="screen">${topbar("Booking Summary")}
 <div class="content">
  <div class="panel"><b>🚗 ${state.selectedCar}</b><div class="meta">Manual • Petrol • 5 Seats</div>
   ${kv("Pickup Location","Hyderabad")}${kv("Pickup Date & Time","12 May, 10:00 AM")}${kv("Return Date & Time","13 May, 10:00 AM")}
  </div>
  <div class="panel">${kv("Base Price (1 Day)","₹1599")}${kv("Taxes & Fees","₹300")}${kv("Security Deposit (Refundable)","₹2000")}${kv("Total Amount","₹3899")}<div class="total">₹3899</div></div>
  <div class="panel"><b>Offers</b><span style="float:right;color:#079541;font-weight:800">APPLY</span><p class="meta">Advance payment of ₹1899 is required to confirm your booking.</p></div>
  <button class="primary full" onclick="go('tracking-self')">Continue to Pay</button>
 </div></div>`;
}
function kv(a,b){return `<div class="kv"><span>${a}</span><b>${b}</b></div>`}

function trackingSelf(){
 return `<div class="screen">${topbar("Tracking – Self-Drive")}
 <div class="content"><div class="panel"><span class="status">Active</span><div class="kv"><span>Booking ID</span><b>${state.bookingId}</b></div><div class="detail-image" style="height:120px;font-size:80px">🚗</div>${kv("Pickup Location","Hyderabad")}${kv("Pickup Time","12 May, 10:00 AM")}${kv("Return Time","13 May, 10:00 AM")}</div>
 <div class="panel"><div class="section-title">Owner Details</div><div class="mechanic"><div class="avatar">👨</div><div class="grow"><b>Ramesh Kumar</b><small>+91 98765 43210</small></div><span>☎</span><span>▣</span></div></div>
 <div class="map"><span class="marker start">🚗</span><span class="marker end">📍</span><span class="live">● Live</span><div class="route"></div></div>
 <button class="secondary" style="margin-top:10px">Extend Booking</button>
 </div></div>`;
}

function driver(){
 return `<div class="screen">${topbar("Cars With Driver")}
 <div class="content">
  <div class="panel">${kv("From","Hyderabad")}${kv("To","Vijayawada")}</div>
  <div class="form-row"><div class="field"><small>Trip</small><b>One Way</b></div><div class="field"><small>Departure Time</small><b>12 May, 10 AM</b></div></div>
  <div class="panel"><div class="section-title">Select Vehicle Type</div>${["🚗 Hatchback • 4 Seater","🚙 Sedan • 4 Seater","🚘 SUV • 6 Seater","🚐 7 Seater","🚌 Tempo Traveller • 12 Seater"].map((x,i)=>`<button class="vehicle-option" onclick="go('driver-vehicles')"><span class="emoji">${x.split(" ")[0]}</span><span class="grow"><b>${x.substring(2)}</b></span>›</button>`).join("")}</div>
 </div></div>`;
}
function driverVehicles(){
 return `<div class="screen">${topbar("Select Vehicle – 7 Seater")}<div class="content"><div class="panel"><div class="meta">Prices are approximate</div>
 ${[["🚐","Toyota Innova Crysta","₹2499"],["🚐","Kia Carnival","₹2899"],["🚙","Toyota Innova","₹2299"],["🚙","Mahindra Marazzo","₹2199"]].map(v=>`<button class="vehicle-option" onclick="go('ride-confirm')"><span class="emoji">${v[0]}</span><span class="grow"><b>${v[1]}</b><small>7 Seater · AC · Diesel · Driver</small></span><span class="fare">${v[2]}<small>One Way</small></span></button>`).join("")}
 </div></div></div>`;
}
function rideConfirm(){
 return `<div class="screen">${topbar("Ride Confirmation")}<div class="content"><div class="panel">${kv("From","Hyderabad")}${kv("To","Vijayawada")}${kv("Vehicle","Toyota Innova Crysta • 7 Seater")}${kv("Date & Time","12 May, 10:00 AM")}${kv("Passengers","1")}</div><div class="panel">${kv("Base Fare","₹2499")}${kv("Toll & Parking","₹300")}<div class="kv"><span>Total Fare</span><b class="total">₹2799</b></div></div><button class="primary full" onclick="go('tracking-driver')">Confirm Booking</button><p class="center meta">You can cancel till 10 mins before pickup.</p></div></div>`;
}
function trackingDriver(){
 return `<div class="screen">${topbar("Tracking – With Driver")}<div class="content"><div class="panel"><span class="status">On Trip</span>${kv("Booking ID","WD87654321")}<div class="mechanic"><div class="avatar">👨</div><div class="grow"><b>Suresh Kumar</b><small>+91 98765 43210</small></div>☎</div>${kv("Vehicle","Toyota Innova Crysta TS10 AB 5678 • White")}${kv("Pickup Time","12 May, 10:00 AM")}${kv("Drop Location","Vijayawada")}</div><div class="map"><span class="marker start">🚐</span><span class="marker end">📍</span><div class="route"></div></div><button class="primary full" style="margin-top:10px" onclick="go('trip-details')">Share Trip</button></div></div>`;
}
function tripDetails(){
 return `<div class="screen">${topbar("Trip Details")}<div class="content"><div class="panel">${kv("Pickup","Hyderabad · 12 May, 10:00 AM")}${kv("Drop","Vijayawada · 12 May, 01:30 PM (ETA)")}${kv("Vehicle","Toyota Innova Crysta TS10 AB 5678 • White")}</div><div class="panel"><div class="mechanic"><div class="avatar">👨</div><div class="grow"><b>Suresh Kumar</b><small>Driver · ★ 4.9</small></div>☎</div><div class="total">₹2799</div></div><button class="primary full" style="background:#ef2929" onclick="go('home')">Cancel Trip</button><p class="center meta">Need help? Contact Support</p></div></div>`;
}

function roadside(){
 return `<div class="screen">${topbar("Roadside Assistance")}<div class="content"><div class="panel"><div class="section-title">Select Vehicle Type</div>${["🏍️ Two Wheeler","🛺 Three Wheeler","🚗 Car / SUV","🚚 Truck / LCV","🚌 Bus"].map(x=>`<button class="vehicle-option" onclick="go('problems')"><span class="emoji">${x.split(" ")[0]}</span><span class="grow"><b>${x.substring(2)}</b></span>›</button>`).join("")}</div></div></div>`;
}
function problems(){
 return `<div class="screen">${topbar("Roadside Assistance")}<div class="content"><div class="center"><h3>What's the Problem?</h3><p class="meta">Select the type of assistance you need</p></div><div class="problem-grid">${[["🔋","Battery Down"],["🛞","Tyre Puncture"],["🔧","Engine Problem"],["🌡️","Overheating"],["⛽","Fuel Assistance"],["⚠️","Accident Help"],["💬","Other Issues"]].map(p=>`<button class="problem" onclick="go('mechanics')"><div>${p[0]}</div>${p[1]}</button>`).join("")}</div></div></div>`;
}
function mechanics(){
 const ms=[["Ramesh Kumar","12 Years Experience","2.1 km","₹150"],["Suresh Yadav","8 Years Experience","2.7 km","₹120"],["Imran Ali","10 Years Experience","3.2 km","₹150"],["Mahesh R.","6 Years Experience","3.8 km","₹100"]];
 return `<div class="screen">${topbar("Available Mechanics")}<div class="content"><p class="meta">We found 4 mechanics near you</p>${ms.map(m=>`<div class="mechanic"><div class="avatar">👨</div><div class="grow"><b>${m[0]} <span class="rating">★ 4.8</span></b><small>${m[1]} · ${m[2]} away</small></div><div><b style="font-size:12px">${m[3]}</b><br><button class="connect" onclick="go('mechanic-details')">Connect</button></div></div>`).join("")}</div></div>`;
}
function mechanicDetails(){
 return `<div class="screen">${topbar("Mechanic Details")}<div class="content"><div class="panel"><div class="mechanic"><div class="avatar">👨</div><div class="grow"><b>Ramesh Kumar</b><small>12 Years Experience</small></div><span class="rating">★ 4.8</span></div>${kv("Jobs Done","852")}${kv("Rating","4.8")}${kv("Away","2.1 km")}<h4>About</h4><p class="meta">Skilled in all types of car repair, battery, tyre, engine and general maintenance.</p><h4>Services</h4><p class="meta">✓ Battery Jumpstart<br>✓ Tyre Puncture<br>✓ Engine Repair<br>✓ Fuel Assistance<br>✓ General Repair</p></div><button class="primary full" onclick="go('confirm-request')">Connect Now</button></div></div>`;
}
function confirmRequest(){
 return `<div class="screen">${topbar("Confirm Request")}<div class="content"><div class="panel"><div class="section-title">Your Request</div>${kv("Vehicle","Car / SUV")}${kv("Problem","Battery Down")}${kv("Location","Hi-Tech City, Hyderabad")}</div><div class="panel"><div class="section-title">Selected Mechanic</div><div class="mechanic"><div class="avatar">👨</div><div class="grow"><b>Ramesh Kumar</b><small>12 Years Experience · 2.1 km away</small></div><b>₹150</b></div></div><button class="primary full" onclick="go('request-confirmed')">Confirm & Connect</button></div></div>`;
}
function requestConfirmed(){
 return `<div class="screen">${topbar("Request Confirmed")}<div class="success"><div class="check">✓</div><h2>Your request is confirmed!</h2><p class="meta">Ramesh Kumar is on the way</p><div class="panel"><div class="mechanic"><div class="avatar">👨</div><div class="grow"><b>Ramesh Kumar</b><small>12 Years Experience</small></div></div>${kv("ETA","10 min")}${kv("Booking ID","RA12673845")}</div><button class="primary full" onclick="go('tracking-mechanic')">Track Mechanic</button></div></div>`;
}
function trackingMechanic(){
 return `<div class="screen">${topbar("Tracking Mechanic")}<div class="content"><div class="mechanic panel"><div class="avatar">👨</div><div class="grow"><b>Ramesh Kumar</b><small>12 Years Experience · ★ 4.8</small></div>☎</div><div class="map"><span class="marker start">🧑</span><span class="marker end">📍</span><div class="route"></div></div><div class="panel">${kv("Live Status","Mechanic is on the way")}${kv("Reaching in","10 min")}</div><button class="primary full" onclick="go('mechanic-arrived')">Share Live Location</button></div></div>`;
}
function mechanicArrived(){
 return `<div class="screen">${topbar("Help on the way!")}<div class="content"><div class="panel"><div class="success" style="padding:8px"><div class="check" style="width:58px;height:58px;font-size:32px">✓</div><b>Mechanic has arrived</b><p class="meta">Ramesh Kumar has reached your location</p></div><div style="font-size:65px;text-align:center">👨‍🔧 🚗</div>${kv("Job in Progress","Battery Jumpstart")}${kv("Started at","12 May, 10:30 AM")}${kv("Est. Time","20 min")}</div><button class="secondary">Chat with Mechanic</button></div></div>`;
}

function delivery(){
 return `<div class="screen">${topbar("Route Based Delivery",false)}<div class="home-head" style="padding:10px 14px 15px"><div class="location" style="margin:0"><span class="green">●</span>Current Location: Amalapuram <span class="chev">⌄</span></div><div class="search"><span class="glass">⌕</span>Where to? (Ask Nyra.ai)<span class="ai">🤖 nyra.ai</span></div></div><div class="content"><div class="panel">${kv("Route","Amalapuram → Hyderabad")}<div class="progress"><div class="step"><div class="dot"></div>Amalapuram</div><div style="height:4px;background:#1465e7;flex:1"></div><div class="step"><div class="dot"></div>Vijayawada</div><div style="height:4px;background:#1465e7;flex:1"></div><div class="step"><div class="dot"></div>Hyderabad</div></div><h3>Need Something from Vijayawada?</h3><p class="meta">We'll get it for you at the next junction!</p></div><div class="panel">${["🍬 Pure Ghee Sweets — ₹450","🥞 Pesarattu Mix — ₹120","🍪 Kaja / Bellam Sweets — ₹350"].map(x=>`<div class="delivery-card"><div class="product">${x[0]}</div><div class="grow"><b>${x.substring(2).split(" — ")[0]}</b><small>Vijayawada</small></div><b>${x.split(" — ")[1]}</b><button class="plus" onclick="this.textContent='✓'">+</button></div>`).join("")}</div><div class="panel">${kv("Delivery Point","Vijayawada Highway Junction")}</div><button class="primary full" onclick="go('delivery-progress')">Request Delivery</button></div></div>`;
}
function deliveryProgress(){
 return `<div class="screen">${topbar("Delivery in Progress")}<div class="content"><div class="panel"><div class="mechanic"><div class="avatar">🧑‍✈️</div><div class="grow"><b>Raju Kumar <span class="rating">★ 4.8</span></b><small>Delivery Partner · +91 98765 43210</small></div></div>${kv("Assigned","5 min")}${kv("Reached Vendor","12 min")}${kv("In the Way","18 min")}</div><div class="map"><span class="marker start">🛵</span><span class="marker end">📍</span><div class="route"></div></div><button class="primary full" style="margin-top:10px" onclick="go('delivery-boy')">Track Live Location</button></div></div>`;
}
function deliveryBoy(){
 return `<div class="screen">${topbar("Delivery Boy Details")}<div class="content"><div class="panel"><div class="mechanic"><div class="avatar">🧑‍✈️</div><div class="grow"><b>Raju Kumar <span class="rating">★ 4.8</span></b><small>+91 98765 43210</small></div></div><h4>About</h4><p class="meta">Quick & Safe Delivery Partner with NaviGoo</p>${kv("Vehicle Details","Activa 125 – Scooter")}${kv("Current Task","Deliver sweets to Vijayawada Highway Junction")}</div><button class="secondary" onclick="go('delivery-tracking')">Call Delivery Partner</button></div></div>`;
}
function deliveryTracking(){
 return `<div class="screen">${topbar("Tracking Location")}<div class="content"><div class="map" style="height:390px"><span class="marker start" style="left:35%;top:30%">🛵</span><span class="marker end" style="right:22%;top:62%">📍</span><div class="route" style="left:35%;top:50%;width:38%;transform:rotate(28deg)"></div><span class="live">Delivery Boy 2.4 km away</span></div><div class="panel">${kv("En Route to","Vijayawada Highway Junction")}${kv("ETA","18 mins")}</div><button class="primary full" onclick="go('delivered')">Simulate Delivery Complete</button></div></div>`;
}
function delivered(){
 return `<div class="screen"><div class="home-head"><div class="brand"><div class="pin-logo">📍</div><h1>NaviGoo</h1><p>Your Journey. Our Support.</p></div></div><div class="success"><div class="check">✓</div><h2>Delivered Successfully!</h2><p class="meta">Your request has been completed.</p><div class="panel">${kv("Item","Pure Ghee Sweets")}${kv("Amount","₹450")}${kv("Delivery Point","Vijayawada Highway Junction")}</div><button class="primary full" onclick="go('home')">⌂ Back to Home</button></div></div>`;
}

function sos(){
 return `<div class="screen">${topbar("SOS Emergency")}<div class="content center"><button class="sos-button" onclick="go('emergency-type')">SOS</button><p style="color:#e52a2a;font-weight:800">Tap to request emergency help</p><div class="panel"><div class="section-title">Emergency Services</div><div style="display:flex;justify-content:space-around;font-size:11px;font-weight:800"><span>🚑<br>Ambulance</span><span>👮<br>Police</span><span>🔥<br>Fire Brigade</span></div></div><div class="panel">${kv("Your Location","Amalapuram, Andhra Pradesh, India")}<small class="meta">Share Live Location</small></div></div></div>`;
}
function emergencyType(){
 return `<div class="screen">${topbar("Select Emergency Type")}<div class="content"><div class="center"><h3>What do you need help with?</h3></div>${["🚑 Medical Emergency","🚗 Road Accident","🧑 Unconscious Person","❤️ Heart Related","⚠️ Other Emergency"].map(x=>`<button class="vehicle-option" onclick="go('finding-ambulance')"><span class="emoji">${x.split(" ")[0]}</span><span class="grow"><b>${x.substring(2)}</b><small>Tap to select</small></span>○</button>`).join("")}<button class="primary full" onclick="go('finding-ambulance')">Continue</button></div></div>`;
}
function findingAmbulance(){
 return `<div class="screen">${topbar("Finding Ambulance")}<div class="content center"><div style="font-size:130px">🚑</div><h3>Finding nearest ambulance...</h3><div class="panel" style="text-align:left">✓ Sending your location<br><br>✓ Searching nearby ambulances<br><br>✓ Checking availability<br><br>◌ Connecting to ambulance</div></div></div>`;
}
function ambulanceFound(){
 return `<div class="screen">${topbar("Ambulance Found")}<div class="content"><div class="panel"><div style="font-size:90px;text-align:center">🚑</div><h3>Ambulance is on the way</h3>${kv("Ambulance No.","AP39 EM 1234")}${kv("Type","Advanced Life Support")}${kv("Distance","2.4 km away")}${kv("Est. Arrival","6 min")}<div class="mechanic"><div class="avatar">👨</div><div class="grow"><b>Ramesh Kumar</b><small>Ambulance Driver · ★ 4.8</small></div>☎</div></div><button class="primary full" onclick="go('tracking-ambulance')">Track Ambulance</button></div></div>`;
}
function trackingAmbulance(){
 return `<div class="screen">${topbar("Tracking Ambulance")}<div class="content"><span class="status">On The Way</span><div class="map" style="margin-top:10px"><span class="marker start">🚑</span><span class="marker end">📍</span><div class="route"></div></div><div class="panel">${kv("Ambulance Driver","Ramesh Kumar")}${kv("Live Distance","2.4 km away")}${kv("ETA","6 min")}</div><button class="primary full" onclick="go('ambulance-arrived')">Share Live Location</button></div></div>`;
}
function ambulanceArrived(){
 return `<div class="screen">${topbar("Ambulance On The Way")}<div class="content"><div class="map"><span class="marker start">🚑</span><span class="marker end">📍</span><div class="route"></div></div><div class="panel">${kv("Live Status","Ambulance is on the way")}${kv("ETA","3 min")}<div class="mechanic"><div class="avatar">👨</div><div class="grow"><b>Ramesh Kumar</b><small>Ambulance Driver · ★ 4.8</small></div></div></div><button class="primary full" onclick="go('hospital')">Continue</button></div></div>`;
}
function hospital(){
 return `<div class="screen">${topbar("Arrived at Hospital")}<div class="content"><div class="panel"><div style="font-size:90px;text-align:center">🏥</div><h3>You have arrived at the hospital</h3>${kv("Hospital","Government General Hospital, Kakinada")}<div class="mechanic"><div class="avatar">👨</div><div class="grow"><b>Ramesh Kumar</b><small>Ambulance Driver · ★ 4.8</small></div></div></div><button class="primary full" onclick="go('trip-completed')">Mark as Reached</button></div></div>`;
}
function tripCompleted(){
 return `<div class="screen"><div class="home-head"><div class="brand"><div class="pin-logo">📍</div><h1>NaviGoo</h1></div></div><div class="success"><div class="check">✓</div><h2>Thank You!</h2><p class="meta">Your emergency trip has been completed.</p><div class="panel">${kv("From","Amalapuram")}${kv("To","Government General Hospital, Kakinada")}${kv("Completed On","12 May 2024, 11:45 AM")}</div><button class="secondary" onclick="go('home')">Go to Home</button></div></div>`;
}
function profile(){return `<div class="screen">${topbar("Profile",false)}<div class="content"><div class="panel center"><div class="avatar" style="margin:auto;width:80px;height:80px;font-size:40px">👤</div><h2>Welcome to NaviGoo</h2><p class="meta">Manage your account, bookings and preferences.</p></div><div class="panel">${["👤 Personal Details","📋 My Bookings","💳 Payments","🔔 Notifications","⚙️ Settings","❓ Help & Support"].map(x=>`<button class="vehicle-option" onclick="alert('This section is ready for integration.')">${x}<span style="margin-left:auto">›</span></button>`).join("")}</div></div>${nav("profile")}</div>`}
function notifications(){return `<div class="screen">${topbar("Notifications")}<div class="content">${["Your booking is confirmed","Mechanic is 10 minutes away","Delivery partner is on the way"].map((x,i)=>`<div class="panel"><b>${["🚗","🔧","🛵"][i]} ${x}</b><p class="meta">Just now · NaviGoo</p></div>`).join("")}</div></div>`}
function services(){return `<div class="screen">${topbar("My Services",false)}<div class="content"><div class="section-title">Choose a service</div><div class="service-grid">${serviceCard("🚗","Self-Drive Rentals & Cars With Drivers","rentals")}${serviceCard("🛠️","Roadside Assistance","roadside")}${serviceCard("🛵","Route Based Delivery","delivery")}${serviceCard("🚑","SOS Emergency","sos","sos")}</div></div>${nav("services")}</div>`}

function render(){
 const pages={home,rentals,"car-details":carDetails,"booking-summary":bookingSummary,"tracking-self":trackingSelf,
 driver,"driver-vehicles":driverVehicles,"ride-confirm":rideConfirm,"tracking-driver":trackingDriver,"trip-details":tripDetails,
 roadside,problems,mechanics,"mechanic-details":mechanicDetails,"confirm-request":confirmRequest,"request-confirmed":requestConfirmed,
 "tracking-mechanic":trackingMechanic,"mechanic-arrived":mechanicArrived,delivery,"delivery-progress":deliveryProgress,"delivery-boy":deliveryBoy,
 "delivery-tracking":deliveryTracking,delivered,sos,"emergency-type":emergencyType,"finding-ambulance":findingAmbulance,"ambulance-found":ambulanceFound,
 "tracking-ambulance":trackingAmbulance,"ambulance-arrived":ambulanceArrived,hospital,"trip-completed":tripCompleted,profile,notifications,services};
 app.innerHTML=(pages[state.screen]||home)();
 window.scrollTo(0,0);
}
function go(screen){state.screen=screen;render()}
function selectCar(i){state.selectedCar=cars[i].name;go("car-details")}
render();
