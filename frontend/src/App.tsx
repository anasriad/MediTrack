import { HashRouter, Routes, Route } from "react-router-dom"
import Landing from "./Pages/Landing"
import Main from "./Pages/Main"
import Form from "./Pages/Form"
import History from "./Pages/History"
import Manager from "./Pages/Management"
import {ManagerProvider} from './utils/Context'
import SignName from "./Pages/NameSign"
import CreateAccount from "./Pages/Account"
function App() {

  return <>
    <ManagerProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/forgottenPass" element={<SignName/>}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/management" element={<Manager />}></Route>
          <Route path="/Account" element={<CreateAccount/>}></Route>
        </Routes>
      </HashRouter>
    </ManagerProvider>
  </>
}

export default App
