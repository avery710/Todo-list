import React, { useState } from "react"
import TodoPage from "./TodoPage"
import WelcomePage from "./WelcomePage"

export default function App() {
    const [Index, setIndex] = useState("welcome")

    if (Index === "welcome"){
        return (
                <WelcomePage setIndex={setIndex} />
        )
    }
    else if (Index === "todolist"){
        return (
            <TodoPage setIndex={setIndex} />
        )
    }
}