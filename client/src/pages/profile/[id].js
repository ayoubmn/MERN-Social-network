import React, {useEffect, useState} from "react";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import { useSelector, useDispatch } from "react-redux";
import LoadIcon from "../../images/loading.gif";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch= useDispatch()

  const { id } = useParams()
  const {}= useState(false)

   useEffect(() => {
     if(profile.ids.every(item => item !== id )){
      dispatch(getProfileUsers({ id, auth }));
     }
     
   }, [id, auth, dispatch, profile.ids])


  return (
    <div className="profile">


     <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      

      {profile.loading ? 
        <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading" />
       : 
       <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
      }

      
    </div>
  );
};

export default Profile;
