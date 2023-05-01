import './updateprofile.css'
import {useState, useEffect} from 'react'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';


const UpdateProfile = () => {
   
  
    const navigate = useNavigate();
    const { user , loading} = useSelector((state) => state.user);
    
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
   
    
  
    const updateProfileSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
     

    //   for (let [key, value] of myForm.entries()) {
    //     console.log(`${key}: ${value}`);
    //   }
       alert("This feature will be available soon!!")
        // dispatch(updateUserProfile({name,email}))
        navigate('/account')
    };
  
    
  
    useEffect(() => {
      if (user) {
        setName(user.user.name);
        setEmail(user.user.email);
        // setAvatarPreview(user.user.avatar.url);
      }
   }, [user]);
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <MetaData title="Update Profile" />
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
  
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="updateProfileName">
                    <AccountCircleIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
  
                
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
                  />
                </form>
              </div>
            </div>
          </>
        )}
      </>
    );
}

export default UpdateProfile