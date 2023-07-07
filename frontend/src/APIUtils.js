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
