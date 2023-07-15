import React from "react";

export default function MenuNavBar({ selectedTab, setSelectedTab }) {
  function tabSelectHandler(title) {
    setSelectedTab(title);
    console.log(title);
  }

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
    <div className="bg-red mb-4 flex flex-wrap text-white py-2">
      {links.map((val) => (
        <NavLink title={val.title} key={val.title} onClick={tabSelectHandler} />
      ))}
    </div>
  );
}

function NavLink({ title, onClick }) {
  return (
    <div
      className="cursor-pointer hover:opacity-70 py-2 px-4"
      onClick={() => onClick(title)}
    >
      {title}
    </div>
  );
}
