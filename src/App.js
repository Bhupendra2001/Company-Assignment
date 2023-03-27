import {createBrowserRouter , RouterProvider, Outlet} from 'react-router-dom'
import './App.css';
import Stopwatch from './StopWatch';
import Button from './Button'
import Navbar from './Navbar';
import MyForm from './MyForm'
import NewButton from './NewButton'
//import { Children } from 'react';




function Layout(){
  return (
    <>
    <Navbar/>
    <Outlet/>
   
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
   element : <Layout/>,
   children : [

    {
      path : '/Form',
      element : <MyForm/>
    },
    {
      path : '/Button',
      element : <Button/>
    },
    {
      path : '/stopwatch',
      element : <Stopwatch/>
    },
    {
    path : '/newbutton',
    element : <NewButton/>
    }

   ]

}
])
function App() 
{
  return (
    
    <div className='app'>
     <div className='container'>
      <RouterProvider router={router}/>
     </div>
    </div>
  );
}

export default App;
