import { Table } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import useFetch from '../../fetchUserData';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './home.css'

import { deleteUser } from "../../redux/userSlice/userSlice";
import Edit from "../../componets/Edit/Edit";
import { IconButton } from '@mui/material';
import Add from '../../componets/Add/Add';

const Home = () => {
    useFetch("https://reqres.in/api/users")

    const dispatch = useDispatch()
    const data = useSelector((state) => state.userReducer)
    // console.log(data);

    const handleDelete = (e, id) => {
        e.preventDefault()
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(deleteUser(id))
                        alert("Deletion successfull")
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    return (
        <div className="section">
            <div className="container">
                <div className="section_header flex">
                    <h1>User Details</h1>
                    <Add />
                </div>
                <div className="section_body">
                    {
                        data?.length > 0 ?
                            <Table striped responsive="lg">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name & Photo</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((user, key) => (
                                            <tr key={key}>
                                                <td>{user.id}</td>
                                                <td>
                                                    <img height={"80px"} width={"80px"} className="rounded-circle me-3" src={user.image} alt={user.firstname} />
                                                    <span className="fw-bold">{user.firstname}  {user.lastname}</span>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <IconButton aria-label="delete rounded_btn" title='DELETE' className='delete_btn' onClick={(event) => handleDelete(event, user.id)}>
                                                        <MdDelete />
                                                    </IconButton>
                                                    <Edit user={user} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                            :
                            <h3 className="text-center">No user details</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home