import React from "react"
import { render } from "react-dom"
import "./styles/style.scss"
import "normalize.css/normalize.css"
import "bootstrap/dist/css/bootstrap.css"
import AppRouter from "./routers/AppRouter"
import { ToastContainer } from "./elements/Toast"
import { Provider } from "react-redux"
import ConfigureStore from "./store/data-store"

const App = () => {
    return (
        <Provider store={ConfigureStore}>
            <AppRouter />
            <ToastContainer />
        </Provider>
    )
}

render(<App/>, document.getElementById("app"))
