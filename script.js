/**
 * StudyMate - Modern Purple & White Student Productivity Suite
 * Core JavaScript Logic: script.js
 */

// ==========================================================================
// 1. Initial State & Data Persistence Layer
// ==========================================================================

const DEFAULT_USER = {
  name: "Alex Carter",
  email: "alex.carter@student.edu",
  avatar: "AC",
  streak: 5,
  focusSessionsToday: 4,
  focusMinutesToday: 100
};

const DEFAULT_NOTES = [
  {
    id: "n-1",
    title: "Calculus III - Vector Fields & Divergence",
    content: "Remember that Gauss's Divergence Theorem connects the flux through a closed surface with the volume divergence integral: ∬ F·dS = ∭ (∇·F) dV.\nNext quiz will focus on conservative field checks.",
    category: "Mathematics",
    color: "#8b5cf6",
    pinned: true,
    updatedAt: "Today, 10:30 AM"
  },
  {
    id: "n-2",
    title: "Data Structures - Graph Traversal & Dijkstra",
    content: "Dijkstra's algorithm uses a priority queue (min-heap) with time complexity O((V + E) log V). Key invariant: all edges must have non-negative weights.",
    category: "Computer Science",
    color: "#6d28d9",
    pinned: false,
    updatedAt: "Yesterday"
  },
  {
    id: "n-3",
    title: "Quantum Physics - Wave Particle Duality",
    content: "de Broglie wavelength: λ = h / p. Review Young's double slit interference pattern with electron beams for lab report discussion.",
    category: "Physics",
    color: "#a78bfa",
    pinned: false,
    updatedAt: "3 days ago"
  }
];

const DEFAULT_ASSIGNMENTS = [
  {
    id: "a-1",
    title: "Machine Learning Lab 3: Neural Net Classifier",
    subject: "Computer Science",
    deadline: "2026-11-20T23:59",
    priority: "High",
    status: "inprogress"
  },
  {
    id: "a-2",
    title: "Linear Algebra Problem Set 7",
    subject: "Mathematics",
    deadline: "2026-11-18T17:00",
    priority: "Medium",
    status: "todo"
  },
  {
    id: "a-3",
    title: "Organic Chemistry Laboratory Synthesis Report",
    subject: "Chemistry",
    deadline: "2026-11-16T12:00",
    priority: "High",
    status: "todo"
  },
  {
    id: "a-4",
    title: "Microeconomics Essay on Game Theory",
    subject: "Economics",
    deadline: "2026-11-12T23:59",
    priority: "Low",
    status: "done"
  }
];

const DEFAULT_TIMETABLE = [
  { id: "tt-1", day: "Monday", time: "09:00 - 10:30", subject: "Advanced Algorithms", room: "Hall B-204", teacher: "Prof. Henderson", color: "#7c3aed" },
  { id: "tt-2", day: "Monday", time: "11:00 - 12:30", subject: "Discrete Mathematics", room: "Hall A-102", teacher: "Dr. Evelyn Ross", color: "#6d28d9" },
  { id: "tt-3", day: "Monday", time: "14:00 - 16:00", subject: "AI Lab Session", room: "CS Lab 4", teacher: "Eng. Samuel Vance", color: "#8b5cf6" },
  
  { id: "tt-4", day: "Tuesday", time: "10:00 - 11:30", subject: "Database Systems", room: "Hall C-301", teacher: "Prof. Zhao", color: "#7c3aed" },
  { id: "tt-5", day: "Tuesday", time: "13:00 - 14:30", subject: "Physics II (Electromagnetism)", room: "Science Wing 12", teacher: "Dr. Alistair Finch", color: "#6d28d9" },

  { id: "tt-6", day: "Wednesday", time: "09:00 - 10:30", subject: "Advanced Algorithms", room: "Hall B-204", teacher: "Prof. Henderson", color: "#7c3aed" },
  { id: "tt-7", day: "Wednesday", time: "11:00 - 13:00", subject: "Software Engineering Studio", room: "Design Hub", teacher: "Prof. Karen Hall", color: "#8b5cf6" },

  { id: "tt-8", day: "Thursday", time: "10:30 - 12:00", subject: "Discrete Mathematics", room: "Hall A-102", teacher: "Dr. Evelyn Ross", color: "#6d28d9" },
  { id: "tt-9", day: "Thursday", time: "14:00 - 15:30", subject: "Database Systems", room: "Hall C-301", teacher: "Prof. Zhao", color: "#7c3aed" },

  { id: "tt-10", day: "Friday", time: "09:30 - 11:00", subject: "Economics & Game Theory", room: "Social Sci 10", teacher: "Dr. Julian Croft", color: "#8b5cf6" },
  { id: "tt-11", day: "Friday", time: "13:00 - 15:00", subject: "Independent Study & Seminar", room: "Library Rm 3", teacher: "Dean Foster", color: "#6d28d9" }
];

// Setting exam dates relative to current date (e.g. November 2026 or dynamically calculated)
const now = new Date();
const exam1Date = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000 + 4 * 3600 * 1000);
const exam2Date = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + 9 * 3600 * 1000);
const exam3Date = new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000);

const DEFAULT_EXAMS = [
  {
    id: "ex-1",
    title: "Midterm: Data Structures & Algorithms",
    subject: "Computer Science",
    date: exam1Date.toISOString().slice(0, 16),
    prepProgress: 75
  },
  {
    id: "ex-2",
    title: "Calculus & Linear Algebra Finals",
    subject: "Mathematics",
    date: exam2Date.toISOString().slice(0, 16),
    prepProgress: 45
  },
  {
    id: "ex-3",
    title: "Electromagnetism Comprehensive",
    subject: "Physics",
    date: exam3Date.toISOString().slice(0, 16),
    prepProgress: 30
  }
];

class StudyMateStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem("studymate_user")) {
      localStorage.setItem("studymate_user", JSON.stringify(DEFAULT_USER));
    }
    if (!localStorage.getItem("studymate_notes")) {
      localStorage.setItem("studymate_notes", JSON.stringify(DEFAULT_NOTES));
    }
    if (!localStorage.getItem("studymate_assignments")) {
      localStorage.setItem("studymate_assignments", JSON.stringify(DEFAULT_ASSIGNMENTS));
    }
    if (!localStorage.getItem("studymate_timetable")) {
      localStorage.setItem("studymate_timetable", JSON.stringify(DEFAULT_TIMETABLE));
    }
    if (!localStorage.getItem("studymate_exams")) {
      localStorage.setItem("studymate_exams", JSON.stringify(DEFAULT_EXAMS));
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem("studymate_user")) || DEFAULT_USER;
  }
  setUser(user) {
    localStorage.setItem("studymate_user", JSON.stringify(user));
  }

  getNotes() {
    return JSON.parse(localStorage.getItem("studymate_notes")) || [];
  }
  setNotes(notes) {
    localStorage.setItem("studymate_notes", JSON.stringify(notes));
  }

  getAssignments() {
    return JSON.parse(localStorage.getItem("studymate_assignments")) || [];
  }
  setAssignments(assignments) {
    localStorage.setItem("studymate_assignments", JSON.stringify(assignments));
  }

  getTimetable() {
    return JSON.parse(localStorage.getItem("studymate_timetable")) || [];
  }
  setTimetable(tt) {
    localStorage.setItem("studymate_timetable", JSON.stringify(tt));
  }

  getExams() {
    return JSON.parse(localStorage.getItem("studymate_exams")) || [];
  }
  setExams(exams) {
    localStorage.setItem("studymate_exams", JSON.stringify(exams));
  }
}

const store = new StudyMateStore();

// ==========================================================================
// 2. Notification / Toast Helper
// ==========================================================================

function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const iconClass = type === "success" 
    ? "fa-circle-check" 
    : type === "warning" 
    ? "fa-triangle-exclamation" 
    : "fa-circle-info";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}" style="font-size: 1.1rem; color: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// 3. Web Audio API Ambient Sound & Chime System (Zero External Assets Needed!)
// ==========================================================================

class AmbientSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.currentSoundNode = null;
    this.activeType = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  playRain() {
    this.stop();
    this.init();
    this.activeType = "rain";

    // Pink/Brown noise generator for realistic gentle rain
    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to warm frequencies
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 850;

    const gainNode = this.audioCtx.createGain();
    gainNode.gain.value = 0.3;

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    whiteNoise.start();
    this.currentSoundNode = { source: whiteNoise, gain: gainNode };
  }

  playWhiteNoise() {
    this.stop();
    this.init();
    this.activeType = "whitenoise";

    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.035;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 0.8;

    const gainNode = this.audioCtx.createGain();
    gainNode.gain.value = 0.25;

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    noise.start();
    this.currentSoundNode = { source: noise, gain: gainNode };
  }

  playBinauralAlpha() {
    this.stop();
    this.init();
    this.activeType = "binaural";

    // 200Hz base with 10Hz Alpha wave difference (210Hz)
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc1.type = "sine";
    osc1.frequency.value = 200;

    osc2.type = "sine";
    osc2.frequency.value = 210; // 10 Hz alpha wave beat

    gainNode.gain.value = 0.07;

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc1.start();
    osc2.start();

    this.currentSoundNode = { source: { stop: () => { osc1.stop(); osc2.stop(); } } };
  }

  playCompletionChime() {
    this.init();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.15); // A5
    osc.frequency.setValueAtTime(1174.66, now + 0.3); // D6

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 1.2);
  }

  stop() {
    if (this.currentSoundNode && this.currentSoundNode.source) {
      try {
        this.currentSoundNode.source.stop();
      } catch (e) {}
      this.currentSoundNode = null;
    }
    this.activeType = null;
  }
}

const soundEngine = new AmbientSoundEngine();

// ==========================================================================
// 4. Focus Zone Pomodoro Timer Logic
// ==========================================================================

class PomodoroTimer {
  constructor() {
    this.modes = {
      pomodoro: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60
    };
    this.currentMode = "pomodoro";
    this.timeLeft = this.modes.pomodoro;
    this.totalDuration = this.modes.pomodoro;
    this.isRunning = false;
    this.interval = null;

    this.domElements = {
      clock: document.getElementById("timer-clock"),
      status: document.getElementById("timer-status"),
      toggleBtn: document.getElementById("timer-toggle-btn"),
      resetBtn: document.getElementById("timer-reset-btn"),
      circleProgress: document.getElementById("timer-circle-progress"),
      modeBtns: document.querySelectorAll(".mode-btn")
    };

    this.attachEvents();
    this.render();
  }

