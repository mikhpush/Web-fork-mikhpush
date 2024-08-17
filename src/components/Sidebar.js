import React from "react";
import { NavLink } from "react-router-dom";
import { daoesStore } from "./domen/daoesStore";
import { observer } from "mobx-react-lite";

const Sidebar = observer((props) => {
  const { isBlocked } = props;
  return (
    <aside className="sidebar-menu">
      <label className="sidebar-menu__close" htmlFor="sidebar-menu-activation">
        <i className="icon icon-close" />
      </label>
      <div className="sidebar-menu__logo">
        <a href="http://berezka.io">
          <img
            className="sidebar-menu__logo-img"
            src="/img/logo.png"
            title="Logo"
            alt="Logo"
          />
        </a>
      </div>
      {!isBlocked ? (
        <nav className="sidebar-menu__items">
          <NavLink
            className="sidebar-menu__item active"
            to="/account"
            onClick={(evt) => daoesStore.setCount(evt.target.textContent)}
          >
            My Account
          </NavLink>
          <NavLink
            activeClassName="none"
            className="sidebar-menu__item"
            to="/dashboard"
            onClick={(evt) => daoesStore.setCount(evt.target.textContent)}
          >
            Dashboard
          </NavLink>
          {false ? (
            <NavLink
              activeClassName="none"
              className="sidebar-menu__item"
              to="/referral"
            >
              Referral
            </NavLink>
          ) : (
            ""
          )}
        </nav>
      ) : (
        ""
      )}
    </aside>
  );
});

export default Sidebar;
