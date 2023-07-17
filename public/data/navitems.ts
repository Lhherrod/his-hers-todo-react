export const navItems = [
  {
    label: "Home",
    icon: "pi pi-fw pi-desktop",
    url: '/',
  },
  {
    label: "Login",
    icon: "pi pi-fw pi-mobile", 
    items: [
      {
        label: "Login",
        icon: "pi pi-fw pi-plus",
        items: [
          {
            label: "Login",
            icon: "pi pi-fw pi-bookmark",
            url: '/auth',
          },
          {
            label: "Register",
            icon: "pi pi-fw pi-video",
          },
        ],
      },
    ],
  },
  {
    label: "Todos",
    icon: "pi pi-fw pi-list",
    items: [
      {
        label: "Todos",
        icon: "pi pi-fw pi-plus",
        items: [
          {
            label: "View Todos",
            icon: "pi pi-fw pi-bookmark",
            url: '/todos',
          },
          {
            label: "Create Todo",
            icon: "pi pi-fw pi-video",
          },
        ],
      },
    ],
  },
  {
    label: "Profile",
    icon: "pi pi-fw pi-android",
    url: '/profile',
  },

];