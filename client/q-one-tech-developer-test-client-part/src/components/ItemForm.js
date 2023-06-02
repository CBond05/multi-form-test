import { useState } from "react"
import { useItemContext } from "../hooks/useItemContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ItemForm = ({nextStep, setLastItemId}) => {
  const { dispatch } = useItemContext()
  const { user } = useAuthContext()
  const username = user.username
  const [name, setName] = useState('')
  const [is_active, setIsActive] = useState(true)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      return
    }

    const item = {name, is_active, username}

    const response = await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
 
    const json = await response.json()
    setLastItemId(json._id)
    if (response.ok) {
      setName('')
      setIsActive(true)
      dispatch({type: 'CREATE_ITEM', payload: json})
      nextStep();
    }
  }

  return (
    <div className='main'>
      <div className='wizzard'>
          <div className='wizzard-step-1'>
              <p className='wizzard-step-active-1'>Step 1</p>
              <p className='wizzard-step-active-2'>Log in User</p>
          </div> 
          <div className='wizzard-step-2 active'>
              <p className='wizzard-step-active-1'>Step 2</p>
              <p className='wizzard-step-active-2'>Add item</p>
          </div> 
          <div className='wizzard-step-3'>
              <p className='wizzard-step-not-active-1'>Step 3</p>
              <p className='wizzard-step-not-active-2'>Preview item</p>
          </div>
          <div className='wizzard-step-4'>
              <p className='wizzard-step-not-active-1'>Step 4</p>
              <p className='wizzard-step-not-active-2'>Edit item</p>
          </div>
      </div>
    <div className='auth-form'>
      <div className='auth-container'>
          <div className='group-input-wrapper-1'>
              <label className='lbl'>Enter Name</label>
              <input 
              type="text" 
              name="username" 
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name} 
              className="input"/>
          </div>
          <div className='group-input-wrapper-2'>
              <label className='lbl'>Select State</label>
              <select onChange={(e) => setIsActive(e.target.value)} value={is_active} name="state" className="input">
                  <option value={true} className="input">Active</option>
                  <option value={false} className="input">Not active</option>
              </select>
          </div>
          <div className='footer'>
          <button onClick={handleSubmit} className='next-step-button'>Add item</button>
          </div>
        </div>
      </div>
    </div> 
  ) 
}
export default ItemForm;
