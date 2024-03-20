import React, { useState} from 'react'
import { useGetProducts } from '../../hooks/useFetch'
import { usePage } from '../../hooks/usePage';
import { usePostData } from '../../hooks/usePost';
import { usePatchData } from '../../hooks/usePatch';
import { useDeleteData } from '../../hooks/useDelete';
import "./tableController.css"
import 'react-toastify/dist/ReactToastify.css';
import { NotePencil, 
         Trash, 
         CaretCircleRight, 
         CaretCircleLeft } from 'phosphor-react'
import { ToastContainer } from 'react-toastify';
import { Modal,
         ModalClose, 
         ModalContent, 
         Title, 
         Form, 
         Input, 
         ButtonAction,
         HandlePageContainer,
         ButtonPage,
         SelectContainer,
         Select} from '../../styles';

const AdminProducts = () => {

    const {page, nextPage, prevPage} = usePage()
    const {postData, loading: postLoading} = usePostData()
    const {patchData, loading: patchLoading} = usePatchData()
    const {deleteData, loading: deleteLoading} = useDeleteData()
    const [sortBy, setSortBy] = useState(""); 
    const {data, refetch } = useGetProducts(`http://localhost:2000/products?page=${page}&sortBy=${sortBy}&size=15`)
    const [modal, setModal] = useState(null)
    const [edit, setEdit] = useState(null)
    const products = data.products
    const totalPages = data.totalPages
    const [productData, setProductData] = useState({
        id: '',
        name: '',
        author: '',
        category: '',
        price: '',
        description: '',
        quantity: '',
        image: '',
    })

    const handleChange = (e) => {
      const { name, value } = e.target;
    
      setProductData((prevData) => ({
        ...prevData,
        [name]: name === 'quantity' || name === 'price' ? (value === '' ? '' : parseInt(value, 10)) : value,
      }));
    };
    
    const addProduct = async () => {

        await postData('http://localhost:2000/products', productData);
        refetch()
    };
    
    const editProduct = async (id) => {

        await patchData(`http://localhost:2000/products/${id}`, productData);
        refetch()
    };

    const deleteProduct = async (id) => {

        await deleteData(`http://localhost:2000/products/${id}`);
        refetch()
    };

    const setProduct = (product) => {
        setProductData({
            id: product.id,
            name: product.name,
            author: product.author,
            category: product.category,
            price: parseInt(product.price),
            description: product.description,
            quantity: parseInt(product.quantity),
            image: product.image,
        })
        setModal(!modal)
    }

    const closeModal = () => {
      const emptyProductData = Object.fromEntries(
          Object.keys(productData).map(key => [key, ''])
      );
      setProductData(emptyProductData);
      setModal(!modal);
    }
  
    const submitProduct = () => {
    
        productData?.id? editProduct(productData.id) 
        : addProduct();
        
        closeModal()
      }

    const ProductsMap = () => {

      if(products === undefined) {
        return (
          <tr>
            <td style={{width: "100%", textAlign: "center"}} colSpan={8}>No Data</td>
          </tr>
        )
      } else {

        return products?.map((product, index) => {
          return (
              <tr key={product.id}>
                  {edit && <td style={{position: "sticky", left: "0", backgroundColor: "#34353f"}} className='scrollable-cell'>
                    <div style={{display: "flex", gap: "5px"}}>
                      <button className='action-button edit-button' onClick={() => setProduct(product)}><NotePencil color='white' size={20} /></button>
                      <button className='action-button delete-button' onClick={() => deleteProduct(product.id)}><Trash color='white' size={20} /></button>
                    </div>
                  </td>}
                  <td className='scrollable-cell'><span><p>{product.name}</p></span></td>
                  <td className='scrollable-cell'><span><p>{product.author}</p></span></td>
                  <td className='scrollable-cell'><span><p>{product.category}</p></span></td>
                  <td className='scrollable-cell'><span><p>{product.price}</p></span></td>
                  <td className='scrollable-cell'><span><p>{product.quantity}</p></span></td>
                  <td className='scrollable-cell'><span><p>{product.description}</p></span></td>
                  <td className='scrollable-cell'><span><p>{product.image}</p></span></td>
              </tr>
          )
      })
      }
    }

  return (
    <div className='admin-control-container' style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <div className='button-container'>
          <div style={{width: "fit-content", overflowX: "auto", display: "flex", gap: "3px", padding: "0 2.5% 0 0"}}>
            <SelectContainer>
              <Select onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Default Sort</option>
                <option value="nameAsc">A - Z</option>
                <option value="nameDesc">Z - A</option>
                <option value="priceDesc">Highest Price</option>
                <option value="priceAsc">Lowest Price</option>
              </Select>
            </SelectContainer>
            <button className='nav-button' onClick={() => setModal(!modal)}>Add Product</button>
            <button className='nav-button' onClick={() => setEdit(!edit)}>Edit Product</button>
            <button className='nav-button' onClick={() => setEdit(!edit)}>Search</button>
          </div>
        </div>
      <div className='table-wrapper'>
        <div className='table-container'>
          <table className="custom-table">
              <thead>
                  <tr>
                      {edit && <th style={{position: "sticky", left: "0", backgroundColor: "#1d1e23"}}>Action</th>}
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Description</th>
                      <th>Image</th>
                  </tr>
              </thead>
              <tbody>
                  {ProductsMap()}
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
            <ModalClose onClick={() => closeModal()}></ModalClose>
            <ModalContent>
                <Title>{productData?.id? <span><p>Edit Product</p><hr/></span> : <span><p>Add Product <hr/></p></span>}</Title>
                <Form>
                    <Input type="text" placeholder='title' value={productData.name} name='name' onChange={handleChange} />
                    <Input type="text" placeholder='author'  value={productData.author} name='author' onChange={handleChange}/>
                    <Input type="text" placeholder='category' value={productData.category} name='category' onChange={handleChange}/>
                    <Input type="text" placeholder='price' value={productData.price} name='price' onChange={handleChange}/>
                    <Input type="text" placeholder='description' value={productData.description} name='description' onChange={handleChange}/>
                    <Input type="text" placeholder='quantity' value={productData.quantity} name='quantity' onChange={handleChange}/>
                    <Input type="text" placeholder='image' value={productData.image} name='image' onChange={handleChange}/>
                    <ButtonAction className='button' onClick={submitProduct}>Save Changes</ButtonAction>
                </Form>
            </ModalContent>
        </Modal>}
    <ToastContainer/>
    </div>
  )
}

export default AdminProducts