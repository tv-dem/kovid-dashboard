export function set(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function get(name, subst = null) {
  return JSON.parse(window.localStorage.getItem(name) || subst);
}

export function remove(name) {
  window.localStorage.removeItem(name);
}