  attachEvents() {
    if (this.domElements.toggleBtn) {
      this.domElements.toggleBtn.addEventListener("click", () => this.toggle());
    }
    if (this.domElements.resetBtn) {
      this.domElements.resetBtn.addEventListener("click", () => this.reset());
    }

    if (this.domElements.modeBtns) {
      this.domElements.modeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
          const mode = e.currentTarget.dataset.mode;
          this.switchMode(mode);
        });
      });
    }
  }

  switchMode(mode) {
    if (!this.modes[mode]) return;
    this.pause();
    this.currentMode = mode;
    this.totalDuration = this.modes[mode];
    this.timeLeft = this.totalDuration;

    if (this.domElements.modeBtns) {
      this.domElements.modeBtns.forEach(b => {
        b.classList.toggle("active", b.dataset.mode === mode);
      });
    }

    if (this.domElements.status) {
      this.domElements.status.textContent = mode === "pomodoro" ? "Focus Session" : (mode === "shortBreak" ? "Short Break" : "Long Rest");
    }

    this.render();
  }

  toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (this.domElements.toggleBtn) {
      this.domElements.toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      this.domElements.toggleBtn.setAttribute("title", "Pause Timer");
    }

    this.interval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.onComplete();
      }
      this.render();
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.interval);
    if (this.domElements.toggleBtn) {
      this.domElements.toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      this.domElements.toggleBtn.setAttribute("title", "Start Focus");
    }
  }

  reset() {
    this.pause();
    this.timeLeft = this.totalDuration;
    this.render();
  }

  onComplete() {
    this.pause();
    soundEngine.playCompletionChime();

    if (this.currentMode === "pomodoro") {
      const user = store.getUser();
      user.focusSessionsToday = (user.focusSessionsToday || 0) + 1;
      user.focusMinutesToday = (user.focusMinutesToday || 0) + 25;
      store.setUser(user);
      updateDashboardStats();
      showToast("🎉 Excellent work! 25-minute study session completed! Take a 5-minute break.");
      this.switchMode("shortBreak");
    } else {
      showToast("Break finished! Time to dive back into learning.");
      this.switchMode("pomodoro");
    }
  }

  render() {
    const mins = Math.floor(this.timeLeft / 60);
    const secs = this.timeLeft % 60;
    const timeFormatted = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

    if (this.domElements.clock) {
      this.domElements.clock.textContent = timeFormatted;
    }

    // Circular SVG dashoffset computation (circumference of r=130 is 2 * PI * 130 ≈ 816.8)
    const circumference = 816.8;
    const fraction = this.timeLeft / this.totalDuration;
    const offset = circumference * (1 - fraction);

    if (this.domElements.circleProgress) {
      this.domElements.circleProgress.style.strokeDashoffset = offset;
    }

    // Update document title if timer is running
    if (this.isRunning) {
      document.title = `(${timeFormatted}) StudyMate Focus`;
    } else if (document.title.startsWith("(")) {
      document.title = "StudyMate - Student Productivity Suite";
    }
  }
}

// ==========================================================================
// 5. Notes Manager (CRUD + Filter + Search)
// ==========================================================================

let activeCategoryFilter = "All";
let noteSearchQuery = "";
let editingNoteId = null;

