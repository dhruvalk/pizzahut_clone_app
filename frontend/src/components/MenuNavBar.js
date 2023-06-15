import React from "react";

export default function MenuNavBar() {
  const links = [
    { title: "Hot Deals", link: "" },
    { title: "Melts", link: "" },
    { title: "Pocket Pleasers", link: "" },
    { title: "Pizza", link: "" },
    { title: "Pasta & Baked Rice", link: "" },
    { title: "Sides", link: "" },
    { title: "Wingstreet", link: "" },
    { title: "Beverages", link: "" },
    { title: "Coupons", link: "" },
  ];
  return (
    <div className="bg-red mb-4 flex text-white py-2">
      {links.map((val) => (
        <NavLink title={val.title} />
      ))}
    </div>
  );
}

function NavLink({ title }) {
  return (
    <div className="cursor-pointer hover:opacity-70 py-2 px-4">{title}</div>
  );
}
