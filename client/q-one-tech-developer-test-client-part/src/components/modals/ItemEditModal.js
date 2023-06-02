import React, { useState } from 'react';
import { useItemContext } from "../../hooks/useItemContext"
import { useAuthContext } from '../../hooks/useAuthContext'

const ItemEditModal = ({setItemsList, closeEditModal, showEditModal, modalEditId, modalEditName}) => {
    
    const [name, setName] = useState('')
    const [is_active, setIsActive] = useState(true)
    const { items, dispatch } = useItemContext()
    const { user } = useAuthContext()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
          return
        }
        const item = {name, is_active}
        const response = await fetch('/api/items/' + modalEditId, {
          method: 'PATCH',
          body: JSON.stringify(item),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        if (response.ok) {
          setName('')
          setIsActive('')
          dispatch({type: 'CREATE_ITEM', payload: json})
          setItemsList([json, ...items])      
        }
        closeEditModal();
      }
        return (
            <div className={(showEditModal ? "modal" : 'hidden')}>
              <div className={(showEditModal ? "modal-edit-wrapper" : 'hidden')}>
                <div className={(showEditModal ? 'modal-edit-header' : 'hidden')}> 
                    <p className={(showEditModal ? 'wizzard-step-active-3' : 'hidden')}>Edit item</p>
                </div>      
                <div className={(showEditModal ? 'modal-edit-content' : 'hidden')}>
                            <div className={(showEditModal ? 'group-input-wrapper-1' : 'hidden')}>
                                <label className={(showEditModal ? 'lbl' : 'hidden')}>Enter Name</label>
                                <input 
                                type="text" 
                                name="username" 
                                placeholder={modalEditName}
                                onChange={(e) => setName(e.target.value)}
                                className={(showEditModal ? "input" : 'hidden')}/>
                            </div>
                            <div className={(showEditModal ? 'group-input-wrapper-2' : 'hidden')}>
                                <label className={(showEditModal ? 'lbl' : '')}>Select State</label>
                                <select
                                name="state" 
                                onChange={(e) => setIsActive(e.target.value)}
                                className={(showEditModal ? "input" : 'hidden')}>
                                    <option value={true} className={(showEditModal ? "input" : 'hidden')}>Active</option>
                                    <option value={false} className={(showEditModal ? "input" : 'hidden')}>Not active</option>
                                </select>
                            </div>
                            <div className={(showEditModal ? "footer" : 'hidden')}>
                            <button onClick={closeEditModal} className={(showEditModal ? "cancel-button" : 'hidden')}>Cancel</button>
                            <button onClick={handleSubmit} className={(showEditModal ? "next-step-button-modal" : 'hidden')}>Save</button>
                            </div>
                </div>
                </div>
            </div>
             
        ) 

  }
  
  export default ItemEditModal;
