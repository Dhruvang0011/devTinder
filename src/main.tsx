
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Component/Body.tsx'
import Feed from "./Component/Feed.tsx"
import Login from './Component/Login.tsx'
import { Provider } from 'react-redux' 
import appStore from "../utils/appStore.tsx"

createRoot(document.getElementById('root')!).render(
  <Provider store={appStore}>
  <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element = {<Body />}>
          <Route index element = {<Login/>}></Route>
          <Route path="/feed" element = {<Feed/>}></Route>
          <Route path='/about' element = {<h1>Hellloo</h1>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
 </Provider>
)
