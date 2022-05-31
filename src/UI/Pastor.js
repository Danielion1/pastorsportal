import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';

const Pastor = () =>{
    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] =  useState(false)
    //view Model
    const handleViewShow = () => {SetViewShow(true)}
    const handleViewClose = () => {SetViewShow(false)}
     //FOr Edit Model
     const [ViewEdit, SetEditShow] = useState(false)
     const handleEditShow = () => { SetEditShow(true) }
     const handleEditClose = () => { SetEditShow(false) }
     //FOr Delete Model
     const [ViewDelete, SetDeleteShow] = useState(false)
     const handleDeleteShow = () => { SetDeleteShow(true) }
     const handleDeleteClose = () => { SetDeleteShow(false) }
     //FOr Add New Data Model
     const [ViewPost, SetPostShow] = useState(false)
     const handlePostShow = () => { SetPostShow(true) }
     const handlePostClose = () => { SetPostShow(false) }
 
     //Define here local state that store the form Data
     const [name, setname] = useState("")
     const [email, setemail] = useState("")
     const [branch, setbranch] = useState("")
     const [gatheringattendance, setgatheringattendance] = useState("")
     const [impartationattendace, setimpartationattendace] = useState("")
     const [state, setstate] = useState("")
 
     const [Delete,setDelete] = useState(false)
     //Id for update record and Delete
     const [id,setId] = useState("");
    const GetPastorData = () => {
        //here we will get all pastor    data
        const url = 'http://localhost:8000/pastor'
        axios.get(url)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    setData(data)
                    console.log(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmit = () => {
        const url = 'http://localhost:8000/pastor'
        const Credentials = { name, email, branch, gatheringattendance, impartationattendace, state }
        axios.post(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleEdit = () =>{
        const url = `http://localhost:8000/pastor/${id}`
        const Credentials = {name, email, branch, gatheringattendance, impartationattendace, state  }
        axios.put(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
  //handle Delete Function 
  const handleDelete = () =>{
    const url = `http://localhost:8000/pastor/${id}`
    axios.delete(url)
        .then(response => {
            const result = response.data;
            const { status, message } = result;
            if (status !== 'SUCCESS') {
                alert(message, status)
            }
            else {
                alert(message)
                window.location.reload()
            }
        })
        .catch(err => {
            console.log(err)
        })
}
    useEffect(() => {
        GetPastorData();
    }, [])
    return (
        <div>
            <div className="row">
                <div className="mt-5 mb-4">
                <Button variant='primary' onClick={() => {handlePostShow()}}><i className='fa fa-plu'></i>
                        Submit Data
                </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Branch</th>
                                <th>Gathering Attendance</th>
                                <th>Impartation Attendance</th>
                                <th>State</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.branch}</td>
                                    <td>{item.gatheringattendance}</td>
                                    <td>{item.impartationattendace}</td>
                                    <td>{item.state}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => {handleViewShow(SetRowData(item))}}>View</Button>|
                                        <Button size='sm' variant='warning'onClick={()=> {handleEditShow(SetRowData(item),setId(item._id))}}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(item),setId(item._id), setDelete(true))}} >Delete</Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='model-box-view'>
                <Modal 
                show ={ViewShow} 
                onHide ={handleViewClose} 
                backdrop ="static" 
                keyboard = {false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>View Gathering Service Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='form-group'>
                            <input type="text" className='form-control' value ={RowData.name} readOnly/>
                        </div>
                        <div className='form-group mt-3'>
                            <input type="email" className='form-control' value ={RowData.email} readOnly/>
                        </div>
                        <div className='form-group mt-3'>
                            <input type="text" className='form-control' value ={RowData.branch} readOnly/>
                        </div>
                        <div className='form-group mt-3'>
                            <input type="text" className='form-control' value ={RowData.gatheringattendance} readOnly/>
                        </div>
                        <div className='form-group mt-3'>
                            <input type="text" className='form-control' value ={RowData.impartationattendace} readOnly/>
                        </div>
                        <div className='form-group mt-3'>
                            <input type="text" className='form-control' value ={RowData.state} readOnly/>
                        </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Pastor</Button>
                                )
                            }
                    </div>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for submit data to database */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={handlePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="Please enter Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Please enter email" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setbranch(e.target.value)} placeholder="Please enter branch" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setgatheringattendance(e.target.value)} placeholder="Please gethering attendance" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setimpartationattendace(e.target.value)} placeholder="Please impartation attendance" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setstate(e.target.value)} placeholder="Please enter state" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmit}>Add Pastor</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handlePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
{/* Modal for Edit employee record */}
<div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Pastor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="Please enter Name" defaultValue={RowData.name}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email</label>
                                <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Please enter email" defaultValue={RowData.email} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Branch</label>
                                <input type="text" className='form-control' onChange={(e) => setbranch(e.target.value)} placeholder="Please enter branch" defaultValue={RowData.branch}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Gathering</label>
                                <input type="number" className='form-control' onChange={(e) => setgatheringattendance(e.target.value)} placeholder="Please enter gathering attendance" defaultValue={RowData.gatheringattendance}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Impartation</label>
                                <input type="number" className='form-control' onChange={(e) => setimpartationattendace(e.target.value)} placeholder="Please enter Impartation attendance" defaultValue={RowData.impartationattendace}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>State</label>
                                <input type="text" className='form-control' onChange={(e) => setstate(e.target.value)} placeholder="Please enter state" defaultValue={RowData.state}/>
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Pastor</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    );
};

export default Pastor;