function renderNotes() {
  const container = document.getElementById("notes-container");
  if (!container) return;

  const notes = store.getNotes();
  const filtered = notes.filter(note => {
    const matchesCat = activeCategoryFilter === "All" || note.category.toLowerCase() === activeCategoryFilter.toLowerCase();
    const query = noteSearchQuery.toLowerCase().trim();
    const matchesQuery = !query || note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  // Sort pinned first
  filtered.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <i class="fa-solid fa-file-pen" style="font-size: 2.5rem; color: var(--primary-300); margin-bottom: 0.8rem;"></i>
        <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);">No notes found</h4>
        <p style="font-size: 0.9rem; margin-top: 0.3rem;">Try another filter or click "+ New Note" to capture your knowledge.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(note => `
    <div class="note-card ${note.pinned ? 'pinned' : ''}" id="note-card-${note.id}">
      <div>
        <div class="note-header">
          <span class="badge badge-purple" style="border-left: 3px solid ${note.color};">
            <i class="fa-solid fa-tag" style="font-size: 0.7rem;"></i> ${escapeHtml(note.category)}
          </span>
          <div class="note-actions">
            <button class="note-btn" onclick="togglePinNote('${note.id}')" title="${note.pinned ? 'Unpin' : 'Pin note'}">
              <i class="fa-${note.pinned ? 'solid' : 'regular'} fa-thumbtack" style="${note.pinned ? 'color: var(--primary-600);' : ''}"></i>
            </button>
            <button class="note-btn" onclick="openEditNoteModal('${note.id}')" title="Edit note">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="note-btn delete" onclick="deleteNote('${note.id}')" title="Delete note">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
        <h3 class="note-title">${escapeHtml(note.title)}</h3>
        <p class="note-body">${escapeHtml(note.content)}</p>
      </div>
      <div class="note-footer">
        <span><i class="fa-regular fa-clock"></i> ${note.updatedAt || 'Recently'}</span>
        ${note.pinned ? '<span style="color: var(--primary-700); font-weight: 600;"><i class="fa-solid fa-thumbtack"></i> Pinned</span>' : ''}
      </div>
    </div>
  `).join("");
}

function openAddNoteModal() {
  editingNoteId = null;
  document.getElementById("note-modal-title").textContent = "Create New Note";
  document.getElementById("note-title-input").value = "";
  document.getElementById("note-content-input").value = "";
  document.getElementById("note-category-input").value = "Mathematics";
  openModal("note-modal");
}

function openEditNoteModal(id) {
  const notes = store.getNotes();
  const note = notes.find(n => n.id === id);
  if (!note) return;

  editingNoteId = id;
  document.getElementById("note-modal-title").textContent = "Edit Note";
  document.getElementById("note-title-input").value = note.title;
  document.getElementById("note-content-input").value = note.content;
  document.getElementById("note-category-input").value = note.category;
  openModal("note-modal");
}

function saveNoteHandler(e) {
  e.preventDefault();
  const title = document.getElementById("note-title-input").value.trim();
  const content = document.getElementById("note-content-input").value.trim();
  const category = document.getElementById("note-category-input").value;

  if (!title) {
    showToast("Please provide a note title", "warning");
    return;
  }

  const notes = store.getNotes();
  if (editingNoteId) {
    const idx = notes.findIndex(n => n.id === editingNoteId);
    if (idx !== -1) {
      notes[idx].title = title;
      notes[idx].content = content;
      notes[idx].category = category;
      notes[idx].updatedAt = "Just now";
      store.setNotes(notes);
      showToast("Note updated successfully!");
    }
  } else {
    const newNote = {
      id: "n-" + Date.now(),
      title,
      content,
      category,
      color: category === "Mathematics" ? "#8b5cf6" : (category === "Computer Science" ? "#6d28d9" : "#a78bfa"),
      pinned: false,
      updatedAt: "Just now"
    };
    notes.unshift(newNote);
    store.setNotes(notes);
    showToast("New note created!");
  }

  closeModal("note-modal");
  renderNotes();
  updateDashboardStats();
}

function togglePinNote(id) {
  const notes = store.getNotes();
  const note = notes.find(n => n.id === id);
  if (note) {
    note.pinned = !note.pinned;
    store.setNotes(notes);
    renderNotes();
    showToast(note.pinned ? "Note pinned to top!" : "Note unpinned");
  }
}

function deleteNote(id) {
  if (confirm("Are you sure you want to delete this study note?")) {
    let notes = store.getNotes();
    notes = notes.filter(n => n.id !== id);
    store.setNotes(notes);
    renderNotes();
    updateDashboardStats();
    showToast("Note deleted");
  }
}

// ==========================================================================
// 6. Assignment Tracker Logic
// ==========================================================================

let assignmentFilterStatus = "all";

function renderAssignments() {
  const tbody = document.getElementById("assignments-tbody");
  if (!tbody) return;

  const assignments = store.getAssignments();
  let filtered = assignments;
  if (assignmentFilterStatus !== "all") {
    filtered = assignments.filter(a => a.status === assignmentFilterStatus);
  }

  // Update progress bar
  const total = assignments.length;
  const completed = assignments.filter(a => a.status === "done").length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const progressBar = document.getElementById("assignments-progress-fill");
  const progressText = document.getElementById("assignments-progress-text");
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `${completed}/${total} Completed (${percent}%)`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i class="fa-solid fa-list-check" style="font-size: 2rem; color: var(--primary-300); margin-bottom: 0.5rem; display: block;"></i>
          No assignments match this criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const isDone = item.status === "done";
    const dateFormatted = formatDeadline(item.deadline);
    const priorityClass = item.priority === "High" ? "badge-danger" : (item.priority === "Medium" ? "badge-warning" : "badge-purple");

    return `
      <tr>
        <td style="width: 40px;">
          <div class="checkbox-custom ${isDone ? 'checked' : ''}" onclick="toggleAssignmentDone('${item.id}')">
            ${isDone ? '<i class="fa-solid fa-check"></i>' : ''}
          </div>
        </td>
        <td>
          <div class="assignment-title-cell ${isDone ? 'completed' : ''}">
            <span>${escapeHtml(item.title)}</span>
          </div>
        </td>
        <td>
          <span class="badge badge-purple">${escapeHtml(item.subject)}</span>
        </td>
        <td>
          <span class="badge ${priorityClass}">
            <i class="fa-solid fa-flag" style="font-size: 0.7rem;"></i> ${item.priority}
          </span>
        </td>
        <td>
          <span style="font-size: 0.88rem; color: var(--text-muted); font-weight: 500;">
            <i class="fa-regular fa-calendar-xmark" style="color: var(--primary-600); margin-right: 0.35rem;"></i>
            ${dateFormatted}
          </span>
        </td>
        <td>
          <select class="status-select ${item.status}" onchange="changeAssignmentStatus('${item.id}', this.value)">
            <option value="todo" ${item.status === 'todo' ? 'selected' : ''}>⏳ To Do</option>
            <option value="inprogress" ${item.status === 'inprogress' ? 'selected' : ''}>⚡ In Progress</option>
            <option value="done" ${item.status === 'done' ? 'selected' : ''}>✅ Done</option>
          </select>
        </td>
        <td style="text-align: right; width: 60px;">
          <button class="note-btn delete" onclick="deleteAssignment('${item.id}')" title="Delete Assignment">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function formatDeadline(dateString) {
  if (!dateString) return "No date";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const options = { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return d.toLocaleDateString("en-US", options);
}

function toggleAssignmentDone(id) {
  const assignments = store.getAssignments();
  const item = assignments.find(a => a.id === id);
  if (item) {
    item.status = item.status === "done" ? "todo" : "done";
    store.setAssignments(assignments);
    renderAssignments();
    updateDashboardStats();
    showToast(item.status === "done" ? "🎉 Assignment completed!" : "Assignment marked as pending");
  }
}

function changeAssignmentStatus(id, newStatus) {
  const assignments = store.getAssignments();
  const item = assignments.find(a => a.id === id);
  if (item) {
    item.status = newStatus;
    store.setAssignments(assignments);
    renderAssignments();
    updateDashboardStats();
    showToast("Status updated");
  }
}

function deleteAssignment(id) {
  if (confirm("Delete this assignment?")) {
    let assignments = store.getAssignments();
    assignments = assignments.filter(a => a.id !== id);
    store.setAssignments(assignments);
    renderAssignments();
    updateDashboardStats();
    showToast("Assignment removed");
  }
}

function openAddAssignmentModal() {
  document.getElementById("assignment-title-input").value = "";
  document.getElementById("assignment-subject-input").value = "Mathematics";
  document.getElementById("assignment-priority-input").value = "Medium";

  // Default deadline: 3 days from now
  const defaultDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  document.getElementById("assignment-date-input").value = defaultDate.toISOString().slice(0, 16);

  openModal("assignment-modal");
}

function saveAssignmentHandler(e) {
  e.preventDefault();
  const title = document.getElementById("assignment-title-input").value.trim();
  const subject = document.getElementById("assignment-subject-input").value;
  const priority = document.getElementById("assignment-priority-input").value;
  const deadline = document.getElementById("assignment-date-input").value;

  if (!title) {
    showToast("Please provide an assignment title", "warning");
    return;
  }

  const assignments = store.getAssignments();
  assignments.push({
    id: "a-" + Date.now(),
    title,
    subject,
    priority,
    deadline,
    status: "todo"
  });

  store.setAssignments(assignments);
  closeModal("assignment-modal");
  renderAssignments();
  updateDashboardStats();
  showToast("Assignment added!");
}

// ==========================================================================
// 7. Weekly Timetable Logic
// ==========================================================================

let activeTimetableDay = "Monday";

function renderTimetable() {
  const container = document.getElementById("timetable-grid");
  if (!container) return;

  const timetable = store.getTimetable();
  const dayClasses = timetable.filter(c => c.day.toLowerCase() === activeTimetableDay.toLowerCase());

  // Sort by start time string
  dayClasses.sort((a, b) => a.time.localeCompare(b.time));

  if (dayClasses.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <i class="fa-regular fa-calendar-check" style="font-size: 2.5rem; color: var(--primary-300); margin-bottom: 0.8rem;"></i>
        <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);">No classes on ${activeTimetableDay}</h4>
        <p style="font-size: 0.9rem; margin-top: 0.3rem;">Enjoy your self-study time or click "+ Add Class" to schedule a lecture.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = dayClasses.map(cls => `
    <div class="class-card">
      <div>
        <div class="class-time-row">
          <span><i class="fa-regular fa-clock"></i> ${cls.time}</span>
          <button class="note-btn delete" onclick="deleteClass('${cls.id}')" title="Remove class">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
        <h3 class="class-title" style="margin-top: 0.5rem;">${escapeHtml(cls.subject)}</h3>
      </div>
      <div class="class-meta">
        <span><i class="fa-solid fa-location-dot" style="color: var(--primary-500);"></i> ${escapeHtml(cls.room || 'Room TBA')}</span>
        <span><i class="fa-solid fa-chalkboard-user" style="color: var(--primary-600);"></i> ${escapeHtml(cls.teacher || 'Instructor')}</span>
      </div>
    </div>
  `).join("");
}

function setTimetableDay(day) {
  activeTimetableDay = day;
  document.querySelectorAll(".day-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.day.toLowerCase() === day.toLowerCase());
  });
  renderTimetable();
}

function openAddClassModal() {
  document.getElementById("class-day-input").value = activeTimetableDay;
  document.getElementById("class-subject-input").value = "";
  document.getElementById("class-time-input").value = "10:00 - 11:30";
  document.getElementById("class-room-input").value = "";
  document.getElementById("class-teacher-input").value = "";
  openModal("class-modal");
}

function saveClassHandler(e) {
  e.preventDefault();
  const day = document.getElementById("class-day-input").value;
  const subject = document.getElementById("class-subject-input").value.trim();
  const time = document.getElementById("class-time-input").value.trim();
  const room = document.getElementById("class-room-input").value.trim();
  const teacher = document.getElementById("class-teacher-input").value.trim();

  if (!subject) {
    showToast("Please enter a subject name", "warning");
    return;
  }

  const tt = store.getTimetable();
  tt.push({
    id: "tt-" + Date.now(),
    day,
    subject,
    time: time || "TBA",
    room: room || "Online",
    teacher: teacher || "TBA",
    color: "#7c3aed"
  });

  store.setTimetable(tt);
  closeModal("class-modal");
  renderTimetable();
  updateDashboardStats();
  showToast("Class scheduled!");
}

function deleteClass(id) {
  if (confirm("Remove this class from your timetable?")) {
    let tt = store.getTimetable();
    tt = tt.filter(c => c.id !== id);
    store.setTimetable(tt);
    renderTimetable();
    showToast("Class removed");
  }
}

// ==========================================================================
// 8. Exam Countdown Manager (Live 1-sec calculations)
// ==========================================================================

let countdownInterval = null;

function renderExams() {
  const container = document.getElementById("exams-container");
  if (!container) return;

  const exams = store.getExams();
  if (exams.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <i class="fa-solid fa-hourglass-end" style="font-size: 2.5rem; color: var(--primary-300); margin-bottom: 0.8rem;"></i>
        <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);">No upcoming exams</h4>
        <p style="font-size: 0.9rem; margin-top: 0.3rem;">Keep up the consistent effort! Click "+ Add Exam" to track upcoming tests.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = exams.map(exam => {
    const timeData = calculateTimeRemaining(exam.date);
    const dateFormatted = new Date(exam.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

    return `
      <div class="exam-card" id="exam-card-${exam.id}">
        <div class="exam-card-top">
          <div>
            <span class="exam-subject-badge">${escapeHtml(exam.subject)}</span>
            <h3 class="exam-title" style="margin-top: 0.5rem;">${escapeHtml(exam.title)}</h3>
            <p class="exam-date-str">
              <i class="fa-regular fa-calendar" style="color: var(--primary-600);"></i> ${dateFormatted}
            </p>
          </div>
          <button class="note-btn delete" onclick="deleteExam('${exam.id}')" title="Delete Exam">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>

        <div class="countdown-timer-box" data-exam-date="${exam.date}">
          <div>
            <div class="time-digit days-val">${timeData.days}</div>
            <div class="time-label">Days</div>
          </div>
          <div style="font-weight: 800; font-size: 1.5rem; color: var(--primary-400);">:</div>
          <div>
            <div class="time-digit hours-val">${timeData.hours}</div>
            <div class="time-label">Hours</div>
          </div>
          <div style="font-weight: 800; font-size: 1.5rem; color: var(--primary-400);">:</div>
          <div>
            <div class="time-digit mins-val">${timeData.minutes}</div>
            <div class="time-label">Mins</div>
          </div>
          <div style="font-weight: 800; font-size: 1.5rem; color: var(--primary-400);">:</div>
          <div>
            <div class="time-digit secs-val">${timeData.seconds}</div>
            <div class="time-label">Secs</div>
          </div>
        </div>

        <div class="exam-prep-slider">
          <div class="prep-label-row">
            <span>Syllabus Prepared</span>
            <span class="font-bold" style="color: var(--primary-700);">${exam.prepProgress || 0}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${exam.prepProgress || 0}%;"></div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function calculateTimeRemaining(targetDateStr) {
  const target = new Date(targetDateStr).getTime();
  const current = new Date().getTime();
  const diff = target - current;

  if (isNaN(target) || diff <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00", totalMs: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: days.toString().padStart(2, "0"),
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
    totalMs: diff
  };
}

function startCountdownTicker() {
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const boxes = document.querySelectorAll(".countdown-timer-box");
    boxes.forEach(box => {
      const dateStr = box.getAttribute("data-exam-date");
      if (dateStr) {
        const t = calculateTimeRemaining(dateStr);
        const dEl = box.querySelector(".days-val");
        const hEl = box.querySelector(".hours-val");
        const mEl = box.querySelector(".mins-val");
        const sEl = box.querySelector(".secs-val");

        if (dEl) dEl.textContent = t.days;
        if (hEl) hEl.textContent = t.hours;
        if (mEl) mEl.textContent = t.minutes;
        if (sEl) sEl.textContent = t.seconds;
      }
    });
  }, 1000);
}

