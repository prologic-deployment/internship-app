import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
    role: "STAGIAIRE"

  },
  {
    path: '/dashboard/main',
    title: 'Dashboard',
    iconType: 'feather',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    role: "STAGIAIRE"
  },
  {
    path: '',
    title: '-- Internship',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
    role: "STAGIAIRE"
  },
  {
    path: '/dashboard/offer',
    title: 'Available offers',
    iconType: 'feather',
    icon: 'book-open',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    role: "STAGIAIRE"
  },
  {
    path: '/dashboard/assignedTasks',
    title: 'My tasks',
    iconType: 'feather',
    icon: 'file-text',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    role: "STAGIAIRE"
  },
  // {
  //   path: '/dashboard/lab-request',
  //   title: 'VM request',
  //   iconType: 'feather',
  //   icon: 'cloud',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [],
  //   role: "STAGIAIRE"
  // },
  {
    path: '/dashboard/myRequest',
    title: 'Booking list',
    iconType: 'feather',
    icon: 'download-cloud',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    role: "STAGIAIRE"
  },
];
