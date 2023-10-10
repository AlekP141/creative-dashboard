import "./CreativeContainer.css"
import { ReactNode } from "react"


interface ICreativeContainer {
  children:ReactNode
}

const CreativeContainer = ({children}:ICreativeContainer) => {
  return (
    <div className="containerone">{children}</div>
)}
export default CreativeContainer
