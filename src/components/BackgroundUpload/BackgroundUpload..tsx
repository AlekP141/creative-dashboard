import { useEffect, useState } from "react"
import selectCreative from "../../functions/selectCreative"
import "./BackgroundUpload.scss"

const BackgroundUpload = () => {

  const [file, setFile] = useState<File | null>(null)
  const [defaultBackground, setDefaultBackground] = useState("")
  const creative = selectCreative()


// Set the default background image on the creative
  useEffect(() => {
    if (creative) {
      const background = creative.querySelector(".backgroundImage") as HTMLElement
      setDefaultBackground(background.style.backgroundImage)
    }
  },[creative])

// Handle the file upload + default if no file
  useEffect(() => {
    if (creative) {
      const background = creative.querySelector(".backgroundImage") as HTMLElement
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        background.style.backgroundImage = `url(${imageUrl})`
      } else {
        background.style.backgroundImage = defaultBackground
      }
    }
  },[file])

  return (
    <div className="fileUploader">
      <input type="file" onChange={(e) => {setFile(e.target.files[0])}} />
    </div>
  )
}

export default BackgroundUpload
