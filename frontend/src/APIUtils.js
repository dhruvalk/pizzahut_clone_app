export async function getAllMenu() {
  const response = await fetch("/menu/all");
  const data = await response.json();
  return data;
}

export async function getItemPrices(id) {
  const response = await fetch("/price/id?itemId=" + id);
  const data = await response.json();
  return data;
}

export function createNewOrder(
  orderId,
  addressId,
  userId,
  orderDateTime,
  totalAmount,
  orderStatus,
  orderType
) {
  fetch("/orders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId: orderId,
      addressId: addressId,
      userId: userId,
      orderDateTime: orderDateTime,
      totalAmount: totalAmount,
      orderStatus: orderStatus,
      orderType: orderType,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    });
}

export async function getAllUserOrders(userid) {
  const response = await fetch("/orders/" + userid + "/all");
  const data = await response.json();
  return data;
}

export function handleSignUp(
  firstName,
  lastName,
  username,
  email,
  password,
  contactNum,
  birthday
) {
  const user = {
    userId: Math.floor(Math.random() * 100),
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
    contactNum: contactNum,
    birthday: birthday,
  };
  return fetch("/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
}

export async function handleLogIn(email, pass) {
  try {
    const response = await fetch(`/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pass }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
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

export function deleteAddress(userId, addressId) {
  fetch(`address/${userId}/${addressId}/delete`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
}

export function handleUpdateAddress(
  addressId,
  userId,
  street,
  houseNum,
  label,
  isDefault,
  createdTime,
  modifiedDateTime
) {
  const address = {
    addressId: addressId,
    userId: userId,
    street: street,
    houseNum: houseNum,
    label: label,
    isDefault: isDefault,
    createdTime: createdTime,
    modifiedDateTime: modifiedDateTime,
  };
  fetch("/address/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    });
}

export function handleAddAddress(userId, street, houseNum, label, isDefault) {
  const address = {
    addressId: Math.floor(Math.random() * 100),
    userId: userId,
    street: street,
    houseNum: houseNum,
    label: label,
    isDefault: isDefault,
    createdTime: Date.now(),
    modifiedDateTime: Date.now(),
  };
  fetch("/address/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    });
}
