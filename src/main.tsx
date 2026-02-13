
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Component/Body.tsx'
import Feed from "./Component/Feed.tsx"
import Login from './Component/Login.tsx'
import Connections from "./Component/Connections.tsx"
import { Provider } from 'react-redux' 
import appStore from "../utils/appStore.tsx"
import UserProfileUpdate from './Component/UserProfileUpdate.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={appStore}>
  <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element = {<Body />}>
          <Route index element = {<Login/>}></Route>
          <Route path="/feed" element = {<Feed/>}></Route>
          <Route path="/profile" element = {<UserProfileUpdate/>}></Route>
          <Route path="/connections" element = {<Connections/>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
 </Provider>
)
