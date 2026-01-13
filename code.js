(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) s(t);
  new MutationObserver((t) => {
    for (const a of t)
      if (a.type === "childList")
        for (const c of a.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && s(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(t) {
    const a = {};
    return (
      t.integrity && (a.integrity = t.integrity),
      t.referrerPolicy && (a.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : t.crossOrigin === "anonymous"
        ? (a.credentials = "omit")
        : (a.credentials = "same-origin"),
      a
    );
  }
  function s(t) {
    if (t.ep) return;
    t.ep = !0;
    const a = o(t);
    fetch(t.href, a);
  }
})();
const g = [
    { id: 1, name: "Alex", avatar: "A", status: "online", messages: [] },
    {
      id: 2,
      name: "Bot",
      avatar: "B",
      status: "last seen recently",
      messages: [
        {
          id: 1,
          author: "bot",
          text: "Напиши мені Привіт і я тобі відповім🤖",
          time: "17:10",
        },
      ],
    },
  ],
  I = "chat_app_data";
function b(e) {
  localStorage.setItem(I, JSON.stringify(e));
}
function T() {
  const e = localStorage.getItem(I);
  return e ? JSON.parse(e) : null;
}
function h(e, n) {
  const o = document.querySelector(".chat-list");
  (o.innerHTML = ""),
    e.forEach((s) => {
      const t = document.createElement("li");
      (t.className = `chat-item ${s.id === n ? "active" : ""}`),
        (t.dataset.id = s.id),
        (t.innerHTML = `
      <div class="avatar">${s.avatar}</div>
      <div class="chat-info">
        <div class="chat-name">${s.name}</div>
        <div class="last-message">
          ${s.messages.at(-1)?.text || ""}
        </div>
      </div>
      <span class="chat-time">
        ${s.messages.at(-1)?.time || ""}
      </span>
    `),
        o.appendChild(t);
    });
}
function B(e) {
  const n = document.createElement("div");
  return (
    (n.className = `message ${e.author === "me" ? "outgoing" : "incoming"}`),
    (n.innerHTML = `
    <div class="message-text">${e.text}</div>
    <span class="message-time">${e.time}</span>
  `),
    n
  );
}
function M() {
  const e = document.querySelector(".messages");
  e.scrollTop = e.scrollHeight;
}
function f(e) {
  const n = document.querySelector(".messages");
  (n.innerHTML = ""),
    e.forEach((o) => {
      n.appendChild(B(o));
    }),
    M();
}
function N(e) {
  const n = document.getElementById("chat-header-name"),
    o = document.getElementById("chat-header-avatar"),
    s = document.getElementById("chat-status");
  e &&
    ((n.textContent = e.name),
    (o.textContent = e.name[0].toUpperCase()),
    (s.textContent = "online"),
    (s.className = "chat-status online"));
}
function x(e, n) {
  document.querySelector(".chat-list").addEventListener("click", (o) => {
    const s = o.target.closest(".chat-item");
    if (!s) return;
    const t = Number(s.dataset.id),
      a = e.find((c) => c.id === t);
    n(a), N(a), f(a.messages);
  });
}
function p() {
  return Date.now() + Math.random();
}
function w() {
  return new Date().toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
function A(e = "") {
  return e
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim();
}
function k(e) {
  return e[Math.floor(Math.random() * e.length)];
}
const q = "https://api.adviceslip.com/advice";
function O(e) {
  return /привіт|доброго|хай|вітаю/.test(e)
    ? "greeting"
    : /як справи|як ти|що нового/.test(e)
    ? "status"
    : /дякую|спасибі/.test(e)
    ? "thanks"
    : /бувай|пака|до зустрічі/.test(e)
    ? "bye"
    : /звати|мене звати|я /.test(e)
    ? "introduce"
    : /ти хто|що ти|ти бот/.test(e)
    ? "about_bot"
    : /допоможи|підкажи|поміч/.test(e)
    ? "help"
    : /проект|чат|програма/.test(e)
    ? "project"
    : /сумно|погано|втомився/.test(e)
    ? "sad"
    : /круто|клас|супер/.test(e)
    ? "positive"
    : /порада|пораду|дай пораду|що робити|підкажи/.test(e)
    ? "advice"
    : "unknown";
}
const C = {
  greeting: [
    "Привіт 👋 Радію, що написав!",
    "Вітаю 😊 Як настрій?",
    "Хай! Чим можу допомогти?",
  ],
  status: [
    "Все добре 😄 Працюю та відповідаю на повідомлення. А ти як?",
    "Непогано, дякую що питаєш 🙂",
    "Все стабільно. Що цікавого в тебе?",
  ],
  thanks: [
    "Завжди радий допомогти 😊",
    "Нема за що!",
    "Радий бути корисним 👍",
  ],
  bye: ["Бувай 👋 Гарного дня!", "До зустрічі! 😊", "Ще побачимось 😉"],
  about_bot: [
    "Я навчальний чат-бот 🤖. Спілкуюся та намагаюсь бути корисним.",
    "Я імітація ІІ, створена для цього чату 😄",
    "Я бот, але з людським стилем спілкування 😉",
  ],
  help: [
    "Спробую допомогти 🙂 Напиши, що саме потрібно.",
    "З радістю підкажу. Про що йдеться?",
    "Поясни детальніше — і я відповім.",
  ],
  project: [
    "Твій чат виглядає дуже круто 🔥",
    "Це класний навчальний проєкт 👍",
    "Такий чат — гарний приклад сучасного веб-додатку.",
  ],
  sad: [
    "Розумію 😔 Хочеш трохи поговорити про це?",
    "Буває… Але все налагодиться 💙",
    "Я тут, якщо хочеш виговоритись.",
  ],
  positive: [
    "Радий це чути 😄",
    "Круто! Так тримати 🔥",
    "Мені приємно це читати 😊",
  ],
  unknown: [
    "Цікава думка 🤔 Можеш пояснити трохи більше?",
    "Я не зовсім зрозумів, але хочу розібратись 🙂",
    "Розкажи детальніше, будь ласка.",
  ],
};
async function $(e) {
  return (
    await axios.get("https://api.mymemory.translated.net/get", {
      params: { q: e, langpair: "en|uk" },
    })
  ).data.responseData.translatedText;
}
async function D(e) {
  const n = A(e),
    o = O(n);
  if (o === "advice")
    try {
      const t = (await axios.get(q)).data.slip.advice;
      return "💡 Порада: " + (await $(t));
    } catch {
      return "🤖 Не вдалося отримати пораду, але ти впораєшся 💙";
    }
  return k(C[o] || C.unknown);
}
const u = document.getElementById("chat-status");
function H() {
  u &&
    ((u.textContent = "друкує…"),
    u.classList.remove("online"),
    u.classList.add("typing"));
}
function U() {
  u &&
    ((u.textContent = "online"),
    u.classList.remove("typing"),
    u.classList.add("online"));
}
function _(e, n, o) {
  const s = { id: p(), author: "me", text: n, time: w() };
  e.messages.push(s), b(o);
}
async function P(e, n, o) {
  if (!n) return;
  H();
  const s = await D(n);
  U();
  const t = { id: p(), author: "bot", text: s, time: w() };
  e.messages.push(t), b(o);
}
function K(e) {
  const n = document.querySelector(".message-form"),
    o = document.querySelector(".message-input");
  n.addEventListener("submit", async (s) => {
    s.preventDefault();
    const t = o.value.trim();
    if (!t) return;
    const a = e();
    _(a, t, g), f(a.messages), (o.value = ""), await P(a, t, g), f(a.messages);
  });
}
function V() {
  const e = document.querySelector(".message-input");
  e.addEventListener("keydown", (n) => {
    n.key === "Enter" &&
      !n.shiftKey &&
      (n.preventDefault(), e.form.requestSubmit());
  });
}
const v = document.getElementById("theme-toggle");
function j() {
  localStorage.getItem("theme") === "light" && S(),
    v.addEventListener("click", J);
}
function J() {
  document.body.classList.contains("light") ? R() : S();
}
function R() {
  document.body.classList.remove("light"),
    (v.textContent = "🌙"),
    localStorage.setItem("theme", "dark");
}
function S() {
  document.body.classList.add("light"),
    (v.textContent = "☀️"),
    localStorage.setItem("theme", "light");
}
function z(e, n, o) {
  const s = document.getElementById("new-chat-form"),
    t = document.getElementById("chat-name"),
    a = document.getElementById("chat-email"),
    c = document.getElementById("name-error"),
    y = document.getElementById("email-error");
  function E(i, r, d) {
    i.classList.add("input-error"),
      (r.textContent = d),
      r.classList.add("show");
  }
  function L(i, r) {
    i.classList.remove("input-error"),
      (r.textContent = ""),
      r.classList.remove("show");
  }
  s.addEventListener("submit", (i) => {
    i.preventDefault(), L(t, c), L(a, y);
    let r = !0;
    if (
      (t.checkValidity() ||
        (E(t, c, "Імʼя повинно містити мінімум 2 символи"), (r = !1)),
      a.checkValidity() || (E(a, y, "Введіть коректну email-адресу"), (r = !1)),
      !r)
    )
      return;
    const d = {
      id: p(),
      name: t.value.trim(),
      avatar: t.value[0].toUpperCase(),
      status: "online",
      messages: [],
    };
    e.push(d), o(d), h(e, d.id), s.reset();
  }),
    [t, a].forEach((i) => {
      i.addEventListener("input", () => {
        i.classList.remove("input-error"),
          i.nextElementSibling?.classList.remove("show");
      });
    });
}
let m = T() || g,
  l = m[0];
h(m, l.id);
f(l.messages);
x(m, (e) => {
  (l = e), h(m, l.id);
});
K(() => l);
V();
j();
z(
  m,
  () => l,
  (e) => (l = e)
);
