import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Cookies, Login, MainApp, Policy, Register, Terms } from "../pages"

export default function Routing() {
return (
    <Router>
        <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/terms-conditions" Component={Terms} />
            <Route path="/privacy-policy" Component={Policy} />
            <Route path="/cookies" Component={Cookies} />
            <Route path="/*" Component={MainApp} />
        </Routes>
    </Router>
)
}
