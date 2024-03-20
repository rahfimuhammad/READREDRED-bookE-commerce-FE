import React, { useState} from 'react'
import { usePage } from '../../hooks/usePage';
import { useGetProducts } from '../../hooks/useFetch'
import { usePostData } from '../../hooks/usePost';
import { useDeleteData } from '../../hooks/useDelete';
import "./tableController.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Trash, 
         CaretCircleLeft, 
         CaretCircleRight} from 'phosphor-react'
import { ModalClose, 
         ModalContent, 
         Modal, 
         Title, 
         Form, 
         Input, 
         ButtonAction,
         HandlePageContainer,
         ButtonPage,
         SelectContainer,
         Select} from '../../styles';

const AdminUsers = () => {

    const {postData, loading: postLoading} = usePostData()
    const {deleteData, loading: deleteLoading} = useDeleteData()
    const {page, nextPage, prevPage} = usePage()
    const [sortBy, setSortBy] = useState(""); 
    const {data, refetch} = useGetProducts(`http://localhost:2000/users?page=${page}&sortBy=${sortBy}`)
    const users = data.users
    const totalPages = data.totalPages
    const [modal, setModal] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    const [newAdmin, setNewAdmin] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
    })

      const handleChange = (e) => {
        const { name, value } = e.target;
      
        setNewAdmin((prevData) => ({
          ...prevData,
          [name]: value ,
        }));
      };
    
      const createAdmin = async () => {

        await postData('http://localhost:2000/users/admin', newAdmin);
        refetch()
        closeModal()
      };

      const handleDelete = async (id) => {
        
        await deleteData(`http://localhost:2000/users/${id}`);
        refetch()
      };

      const closeModal = () => {
        const emptyCreateAdmin = Object.fromEntries(
            Object.keys(newAdmin).map(key => [key, ''])
        );
        setNewAdmin(emptyCreateAdmin);
        setModal(!modal);
      }

      const UserMap = () => {
        
        return users?.map((user, index) => {
            return (
                <tr key={user.id}>
                  {deleteUser && <td style={{position: "sticky", left: "0", backgroundColor: "#34353f"}} className='scrollable-cell'>
                    <div style={{display: "flex", gap: "5px"}}>
                      <button className='action-button delete-button' onClick={() => handleDelete(user.id)}><Trash color='white' size={20} /></button>
                    </div>
                  </td>}
                    <td className='scrollable-cell'><span><p>{user.username}</p></span></td>
                    <td className='scrollable-cell'><span><p>{user.email}</p></span></td>
                    <td className='scrollable-cell'><span><p>{user.address}</p></span></td>
                    <td className='scrollable-cell'><span><p>{user.phone}</p></span></td>
                    <td className='scrollable-cell'><span><p>{user.role}</p></span></td>
                    <td className='scrollable-cell'><span><p>{user.carts?.length}{user.carts?.length > 1? " Products" : " Product"}  </p></span></td>
                    <td className='scrollable-cell'><span><p>{user.wishlists?.length}{user.wishlists?.length > 1? " Products" : " Product"} </p></span></td>
                </tr>
            )
        })
    }

  return (
    <div className='admin-control-container' style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <div className='button-container'>
          <div style={{width: "fit-content", overflowX: "auto", display: "flex", gap: "3px", padding: "0 2.5% 0 0"}}>
            <SelectContainer>
              <Select onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Default Sort</option>
                <option value="nameAsc">name A - Z</option>
                <option value="nameDesc">name Z - A</option>
                <option value="emailAsc">email A - Z</option>
                <option value="emailDesc">email Z - A</option>
              </Select>
            </SelectContainer>  
            <button className='nav-button' onClick={() => setModal(!modal)}>Create Admin</button>
            <button className='nav-button' onClick={() => setDeleteUser(!deleteUser)}>Delete User</button>
            <button className='nav-button' onClick={() => console.log(users)}>Search</button>
          </div>
        </div>
      <div className='table-wrapper'>
        <div className='table-container'>
          <table className="custom-table">
              <thead>
                  <tr>
                      {deleteUser && <th style={{position: "sticky", left: "0", backgroundColor: "#1d1e23"}}>Action</th>}
                      <th>Username</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Carts</th>
                      <th>Wishlists</th>
                  </tr>
              </thead>
              <tbody>
                  {UserMap()}
              </tbody>
          </table>
          <HandlePageContainer>
            <ButtonPage disabled={page <= 1} onClick={prevPage}><CaretCircleLeft className='icon-page-button' color='white'/></ButtonPage>
            <span style={{color: "white"}}>{page} of {totalPages}</span>
            <ButtonPage disabled={page >= totalPages} onClick={nextPage}><CaretCircleRight className='icon-page-button' color='white'/></ButtonPage>
          </HandlePageContainer>
        </div>
      </div>
    {modal && 
        <Modal>
            <ModalClose className='modal-close' onClick={() => closeModal()}></ModalClose>
            <ModalContent>
                <Title><p>Create Admin</p><hr/></Title>
                <Form>
                    <Input type="text" placeholder='username' value={newAdmin.username} name='username' onChange={handleChange} />
                    <Input type="email" placeholder='email'  value={newAdmin.email} name='email' onChange={handleChange}/>
                    <Input type="text" placeholder='phone'  value={newAdmin.phone} name='phone' onChange={handleChange}/>
                    <Input type="text" placeholder='address'  value={newAdmin.address} name='address' onChange={handleChange}/>
                    <Input type="password" placeholder='password' value={newAdmin.password} name='password' onChange={handleChange}/>
                    <Input type="password" placeholder='confirm password' value={newAdmin.confirmPassword} name='confirmPassword' onChange={handleChange}/>
                    <ButtonAction className='button' onClick={createAdmin}>Create Admin</ButtonAction>
                </Form>
            </ModalContent>
        </Modal>}
    <ToastContainer/>
    </div>

  )
}

export default AdminUsers