function openAddExamModal() {
  document.getElementById("exam-title-input").value = "";
  document.getElementById("exam-subject-input").value = "Mathematics";
  
  // Default date: 7 days ahead
  const defaultDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  document.getElementById("exam-date-input").value = defaultDate.toISOString().slice(0, 16);
  document.getElementById("exam-prep-input").value = 50;

  openModal("exam-modal");
}

function saveExamHandler(e) {
  e.preventDefault();
  const title = document.getElementById("exam-title-input").value.trim();
  const subject = document.getElementById("exam-subject-input").value;
  const date = document.getElementById("exam-date-input").value;
  const prepProgress = parseInt(document.getElementById("exam-prep-input").value, 10) || 0;

  if (!title) {
    showToast("Please enter exam title", "warning");
    return;
  }

  const exams = store.getExams();
  exams.push({
    id: "ex-" + Date.now(),
    title,
    subject,
    date,
    prepProgress
  });

  store.setExams(exams);
  closeModal("exam-modal");
  renderExams();
  updateDashboardStats();
  showToast("Exam countdown started!");
}

function deleteExam(id) {
  if (confirm("Remove this exam tracker?")) {
    let exams = store.getExams();
    exams = exams.filter(e => e.id !== id);
    store.setExams(exams);
    renderExams();
    updateDashboardStats();
    showToast("Exam removed");
  }
}

