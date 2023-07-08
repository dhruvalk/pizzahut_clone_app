export function getAllMenu() {
  fetch("/menu/all")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
}

export function handleSignUp(
  userId,
  firstName,
  lastName,
  username,
  email,
  password,
  contactNum,
  birthday
) {
  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
    contactNum: contactNum,
    birthday: birthday,
  };
  fetch("/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    });
}

export async function getUser(id) {
  const response = await fetch(`/users/${id}`);
  const data = await response.json();
  return data;
}

export function handleUpdateUser(
  userId,
  firstName,
  lastName,
  email,
  username,
  password,
  contactNum,
  birthday
) {
  const user = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
    contactNum: contactNum,
    birthday: birthday,
  };
  fetch("/users/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    });
}

export async function getAddressByUser(userId) {
  const response = await fetch(`/address/${userId}/all`);
  const data = await response.json();
  return data;
}
