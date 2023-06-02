import React, { useState }  from 'react';
import ItemEditModal from './modals/ItemEditModal';
import ItemDeleteModal from './modals/ItemDeleteModal';
import { useLogout } from '../hooks/useLogout'
import { useItemContext } from '../hooks/useItemContext'
import { convertDate } from '../utils/shared/convertDate';

const ItemEditForm = ({ 
    twoStepsBack, 
    openEditModal,
    closeEditModal,
    showEditModal,
    modalEditId,
    modalEditName,
    modalEditIsActive,
    showDeleteModal,
    modalDeleteId,
    openDeleteModal,
    closeDeleteModal}) => {

    const {items, dispatch} = useItemContext()
    const { logout } = useLogout()

    const [itemsList, setItemsList] = useState([...items])

    const handleLogoutClick = () => {
        logout()
      }
        return (
        <div className='main'>
            <ItemEditModal 
            showEditModal={showEditModal} 
            modalEditId={modalEditId}
            modalEditName={modalEditName}
            modalEditIsActive={modalEditIsActive}
            closeEditModal={closeEditModal}
            setItemsList={setItemsList}
            />
            <ItemDeleteModal
            showDeleteModal={showDeleteModal}
            modalDeleteId={modalDeleteId}
            closeDeleteModal={closeDeleteModal}
            />
        <div className='wizzard'>
            <div className='wizzard-step-1'>
                <p className='wizzard-step-active-1'>Step 1</p>
                <p className='wizzard-step-active-2'>Log in User</p>
            </div> 
            <div className='wizzard-step-2 active'>
                <p className='wizzard-step-active-1'>Step 2</p>
                <p className='wizzard-step-active-2'>Add item</p>
            </div> 
            <div className='wizzard-step-3 active'>
                <p className='wizzard-step-active-1'>Step 3</p>
                <p className='wizzard-step-active-2'>Preview item</p>
            </div>
            <div className='wizzard-step-4 active'>
                <p className='wizzard-step-active-1'>Step 4</p>
                <p className='wizzard-step-active-2'>Edit item</p>
            </div>
        </div>
        <div className='auth-form'>
            <div className='auth-container'>
                <div className='scrollable'>
                <table className="edit-table">
                    <thead>
                        <tr>
                            <th className="item-edit-row">Item Name</th>
                            <th className="item-edit-row">User Added</th>
                            <th className="item-edit-row">Date Added</th>
                            <th className="item-edit-row">State</th>
                            <th className="item-edit-row">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsList && itemsList.map((item, i) => (
                        <tr key={item._id}>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.created_by}
                            </td>
                            <td>
                            {convertDate(new Date(item.createdAt))}
                            </td>
                            <td>
                                {item.is_active ? "Active": "Not Active"}
                            </td>
                            <td>
                            <button type="button" onClick={() => openEditModal(item._id, item.name, item.is_active)} className='edit-modal'>
                                Edit
                            </button>
                            <button type="button" onClick={() =>openDeleteModal(item._id)} className='delete-modal'>
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))}
    
                    </tbody>
                </table>
                </div>
                <div className='footer'>
                <button className='add-more-button' onClick={twoStepsBack}>Add more items</button>
                <button onClick={handleLogoutClick} className='next-step-button'>Log out</button>
                </div>
            </div>
        </div>
        </div> 
    ) 
  }
  export default ItemEditForm;
