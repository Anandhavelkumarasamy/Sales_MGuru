import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/screens/loginScreen/Login';
import { createBrowserRouter, json, RouterProvider } from 'react-router-dom';
import {AuthPrivate,HomePrivate} from './component/router/Privaterouter';
// import Dashboard from './component/screens/HomeScreen/Dashboard';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { handleStorage } from './component/redux/reducers/Logintoken';
import Admin from './component/screens/userManagement/Admin';
import Employee from './component/screens/userManagement/Employee';
import Dealer from './component/screens/userManagement/Dealer';
import ListDashboard from './component/screens/HomeScreen/ListDashboard';
import Dashboard from './component/screens/HomeScreen/Dashboard';
import Leads from './component/screens/leads/Leads';
import ForgotPassword from './component/screens/loginScreen/ForgotPassword';
import VerifyOtp from './component/screens/loginScreen/VerifyOtp';
import ChangePassword from './component/screens/loginScreen/ChangePassword';
import CreateModelLead from './Components/leadModal.js/CreateModalLead';



function App() {

  const router=createBrowserRouter([{
  path:"/",
  element:<AuthPrivate/>,
  children:[{
    path:'login',
    element:<Login/>,
  },{ 
    path:'forgotpassword',
  element:<ForgotPassword/>,
},
{ 
  path:'verifyotp',
element:<VerifyOtp/>
},{
  path:'changepassword',
  element:<ChangePassword/>
}
 

]
  },
  { path:"/",
    element:<HomePrivate/>,
    children:[{
      path:'dashboard',
      element:<Dashboard/>,
      children:[{
        path:'listdashboard',
        element:<ListDashboard/>
      },
      {
        path:'admin',
        element:<Admin/>
      },
      {
        path:'employee',
        element:<Employee/>
      },{
        path:'dealer',
        element:<Dealer/>
      },
      {
        path:'leads',
        element:<Leads/>
      },
      {
        path:'leadsdata',
        element:<CreateModelLead/>
      }
    ]
    }
  ]
    }  
])
 const token = localStorage.getItem('username');
  const dispatch=useDispatch();

useEffect(()=>{
  if(token){
    dispatch(handleStorage(JSON.parse(token || '')))
  }
  
},[token])


  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
