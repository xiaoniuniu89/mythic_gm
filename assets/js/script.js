import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithRedirect, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const eventAction = ["Attainment","Starting","Neglect","Fight","Recruit","Triumph","Communicate","Oppose","Inquire","Move","Release","Befriend","Judge","Separate","Take","Break","Heal","Delay","Return","Expose","Travel","Block","Harm","Create","Betray","Agree","Inspect","Ambush","Spy","Open","Ruin","Arrive","Propose","Divide","Trust","Assist","Care","Transform","Change"];
const eventSubject = ["Goals","Dreams","Environment","Allies","Enemies","Emotions","Opposition","Messages","Tension","Friendship","A project","Plans","News","A plot","Illness","Success","Travel","Jealousy","Home","Power","Intrigues","Fears","Rumor","Magic","Illusions","Danger","Weather","Nature","Leadership","Information"];
const fateChart = {"Certain":[10,13,15,17,18,19,20,20,20],"Nearly Certain":[7,10,13,15,17,18,19,20,20],"Very Likely":[5,7,10,13,15,17,18,19,20],"Likely":[3,5,7,10,13,15,17,18,19],"50/50":[2,3,5,7,10,13,15,17,18],"Unlikely":[1,2,3,5,7,10,13,15,17],"Very Unlikely":[0,1,2,3,5,7,10,13,15],"Nearly Impossible":[0,0,1,2,3,5,7,10,13],"Impossible":[0,0,0,1,2,3,5,7,10]};

