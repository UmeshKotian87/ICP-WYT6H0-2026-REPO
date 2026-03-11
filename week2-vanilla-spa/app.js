// ---------- GLOBAL STATE ----------
const state = {
  count: 0
};

// ---------- ROUTES ----------
const routes = {
  "/": homePage,
  "/about": aboutPage,
  "/counter": counterPage
};

// ---------- ROUTER ----------
function router() {
  const path = location.hash.slice(1) || "/";
  const route = routes[path];

  if (route) {
    route();
  } else {
    document.getElementById("app").innerHTML = "<h2>404 Page Not Found</h2>";
  }
}

// ---------- PAGES ----------
function homePage() {
  document.getElementById("app").innerHTML = `
    <h2>Home</h2>
    <p>This is a Vanilla JavaScript Single Page Application.</p>
  `;
}

function aboutPage() {
  document.getElementById("app").innerHTML = `
    <h2>About</h2>
    <p>No frameworks. Pure JavaScript Router & State.</p>
  `;
}

function counterPage() {
  document.getElementById("app").innerHTML = `
    <h2>Counter</h2>
    <p>Count: <strong>${state.count}</strong></p>
    <button id="inc">Increase</button>
  `;

  document.getElementById("inc").addEventListener("click", () => {
    state.count++;
    counterPage(); // re-render
  });
}

// ---------- EVENT LISTENERS ----------
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
