export function getAllMenu() {
  fetch("/menu/all")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
}
