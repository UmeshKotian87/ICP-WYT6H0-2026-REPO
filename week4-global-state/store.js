// ---------- INITIAL STATE ----------
const initialState = {
  count: 0,
  user: null
};

// ---------- REDUCER ----------
function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };

    case "DECREMENT":
      return { ...state, count: state.count - 1 };

    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
}

// ---------- STORE ----------
function createStore(reducer) {
  let state = reducer(undefined, {});
  const listeners = [];

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach(l => l());
    },
    subscribe(listener) {
      listeners.push(listener);
    }
  };
}

const store = createStore(reducer);

// ---------- UI UPDATE ----------
function render() {
  const state = store.getState();
  document.getElementById("count").innerText = state.count;
  document.getElementById("user").innerText =
    state.user ? `Hello, ${state.user}` : "Not Logged In";
}

store.subscribe(render);
render();

// ---------- ACTIONS ----------
function increment() {
  store.dispatch({ type: "INCREMENT" });
}

function decrement() {
  store.dispatch({ type: "DECREMENT" });
}

function login() {
  store.dispatch({ type: "LOGIN", payload: "Umesh" });
}

function logout() {
  store.dispatch({ type: "LOGOUT" });
}
