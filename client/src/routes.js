import { CHAT_ROUTE,LOGIN_ROUTE,MAIN_ROUTE,PROFILE_ROUTE,REGISTRATION_ROUTE } from "./utils/consts"
import Main from "./pages/Main"
import Chat from "./pages/Chat"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"


export const authRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main
  },
  {
    path: CHAT_ROUTE,
    Component: Chat
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile
  }
]

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
]