// ==========================================================================
// 9. Dashboard Overview & Real-Time Stats
// ==========================================================================

function updateDashboardStats() {
  const user = store.getUser();
  const notes = store.getNotes();
  const assignments = store.getAssignments();
  const exams = store.getExams();
  const timetable = store.getTimetable();

  // Pending assignments count
  const pendingCount = assignments.filter(a => a.status !== "done").length;
  const pendingStatEl = document.getElementById("stat-pending-tasks");
  if (pendingStatEl) pendingStatEl.textContent = pendingCount;
  const pendingCardEl = document.getElementById("stat-pending-tasks-card");
  if (pendingCardEl) pendingCardEl.textContent = pendingCount;
  const navAssignmentsBadge = document.getElementById("nav-assignments-count");
  if (navAssignmentsBadge) navAssignmentsBadge.textContent = pendingCount;

  // Total notes count
  const notesStatEl = document.getElementById("stat-total-notes");
  if (notesStatEl) notesStatEl.textContent = notes.length;
  const navNotesBadge = document.getElementById("nav-notes-count");
  if (navNotesBadge) navNotesBadge.textContent = notes.length;

  // Next Exam Days
  const examStatEl = document.getElementById("stat-next-exam");
  if (examStatEl) {
    if (exams.length > 0) {
      // Find nearest exam
      const sorted = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));
      const nextTime = calculateTimeRemaining(sorted[0].date);
      examStatEl.textContent = `${nextTime.days}d ${nextTime.hours}h`;
    } else {
      examStatEl.textContent = "None";
    }
  }

  // Today's classes count
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayClasses = timetable.filter(c => c.day.toLowerCase() === todayName.toLowerCase());
  const classesStatEl = document.getElementById("stat-classes-today");
  if (classesStatEl) classesStatEl.textContent = todayClasses.length;

  // User details on profile pills
  const userNameEls = document.querySelectorAll(".profile-user-name");
  userNameEls.forEach(el => el.textContent = user.name);

  const userAvatarEls = document.querySelectorAll(".profile-avatar-initials");
  userAvatarEls.forEach(el => el.textContent = user.avatar || "AC");

  const streakEls = document.querySelectorAll(".profile-streak-count");
  streakEls.forEach(el => el.textContent = user.streak || 5);

  const focusMinsEl = document.getElementById("stat-focus-time");
  if (focusMinsEl) focusMinsEl.textContent = `${user.focusMinutesToday || 0}m`;

  // Render recent preview panels on overview
  renderOverviewPanels();
}

