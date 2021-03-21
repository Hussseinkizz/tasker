import { useState } from 'react'
import { FaGithubAlt, FaPlusSquare } from 'react-icons/fa'
const Topping = ({ setInputs }) => {
  const [text, setText] = useState('')
  const [check, setCheck] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!text) {
      alert("Please enter a valid task!")
    }
    
    setInputs({text, check})
    setText('')
    setCheck(false)
  }

  return (
    <>
      <div className="Topping">
        <h1 className="TodoTitle">
          <FaGithubAlt className='TitleIcon'/>Tasker
        </h1>
        <form className="Field" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="add your tasks here..."
            className="InputField"
            value={text}
            onChange={(e) => setText(e.target.value)
}
          />
          <span>
            <FaPlusSquare className="InputIcon" onClick={handleSubmit} type="submit"/>
          </span>
        </form>
      </div>
    </>
  )
}

export default Topping
