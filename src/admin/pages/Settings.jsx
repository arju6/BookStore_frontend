import React from 'react'
import Adminheader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'

function Settings() {
  return (
    <>
    <Adminheader/>

        <div className="md:grid md:grid-cols-[minmax(14rem,1fr)_3fr]">
          <div className="col-span-1">
            <Sidebar />
          </div>

          <div className='min-w-0 md:col-span-1 p-5 '>
            
              <h1 className='text-center justify-center font-bold text-2xl'>Settings</h1>
            
            <div className='md:grid grid-cols-2 p-5'>
              <div className='p-5 mr-7'>
                <p className='text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat placeat commodi veritatis debitis pariatur distinctio eaque deserunt corporis sed cum? Tempore, modi nostrum non soluta quaerat minus debitis dolore repellendus! Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>

                <p className='mt-9 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat placeat commodi veritatis debitis pariatur distinctio eaque deserunt corporis sed cum? Tempore, modi nostrum non soluta quaerat minus debitis dolore repellendus! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat recusandae veniam quasi cumque temporibus harum ipsa? Assumenda ab quasi pariatur optio illum, provident deserunt! Eligendi voluptate delectus quos dolor dolorem?</p>
                </div>




              <div className='bg-blue-300 p-5 rounded'>

                <div className='flex items-center justify-center'><img src="https://i.pinimg.com/736x/32/9b/54/329b54d07444f009b0634f438db9a449.jpg" alt="" height={'100px'} width={'100px'} style={{borderRadius:'50%'}} /></div>
                <input className='bg-white w-full rounded my-2 p-2' type="text" placeholder='Enter name'/>
                 <input className='bg-white w-full rounded my-2 p-2' type="text" placeholder='Password'/>
                <input className='bg-white w-full rounded my-2 p-2' type="text" placeholder='Confirm Password'/>
                <div className='flex items-center justify-center mx-5 my-5'>
                  <button className='w-1/2 bg-yellow-400 p-3 rounded mx-5'>Reset</button>
                  <button className='w-1/2 bg-green-400 p-3 rounded mx-5'>Submit</button>
                </div>

  
              </div>
  
  
  
            </div>
  
            
          </div>
        </div>

    </>
  )
}

export default Settings