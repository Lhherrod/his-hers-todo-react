import { useState, useEffect } from "react";
import { auth } from "./config/firebase";

import { Routes, Route, useNavigate } from "react-router-dom";

import Auth from "./components/Auth";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import { useAppDispatch } from "./hooks/storeHook";
import { login } from "./features/auth/authSlice";
import AuthRoutes from "./components/HOC/AuthRoutes";
import GuestRoutes from "./components/HOC/GuestRoutes";
import Todos from "./pages/Todos";
import { MenuItem } from "primereact/menuitem";
import * as nav from "../public/data/navitems";
import PageNotFound from "./components/PageNotFound";

interface MenuObj {
  label: string | undefined;
  items?: MenuItem[];
  icon: string;
  command: () => void;
}

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [newMenu, setNewMenu] = useState<MenuItem[]>([]);

  const getMenuObject = (menu: MenuItem) => {
    let menuObj = {} as MenuObj;

    menuObj.label = menu.label;

    if (menu.items) {
      //if the navigation has items property then map each item and call itself again
      menuObj.items = menu.items.map((nestedItem: MenuItem) => {
        return getMenuObject(nestedItem);
      });
    }

    if (menu.icon) {
      menuObj.icon = menu.icon;
    }

    if (menu.url) {
      menuObj.command = () => {
        navigate(menu.url!);
      };
    }
    // this value is returned to navigation menu
    return menuObj;
  };

  const navigationMenu = newMenu.map((menuItem) => {
    return getMenuObject(menuItem);
  });

  useEffect(() => {
    // will always need to this keep close to nav
    const unsubscribe = auth.onAuthStateChanged((user) => {
      let newMenu: MenuItem[];
      if (user && user.email) {
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user?.photoURL || null,
          })
        );
        newMenu = nav.navItems.filter(function (navItem) {
          return navItem.label !== "Login";
        });
        setNewMenu(newMenu);
      } else {
        newMenu = nav.navItems.filter(function (navItem) {
          return navItem.label !== "Profile";
        });
        setNewMenu(newMenu);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl">
      {<Header navigationMenu={navigationMenu} />}
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route element={<GuestRoutes />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route path="/todos" element={<Todos />} />
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;