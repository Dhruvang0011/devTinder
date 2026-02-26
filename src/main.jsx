import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Body from './Component/Body'
import Feed from './Component/Feed'
import Login from './Component/Login'
import Request from './Component/Request'
import { Provider } from 'react-redux'
import appStore from '../utils/appStore'
import UserProfileUpdate from './Component/UserProfileUpdate'
import Conversation from './Component/Conversion'
import Signup from './Component/Signup'
import Search from './Component/Search'

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
  <Toaster position="top-center" reverseOrder={false} />
  <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element = {<Body />}>
          <Route index element = {<Login/>}></Route>
          <Route path="/feed" element = {<Feed/>}></Route>
          <Route path="/profile" element = {<UserProfileUpdate/>}></Route>
          <Route path="/connections" element = {<Conversation/>}></Route>
          <Route path="/requests" element = {<Request/>}></Route>
          <Route path="/signuppage" element = {<Signup/>}></Route>
          <Route path="/search" element = {<Search/>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
 </Provider>
)