function renderOverviewPanels() {
  // Urgent assignments on dashboard overview
  const urgentListEl = document.getElementById("overview-urgent-tasks");
  if (urgentListEl) {
    const assignments = store.getAssignments().filter(a => a.status !== "done").slice(0, 3);
    if (assignments.length === 0) {
      urgentListEl.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No pending assignments! You're completely caught up. 🎉</p>`;
    } else {
      urgentListEl.innerHTML = assignments.map(a => `
        <div class="hero-task-row" style="cursor: pointer;" onclick="switchDashboardTab('assignments')">
          <div>
            <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-main);">${escapeHtml(a.title)}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(a.subject)} • Due: ${formatDeadline(a.deadline)}</div>
          </div>
          <span class="badge ${a.priority === 'High' ? 'badge-danger' : 'badge-warning'}">${a.priority}</span>
        </div>
      `).join("");
    }
  }

  // Today's schedule preview on overview
  const scheduleListEl = document.getElementById("overview-today-schedule");
  if (scheduleListEl) {
    const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const timetable = store.getTimetable().filter(c => c.day.toLowerCase() === todayName.toLowerCase());
    if (timetable.length === 0) {
      scheduleListEl.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No scheduled classes for today (${todayName}). Perfect for focused self-study!</p>`;
    } else {
      scheduleListEl.innerHTML = timetable.map(c => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0.9rem; background: var(--primary-50); border-radius: var(--radius-md); margin-bottom: 0.5rem; border-left: 4px solid var(--primary-600);">
          <div>
            <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">${escapeHtml(c.subject)}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(c.room)} • ${escapeHtml(c.teacher)}</div>
          </div>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary-700);">${c.time}</span>
        </div>
      `).join("");
    }
  }
}

// ==========================================================================
// 10. Navigation & Tab Switcher (Dashboard SPA)
// ==========================================================================

function switchDashboardTab(tabName) {
  // Update sidebar active classes
  const navItems = document.querySelectorAll(".sidebar .nav-item");
  navItems.forEach(item => {
    item.classList.toggle("active", item.dataset.tab === tabName);
  });

  // Switch visible section
  const sections = document.querySelectorAll(".view-section");
  sections.forEach(sec => {
    sec.classList.remove("active");
  });

  const target = document.getElementById(`view-${tabName}`);
  if (target) {
    target.classList.add("active");
  }

  // Update topbar title
  const titleEl = document.getElementById("current-view-title");
  if (titleEl) {
    const titles = {
      overview: "Student Overview",
      notes: "My Study Notes",
      assignments: "Assignment Tracker",
      timetable: "Weekly Schedule",
      exams: "Exam Countdown",
      focus: "Focus Zone (Pomodoro)"
    };
    titleEl.textContent = titles[tabName] || "Dashboard";
  }

  // Close mobile sidebar on navigate
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.remove("mobile-open");

  // Re-trigger layout renders if needed
  if (tabName === "notes") renderNotes();
  if (tabName === "assignments") renderAssignments();
  if (tabName === "timetable") renderTimetable();
  if (tabName === "exams") renderExams();
}

// ==========================================================================
// 11. Modal Utilities
// ==========================================================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// ==========================================================================
// 12. Authentication & Profile Modal Logic
// ==========================================================================

function openAuthModal(defaultTab = "login") {
  switchAuthTab(defaultTab);
  openModal("auth-modal");
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById("login-form-container");
  const signupForm = document.getElementById("signup-form-container");
  const tabLogin = document.getElementById("tab-login-btn");
  const tabSignup = document.getElementById("tab-signup-btn");

  if (tab === "login") {
    if (loginForm) loginForm.style.display = "block";
    if (signupForm) signupForm.style.display = "none";
    if (tabLogin) tabLogin.classList.add("active");
    if (tabSignup) tabSignup.classList.remove("active");
  } else {
    if (loginForm) loginForm.style.display = "none";
    if (signupForm) signupForm.style.display = "block";
    if (tabLogin) tabLogin.classList.remove("active");
    if (tabSignup) tabSignup.classList.add("active");
  }
}

async function handleSignupSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const pass = document.getElementById("signup-password").value.trim();

  if (!name || !email || !pass) {
    showToast("Please complete all signup fields", "warning");
    return;
  }

  if (!window.supabaseClient) {
    showToast("Supabase is not initialized!", "warning");
    return;
  }

  try {
    const { data, error } = await window.supabaseClient.auth.signUp({
      email: email,
      password: pass,
      options: {
        data: {
          name: name
        }
      }
    });

    if (error) throw error;

    showToast("Account created! Check your email for verification.");

    closeModal("auth-modal");

  } catch (error) {
    console.error("Signup error:", error);
    showToast(error.message || "Signup failed", "warning");
  }
}
  // Create or load user
  let user = store.getUser();
  user.email = email;
  user.name = email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase());
  user.avatar = user.name.slice(0, 2).toUpperCase();
  store.setUser(user);

  showToast(`Welcome back, ${user.name}!`);
  closeModal("auth-modal");

  // If on landing page, redirect to dashboard.html
  if (window.location.pathname.endsWith("index.html") || !window.location.pathname.endsWith("dashboard.html")) {
    window.location.href = "dashboard.html";
  } else {
    updateDashboardStats();
  }
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const pass = document.getElementById("signup-password").value.trim();

  if (!name || !email || !pass) {
    showToast("Please complete all signup fields", "warning");
    return;
  }

  const newUser = {
    name,
    email,
    avatar: name.slice(0, 2).toUpperCase(),
    streak: 1,
    focusSessionsToday: 0,
    focusMinutesToday: 0
  };

  store.setUser(newUser);
  showToast(`Account created! Welcome to StudyMate, ${name}!`);
  closeModal("auth-modal");

  if (window.location.pathname.endsWith("index.html") || !window.location.pathname.endsWith("dashboard.html")) {
    window.location.href = "dashboard.html";
  } else {
    updateDashboardStats();
  }
}

