import React from "react"
import Header from "./components/header"
import { useSelector } from "react-redux"
import { selectUser } from "./features/userSlice"
import Navbar from "./view/admin/navbar"

export default function App() {
  
  const user = useSelector(selectUser)

  return (
    <div className="w-full">
      { user ? <Navbar /> : <Header /> }
    </div>
  )
}