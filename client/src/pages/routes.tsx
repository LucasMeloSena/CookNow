import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./Home"

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}