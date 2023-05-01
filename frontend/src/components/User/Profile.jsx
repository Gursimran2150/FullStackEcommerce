import { useSelector } from "react-redux"
import MetaData from "../layout/MetaData"
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import './profile.css'



const Profile = () => {
  const {user,loading,isAuthenticated} = useSelector((state)=>state.user);


if(loading){
    return (<Loader/>)
}

if(isAuthenticated){


  return (
    <>
        <MetaData title={`${user.user.name}'s Profile`}/>
        <div className="profileContainer">
            <div>
                <h1>My Profile</h1>
                <img src={user.user.avatar.url} alt={user.user.name} />
                <Link to={'/me/update'}>Edit Profile</Link>
            </div>
            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.user.email}</p>
                </div>
                {/* <div>
                    <h4>Joined On</h4>
                    <p>{String(user.user.createdAt).substring(0,10)}</p>
                </div> */}
                <div>
                    <Link to={'/orders'}>My Orders</Link>
                    
                </div>
            </div>
        </div>
    
    </>
  )
}
}

export default Profile