let auth, db;
let state = { campaigns: [], activeCampaignId: null, activeTab: "oracle", codexType: "characters", editing: null, user: null };
const $ = (selector) => document.querySelector(selector);
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`;
const now = () => new Date().toISOString();
const active = () => state.campaigns.find((campaign) => campaign.id === state.activeCampaignId);
const campaignRef = (id) => doc(db, "users", state.user.uid, "campaigns", id);
const blankCampaign = (name, summary = "") => ({ id: uid(), name, summary, createdAt: now(), updatedAt: now(), chaos: 5, scenes: [], characters: [], threads: [] });
const escapeHtml = (value = "") => { const element = document.createElement("div"); element.textContent = value; return element.innerHTML; };
const formatDate = (value) => new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));

function sanitizeHtml(html = "") {
  const template = document.createElement("template");
  template.innerHTML = html;
  const allowed = new Set(["B", "STRONG", "I", "EM", "H3", "P", "BR", "UL", "OL", "LI", "DIV"]);
  template.content.querySelectorAll("*").forEach((element) => {
    if (!allowed.has(element.tagName)) { element.replaceWith(...element.childNodes); return; }
    [...element.attributes].forEach((attribute) => element.removeAttribute(attribute.name));
  });
  return template.innerHTML.trim();
}

function setAuthStatus(message) { $("#auth-status").textContent = message; }
function setSaveStatus(message) { $("#save-status").textContent = message; }

async function loadCampaigns() {
  setSaveStatus("Loading campaigns…");
  const snapshot = await getDocs(collection(db, "users", state.user.uid, "campaigns"));
  state.campaigns = snapshot.docs.map((item) => ({ ...item.data(), id: item.id, scenes: item.data().scenes || [], characters: item.data().characters || [], threads: item.data().threads || [], chaos: item.data().chaos || 5 }));
  setSaveStatus("Saved privately");
  renderCampaignList();
}

async function isInvited(user) {
  const invitation = await getDoc(doc(db, "allowedUsers", user.uid));
  return invitation.exists();
}

async function saveCampaign(campaign) {
  setSaveStatus("Saving…");
  try { await setDoc(campaignRef(campaign.id), campaign); setSaveStatus("Saved privately"); }
  catch (error) { console.error(error); setSaveStatus("Could not save"); }
}

function touch() { const campaign = active(); if (campaign) { campaign.updatedAt = now(); saveCampaign(campaign); renderCampaignList(); } }
function renderCampaignList() {
  const list = $("#campaign-list");
  if (!state.campaigns.length) { list.innerHTML = '<div class="empty-state">No campaign is waiting yet. Create one to give this story a home.</div>'; return; }
  list.innerHTML = state.campaigns.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map((campaign) => `<button class="campaign-card" type="button" data-campaign="${campaign.id}"><p class="campaign-meta"><span>Campaign</span><span>${formatDate(campaign.updatedAt)}</span></p><h3>${escapeHtml(campaign.name)}</h3><p>${escapeHtml(campaign.summary || "An unwritten adventure.")}</p></button>`).join("");
}
function noteCard(note, type) { return `<article class="note-card"><button class="card-edit" type="button" data-action="edit-note" data-type="${type}" data-note="${note.id}">Edit</button><p class="eyebrow">${type.slice(0, -1)}</p><h3>${escapeHtml(note.title)}</h3><div class="note-preview">${note.content ? sanitizeHtml(note.content) : "<p>No notes yet.</p>"}</div></article>`; }
function renderScenes() { const notes = active().scenes; $("#scene-list").innerHTML = notes.length ? notes.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map((note) => noteCard(note, "scene")).join("") : '<div class="empty-notes">The chronicle is blank. Add a scene when something worth remembering happens.</div>'; }
function renderCodex() {
  const notes = active()[state.codexType];
  $("#codex-empty-hint").textContent = notes.length ? `${notes.length} ${state.codexType}` : `No ${state.codexType} yet.`;
  $("[data-action='new-codex-note']").innerHTML = `Add ${state.codexType.slice(0, -1)} <span aria-hidden="true">+</span>`;
  $("#codex-list").innerHTML = notes.length ? notes.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map((note) => noteCard(note, state.codexType)).join("") : `<div class="empty-notes">No ${state.codexType} yet. Add one before the story needs it.</div>`;
}
function showTab(tab) { state.activeTab = tab; document.querySelectorAll("[data-panel]").forEach((panel) => panel.hidden = panel.dataset.panel !== tab); document.querySelectorAll("[data-tab]").forEach((button) => button.classList.toggle("is-active", button.dataset.tab === tab)); }
function renderWorkspace() {
  const campaign = active(); if (!campaign) return;
  $("#active-campaign-name").textContent = campaign.name; $("#chaos-number").textContent = campaign.chaos;
  $("#chaos-description").textContent = campaign.chaos <= 3 ? "The characters hold control" : campaign.chaos >= 7 ? "The story is slipping loose" : "Balanced uncertainty";
  $("#scene-count").textContent = campaign.scenes.length || ""; $("#codex-count").textContent = campaign.characters.length + campaign.threads.length || "";
  renderScenes(); renderCodex(); showTab(state.activeTab);
}
function openWorkspace(id) { state.activeCampaignId = id; $("#campaign-home").hidden = true; $("#workspace").hidden = false; renderWorkspace(); }
function openHome() { $("#workspace").hidden = true; $("#campaign-home").hidden = false; renderCampaignList(); }
function setResult(title, detail, label = "Oracle result") { $("#oracle-result").innerHTML = `<p class="result-label">${label}</p><h2>${title}</h2><p>${detail}</p>`; }
function randomFocus() { const campaign = active(), choices = ["A remote event", "An ambiguous event", "A new NPC", "Current context"]; if (campaign.characters.length) choices.push(`NPC action: ${campaign.characters[Math.floor(Math.random() * campaign.characters.length)].title}`); if (campaign.threads.length) choices.push(`Thread: ${campaign.threads[Math.floor(Math.random() * campaign.threads.length)].title}`); return choices[Math.floor(Math.random() * choices.length)]; }
function startScene() { const roll = Math.floor(Math.random() * 10) + 1, chaos = active().chaos; if (roll > chaos) setResult("Unmodified scene", `Roll ${roll}: the expected scene begins as imagined.`, "Scene test"); else if (roll % 2) setResult("Altered scene", `Roll ${roll}: alter an expectation before play begins.`, "Scene test"); else setResult("Interrupted scene", `Roll ${roll}: ${randomFocus()}. Draw a meaning prompt to discover what interrupts.`, "Scene test"); }
function fateRoll(odds) { const chaos = active().chaos, roll = Math.floor(Math.random() * 100) + 1, yes = fateChart[odds][chaos - 1], randomEvent = roll % 11 === 0 && roll / 11 <= chaos; let result = roll <= yes ? "Yes" : "No"; if (roll <= Math.max(0, Math.floor(yes / 5))) result = "Exceptional yes"; if (result === "No" && roll >= 81 + yes / 5) result = "Exceptional no"; setResult(result, `Rolled ${roll} against ${odds.toLowerCase()} odds at Chaos ${chaos}.${randomEvent ? ` Random event: ${randomFocus()}.` : ""}`, "Fate check"); }
function eventPrompt() { const action = eventAction[Math.floor(Math.random() * eventAction.length)], subject = eventSubject[Math.floor(Math.random() * eventSubject.length)]; setResult(`${action} · ${subject}`, "Interpret this pairing through the immediate context of your campaign.", "Meaning prompt"); }
function openNote(type, noteId = null) {
  const notes = active()[type === "scene" ? "scenes" : type], note = noteId ? notes.find((item) => item.id === noteId) : null;
  state.editing = { type, id: note?.id || null }; $("#note-kind").textContent = note ? `Edit ${type.slice(0, -1)}` : `New ${type.slice(0, -1)}`; $("#note-title").value = note?.title || ""; $("#rich-editor").innerHTML = note?.content || ""; $("[data-action='delete-note']").hidden = !note; $("#note-dialog").showModal(); setTimeout(() => $("#note-title").focus(), 0);
}
function saveNote() { const title = $("#note-title").value.trim(), content = sanitizeHtml($("#rich-editor").innerHTML); if (!title) { $("#note-title").focus(); return; } const campaign = active(), notes = campaign[state.editing.type === "scene" ? "scenes" : state.editing.type], existing = notes.find((note) => note.id === state.editing.id); if (existing) Object.assign(existing, { title, content, updatedAt: now() }); else notes.push({ id: uid(), title, content, createdAt: now(), updatedAt: now() }); touch(); renderWorkspace(); $("#note-dialog").close(); }
async function deleteNote() { const campaign = active(), key = state.editing.type === "scene" ? "scenes" : state.editing.type; campaign[key] = campaign[key].filter((note) => note.id !== state.editing.id); touch(); renderWorkspace(); $("#note-dialog").close(); }
function adjustChaos(delta) { const campaign = active(); campaign.chaos = Math.min(9, Math.max(1, campaign.chaos + delta)); touch(); renderWorkspace(); }

document.addEventListener("click", (event) => {
  const button = event.target.closest("button"); if (!button) return; const action = button.dataset.action;
  if (button.dataset.campaign) return openWorkspace(button.dataset.campaign); if (button.dataset.tab) return showTab(button.dataset.tab);
  if (button.dataset.codex) { state.codexType = button.dataset.codex; document.querySelectorAll("[data-codex]").forEach((item) => item.classList.toggle("is-active", item === button)); renderCodex(); return; }
  if (button.dataset.format) { document.execCommand(button.dataset.format, false, button.dataset.value || null); $("#rich-editor").focus(); return; }
  if (!action) return;
  if (action === "sign-in") signInWithRedirect(auth, new GoogleAuthProvider()); if (action === "sign-out") signOut(auth); if (action === "new-campaign") $("#campaign-dialog").showModal(); if (action === "return-home") openHome(); if (action === "open-help") $("#help-dialog").showModal(); if (action === "close-dialog") button.closest("dialog").close(); if (action === "chaos-up") adjustChaos(1); if (action === "chaos-down") adjustChaos(-1); if (action === "start-scene") startScene(); if (action === "ask-question") $("#odds-dialog").showModal(); if (action === "generate-event") eventPrompt(); if (action === "new-scene") openNote("scene"); if (action === "new-codex-note") openNote(state.codexType); if (action === "edit-note") openNote(button.dataset.type, button.dataset.note); if (action === "delete-note") deleteNote();
});
$("#campaign-form").addEventListener("submit", async (event) => { event.preventDefault(); const name = $("#campaign-name").value.trim(); if (!name) return; const campaign = blankCampaign(name, $("#campaign-summary").value.trim()); state.campaigns.push(campaign); await saveCampaign(campaign); event.currentTarget.reset(); $("#campaign-dialog").close(); openWorkspace(campaign.id); });
$("#odds-form").addEventListener("submit", (event) => { event.preventDefault(); fateRoll($("#odds-select").value); $("#odds-dialog").close(); });
$("#note-form").addEventListener("submit", (event) => { event.preventDefault(); saveNote(); });

async function initialise() {
  try {
    const response = await fetch("/api/firebase-config", { cache: "no-store" });
    if (!response.ok) throw new Error("Firebase configuration is unavailable.");
    const config = await response.json(); if (!config.apiKey || !config.projectId) throw new Error("Firebase environment variables are incomplete.");
    const app = initializeApp(config); auth = getAuth(app); db = getFirestore(app);
    onAuthStateChanged(auth, async (user) => {
      state.user = user;
      if (!user) { $(".app-shell").hidden = true; $("#auth-gate").hidden = false; $("#auth-sign-in").hidden = false; $("#auth-sign-out").hidden = true; setAuthStatus("Sign in with an invited Google account."); return; }
      try {
        if (!await isInvited(user)) {
          $(".app-shell").hidden = true; $("#auth-gate").hidden = false; $("#auth-sign-in").hidden = true; $("#auth-sign-out").hidden = false;
          setAuthStatus(`${user.email || "This account"} has not been invited. Ask the campaign owner for access.`);
          return;
        }
        $("#auth-gate").hidden = true; $(".app-shell").hidden = false; $("#account-name").textContent = user.email || "Signed in";
        await loadCampaigns(); openHome();
      } catch (error) { console.error(error); $(".app-shell").hidden = true; $("#auth-gate").hidden = false; setAuthStatus("Access could not be confirmed. Check the Firestore invite rules."); }
    });
  } catch (error) { console.error(error); setAuthStatus(`${error.message} Check the Vercel environment variables, then redeploy.`); }
}
initialise();