function guestLogin() {
  store.setUser(DEFAULT_USER);
  showToast("Logged in with Demo Student account!");
  closeModal("auth-modal");
  if (window.location.pathname.endsWith("index.html") || !window.location.pathname.endsWith("dashboard.html")) {
    window.location.href = "dashboard.html";
  } else {
    updateDashboardStats();
  }
}

function logoutUser() {
  if (confirm("Log out of StudyMate?")) {
    showToast("Logged out successfully");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 600);
  }
}

// Escape helper for safe XSS-free markup
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Live real-time clock pill in topbar
function updateLiveClock() {
  const clockEl = document.getElementById("live-time-display");
  if (!clockEl) return;
  const now = new Date();
  clockEl.textContent = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("studymate_darkmode", isDark ? "true" : "false");
  showToast(isDark ? "🌙 Night Study mode enabled" : "☀️ Light mode enabled");
}

// ==========================================================================
// 13. DOM Content Loaded Initialization
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Check Dark Mode preference
  if (localStorage.getItem("studymate_darkmode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // Mobile sidebar toggle button
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const sidebar = document.getElementById("sidebar");
  const sidebarCloseBtn = document.getElementById("sidebar-close-btn");

  if (hamburgerBtn && sidebar) {
    hamburgerBtn.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
    });
  }

  if (sidebarCloseBtn && sidebar) {
    sidebarCloseBtn.addEventListener("click", () => {
      sidebar.classList.remove("mobile-open");
    });
  }

  // Sidebar navigation item listeners
  const navItems = document.querySelectorAll(".sidebar .nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const tab = e.currentTarget.dataset.tab;
      if (tab) switchDashboardTab(tab);
    });
  });

  // Note Search & Category chips
  const noteSearchInput = document.getElementById("note-search-input");
  if (noteSearchInput) {
    noteSearchInput.addEventListener("input", (e) => {
      noteSearchQuery = e.target.value;
      renderNotes();
    });
  }

  const categoryChips = document.querySelectorAll(".category-filter-chips .filter-chip");
  categoryChips.forEach(chip => {
    chip.addEventListener("click", (e) => {
      categoryChips.forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      activeCategoryFilter = e.currentTarget.dataset.category || "All";
      renderNotes();
    });
  });

  // Assignment filter pills
  const assignmentFilterPills = document.querySelectorAll(".assignment-filter-pill");
  assignmentFilterPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      assignmentFilterPills.forEach(p => p.classList.remove("active"));
      e.currentTarget.classList.add("active");
      assignmentFilterStatus = e.currentTarget.dataset.status || "all";
      renderAssignments();
    });
  });

  // Timetable Day tabs
  const dayTabs = document.querySelectorAll(".timetable-days-nav .day-tab");
  dayTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      setTimetableDay(e.currentTarget.dataset.day);
    });
  });

  // Ambient sound buttons
  const soundBtns = document.querySelectorAll(".sound-toggle-btn");
  soundBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const soundType = e.currentTarget.dataset.sound;
      if (soundEngine.activeType === soundType) {
        soundEngine.stop();
        soundBtns.forEach(b => b.classList.remove("active"));
        showToast("Ambient sound paused");
      } else {
        soundBtns.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (soundType === "rain") soundEngine.playRain();
        else if (soundType === "whitenoise") soundEngine.playWhiteNoise();
        else if (soundType === "binaural") soundEngine.playBinauralAlpha();
        showToast(`Playing ${soundType} ambient audio`);
      }
    });
  });

  // Forms
  const noteForm = document.getElementById("note-form");
  if (noteForm) noteForm.addEventListener("submit", saveNoteHandler);

  const assignmentForm = document.getElementById("assignment-form");
  if (assignmentForm) assignmentForm.addEventListener("submit", saveAssignmentHandler);

  const classForm = document.getElementById("class-form");
  if (classForm) classForm.addEventListener("submit", saveClassHandler);

  const examForm = document.getElementById("exam-form");
  if (examForm) examForm.addEventListener("submit", saveExamHandler);

  const loginForm = document.getElementById("auth-login-form");
  if (loginForm) loginForm.addEventListener("submit", handleLoginSubmit);

  const signupForm = document.getElementById("auth-signup-form");
  if (signupForm) signupForm.addEventListener("submit", handleSignupSubmit);

  // Close modals on background click
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  // Initialize view and data if on dashboard
  if (document.getElementById("view-overview")) {
    updateDashboardStats();
    renderNotes();
    renderAssignments();
    renderTimetable();
    renderExams();
    startCountdownTicker();
    new PomodoroTimer();

    // Clock
    updateLiveClock();
    setInterval(updateLiveClock, 1000);
  }
});
