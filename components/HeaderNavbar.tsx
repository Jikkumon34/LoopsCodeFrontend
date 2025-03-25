"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type MenuKey = "menu1" | "menu2" | "menu3";

// Common dropdown styles
const commonStyles = {
  bg: "bg-white",
  headerText: "text-gray-800",
  itemText: "text-gray-700",
  hoverBg: "hover:bg-gray-200",
};

// Menus configuration with headers and navigation links
const menusData: Record<
  MenuKey,
  {
    title: string;
    groups: {
      header: string;
      items: { label: string; link: string }[];
    }[];
  }
> = {
  menu1: {
    title: "Menu 1",
    groups: [
      {
        header: "Python Basic",
        items: [
          { label: "Introduction", link: "/python/introduction" },
          { label: "Syntax", link: "/python/syntax" },
          { label: "Variables", link: "/python/variables" },
        ],
      },
      {
        header: "Pandas",
        items: [
          { label: "Intro", link: "/pandas/intro" },
          { label: "DataFrames", link: "/pandas/dataframes" },
          { label: "Series", link: "/pandas/series" },
        ],
      },
    ],
  },
  menu2: {
    title: "Menu 2",
    groups: [
      {
        header: "Header 1",
        items: [
          { label: "Link 2.1", link: "/link2-1" },
          { label: "Link 2.2", link: "/link2-2" },
          { label: "Link 2.3", link: "/link2-3" },
        ],
      },
      {
        header: "Header 2",
        items: [
          { label: "Link 2.4", link: "/link2-4" },
          { label: "Link 2.5", link: "/link2-5" },
          { label: "Link 2.6", link: "/link2-6" },
        ],
      },
    ],
  },
  menu3: {
    title: "Menu 3",
    groups: [
      {
        header: "Header 1",
        items: [
          { label: "Link 3.1", link: "/link3-1" },
          { label: "Link 3.2", link: "/link3-2" },
          { label: "Link 3.3", link: "/link3-3" },
        ],
      },
      {
        header: "Header 2",
        items: [
          { label: "Link 3.4", link: "/link3-4" },
          { label: "Link 3.5", link: "/link3-5" },
          { label: "Link 3.6", link: "/link3-6" },
        ],
      },
    ],
  },
};

export default function HeaderNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<MenuKey | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (storedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark-theme");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark-theme");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark-theme", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const toggleDropdown = (menu: MenuKey) =>
    setOpenDropdown(openDropdown === menu ? null : menu);
  const closeDropdown = () => setOpenDropdown(null);

  // Render the desktop dropdown content
  const renderDesktopDropdown = (menuKey: MenuKey) => {
    const menu = menusData[menuKey];
    return (
      <div
        className={`${commonStyles.bg} md:fixed md:top-[60px] md:left-0 md:w-full md:h-[calc(100vh-60px)] md:overflow-y-auto md:pt-10 md:px-4 md:pb-4 transition-opacity  shadow-xl p-4 z-[9999]`}
      >
        <button 
          onClick={closeDropdown}
          className="hidden md:flex md:absolute md:top-2 md:right-2 bg-red-500 text-white font-bold rounded-full w-8 h-8 items-center justify-center hover:bg-red-600"
        >
          ×
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menu.groups.map((group, idx) => (
            <div key={idx}>
              <h3
                className={`text-xl font-bold mb-2 ${commonStyles.headerText} uppercase tracking-wide`}
              >
                {group.header}
              </h3>
              <ul>
                {group.items.map((item, jdx) => (
                  <li key={jdx}>
                    <Link
                      href={item.link}
                      className={`block ${commonStyles.itemText} py-1 px-2 rounded ${commonStyles.hoverBg} hover:shadow-sm`}
                      onClick={closeDropdown}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render the mobile dropdown content
  const renderMobileDropdown = (menuKey: MenuKey) => {
    const menu = menusData[menuKey];
    return (
      <div className={`${commonStyles.bg} p-4`}>
        {menu.groups.map((group, idx) => (
          <div key={idx} className="mb-4">
            <h3 className={`text-lg font-bold ${commonStyles.headerText}`}>
              {group.header}
            </h3>
            <ul>
              {group.items.map((item, jdx) => (
                <li key={jdx}>
                  <Link
                    href={item.link}
                    className={`block ${commonStyles.itemText} py-1`}
                    onClick={() => {
                      closeDropdown();
                      setMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 z-[60]"
        style={{ backgroundColor: "var(--header-bg)" }}
      >
        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
          <nav className="hidden md:flex space-x-4">
            {(Object.keys(menusData) as MenuKey[]).map((menuKey) => (
              <div key={menuKey} className="relative">
                <button
                  onClick={() => toggleDropdown(menuKey)}
                  className=" px-4 py-2 flex items-center"
                >
                  <span>{menusData[menuKey].title}</span>
                  <span className="ml-1">▼</span>
                </button>
                {openDropdown === menuKey && renderDesktopDropdown(menuKey)}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold text-gray-800">
            LudoCode
          </Link>
          <nav className="flex space-x-4">
            <Link href="/courses" className="text-gray-600 hover:text-gray-800">
              Courses
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-800">
              Login
            </Link>
            <Link href="/signup" className="text-gray-600 hover:text-gray-800">
              Sign Up
            </Link>
          </nav>
          <button
            onClick={toggleTheme}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme === "light" ? "#2d2d2d" : "#f8f8f8",
            }}
          >
            {theme === "light" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 absolute top-12 left-0 right-0 z-[9999]">
          <nav className="flex flex-col space-y-2 p-4">
            {(Object.keys(menusData) as MenuKey[]).map((menuKey) => (
              <div key={menuKey}>
                <button
                  onClick={() => toggleDropdown(menuKey)}
                  className="text-white text-left w-full px-4 py-2 flex justify-between items-center"
                >
                  <span>{menusData[menuKey].title}</span>
                  <span>▼</span>
                </button>
                {openDropdown === menuKey && renderMobileDropdown(menuKey)}
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
