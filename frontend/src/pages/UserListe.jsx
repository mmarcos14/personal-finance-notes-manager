import React, { useEffect, useState } from 'react'
import { fetchAll } from '../services/apiService';
import ModalUpdateUserStatus from './ModalUpdateUserStatus';
import { userAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function UserListe() {
    const [users,setUser]=useState([]);
    const [loading,setLoading]=useState(true);
    const [show,setModal]=useState(false)
    const [individualUser,setIndividualUser]=useState(null)
    //paginaTION 
    const [currentPage,setCurrentePage]=useState(1);
    const [number_of_page,setNumber_per_Page]=useState(10);
    const lastindex=currentPage*number_of_page;
    const firstindex=lastindex-number_of_page;
    const records=users.slice(firstindex,lastindex);
    const npage=Math.ceil(users.length/number_of_page)
    const Numbers=[...Array(npage+1).keys()].slice(1);
    const fetchUser=async()=>{
      try{
        setLoading(true)
        const response=await fetchAll('user/index')
        setUser(response.data.user)
      }catch(e){
        console.log(e.error)
      }finally{
        setLoading(false)
      }
    }
   const  {user}=userAuth();
    useEffect(()=>{
        fetchUser();
    },[])
    if(user.status!="3") return <Navigate replace to="/"/>
  return (
 <div className="container mt-3">
  <h2>List of user </h2>
  <div className="mt-4 p-5 bg-dark text-white rounded">
    <h1>List of user <input type='search' className='form-control border rounded-4' placeholder='search by name or par email'/></h1> 
   <div className="table-responsive">
    <table className='table table-striped table-bordered table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>status</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
            {
                loading ? (
                <div className="text-center my-5">
                <div className="spinner-border text-primary" />
                </div>
                ) :(
                    users.length > 0 ? (
                        records.map((u,i)=>
                            <tbody key={i}>

                            <tr>
                                <td>#{u.id}#</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td className={`${u.status=="-1" ? "bg-danger text-white":""}`}>{u.status =="0" ? 'user level 1' : u.status=="1" ? "user" : u.status=="2" ? "Manager" : u.status=="-1" ? "------------": "Admin"}</td>
                                <td>{u.status !=-1 ? "active" : "disabled"}</td>
                                <td className='text-center'>
                                    <div className='d-flex text-center'>
                                        <button className='btn btn-sm btn-success mx-2' onClick={()=>{setModal(true);setIndividualUser(u)}}>edit</button>
                                        <button className='btn btn-sm btn-danger mx-2'>delete</button>

                                    </div>
                                </td>

                            </tr>
                         </tbody>

                        )
                    ) :(<tr><td>...No Data...</td></tr>)
                )
            }
    </table>
   </div>
   {show && <ModalUpdateUserStatus isOpen={show} HideModal={()=>setModal(false)} currentUser={individualUser} refresh={fetchUser}/>}
  </div>
  
</div>

  )
}
