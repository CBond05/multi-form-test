import React from 'react';
import { useItemContext } from '../hooks/useItemContext'
import { convertDate } from '../utils/shared/convertDate';

const ItemPreviewForm = ({nextStep, prevStep}) => {
    const {items, dispatch} = useItemContext()
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
                <div className='wizzard-step-3 active'>
                    <p className='wizzard-step-active-1'>Step 3</p>
                    <p className='wizzard-step-active-2'>Preview item</p>
                </div>
                <div className='wizzard-step-4'>
                    <p className='wizzard-step-not-active-1'>Step 4</p>
                    <p className='wizzard-step-not-active-2'>Edit item</p>
                </div>
            </div>
            <div className='auth-form'>
                <div className='auth-container'>                
                    <table className="preview-table" >
                        <tbody>
                            <tr>
                                <th>Item Name</th>
                                <td>{items[0].name}</td>
                            </tr>
                            <tr>
                                <th>User Added</th>
                                <td>{items[0].created_by}</td>
                            </tr>
                            <tr>
                                <th>Date Added</th>
                                <td>{convertDate(new Date(items[0].createdAt))}</td>
                            </tr>
                            <tr>
                                <th>State</th>
                                <td>{items[0].is_active ? "Active": "Not Active"}</td>
                            </tr> 
                        </tbody>
                    </table>
                    <div className='footer'>
                        <button className='add-more-button' onClick={prevStep}>Add more items</button>
                        <button onClick={nextStep} className='next-step-button'>Submit</button>
                    </div>
                </div>
            </div>
        </div> 
    ) 
}
  
export default ItemPreviewForm;
