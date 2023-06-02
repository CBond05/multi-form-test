import React, { useEffect, useState } from 'react';
import AuthForm from './AuthForm'
import ItemForm from './ItemForm'
import ItemPreviewForm from './ItemPreviewForm'
import ItemEditForm from './ItemEditForm'
import { useItemContext } from "../hooks/useItemContext"
import { useAuthContext } from "../hooks/useAuthContext"

const MainForm = () => {
  const {items, dispatch} = useItemContext()
  const {user} = useAuthContext()
  const [step, setStep] = useState(1) 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [lastItemId, setLastItemId] = useState('')
  const [inputState, setInput] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [modalEditId, setModalEditId] = useState('')
  const [modalEditName, setEditName] = useState('')
  const [modalEditIsActive, setEditIsActive] = useState(true)
  const [modalDeleteId, setModalDeleteId] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch('/api/items', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
     
      const json = await response.json()
      
      if (response.ok) {
        dispatch({type: 'SET_ITEM', payload: json})
      }
    }

    if (user) {
      fetchItem()
    }
  }, [dispatch, user])

    const nextStep = () => {
        setStep(step + 1)
    };
  
    const prevStep = () => {
      setStep(step - 1)
    };

    const twoStepsBack = () => {
      setStep(step-2)
    }
  
    const handleChange = input => e => {
      setInput({ [input]: e.target.value })
    };

    const openEditModal = (_id, name, is_active) => {
      setModalEditId(_id)
      setEditName(name)
      setEditIsActive(is_active)
      setShowEditModal(!showEditModal)
    }

    const closeEditModal = () => {
      setShowEditModal(!showEditModal)
    }
    const openDeleteModal = (_id) => {
      setModalDeleteId(_id)
      setShowDeleteModal(!showDeleteModal)
    }
    const closeDeleteModal = () => {
      setShowDeleteModal(!showDeleteModal)
    }
    switch (step) {
        case 1:
        return (
          <AuthForm
            nextStep={nextStep}    
            handleChange={handleChange}
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
            step={step}
          >
          </AuthForm>
        );
      case 2:
        return(
          <ItemForm
            nextStep={nextStep}    
            handleChange={handleChange}
            setLastItemId={setLastItemId}
            step={step} 
          />
        )  
        case 3:
        return(
          <ItemPreviewForm
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
        case 4:
        return(
          <ItemEditForm
          twoStepsBack={twoStepsBack}    
          handleChange={handleChange}
          lastItemId={lastItemId}        
          showEditModal={showEditModal}
          showDeleteModal={showDeleteModal}
          openEditModal={openEditModal}
          modalEditId={modalEditId}
          modalEditName={modalEditName}
          modalEditIsActive={modalEditIsActive}
          closeEditModal={closeEditModal}
          modalDeleteId={modalDeleteId}
          openDeleteModal={openDeleteModal}
          closeDeleteModal={closeDeleteModal}
          />
        ) 
    }

  }
export default MainForm;
