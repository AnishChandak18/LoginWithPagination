import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from './Table';

export default function Dashboard() {
   const [data, setData] = useState([]);
   const history = useHistory();
   const [token, setToken] = useState('');
   const columns = [
      { accessor: 'id', label: 'Sr No' },
      { accessor: 'firstName', label: 'First Name' },
      { accessor: 'lastName', label: 'Last Name' },
      { accessor: 'email', label: 'Email' },
      { accessor: 'phone', label: 'Phone no' },
      { accessor: 'age', label: 'Age' },
      { accessor: 'birthDate', label: 'DOB' },
   ];
   useEffect(() => {
      let tokenLocal = localStorage.getItem('token');
      if (!tokenLocal) {
         history.push('/');
      } else {
         setToken(tokenLocal);
         axios.get('http://localhost:2000/dashboard', {
            headers: {
               'token': tokenLocal
            }
         })
            .then(res => {
               console.log(res.data.data.users, "res");
               setData(res.data.data.users);
            }).catch(err => {
               if (err) {
                  console.log(err)
               }
            })
      }
   }, [token])
   return (
      <>
         <h1>Dashboard</h1>
         <h2>Sorting, Filtering, Pagination</h2>

         <Table rows={data} columns={columns} />
      </>
   )
}