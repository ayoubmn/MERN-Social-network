import React , {useState, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {checkImage} from '../../utils/imageUpload'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import {updateProfileUser} from '../../redux/actions/profileAction'

const EditProfile = ({ setOnEdit}) =>{
    const initState={
        fullname:'', mobile: '', adress: '', website: '', story: '', gender: ''
    }
    const [userData, setUserData]=useState(initState)
    const {fullname, mobile, adress, website, story, gender} = userData
    const [avatar, setAvatar]=useState('')
    const {auth, theme} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(()=>{
        setUserData(auth.user)
    },[auth.user])
    const ChangeAvatar=(e)=>{
        const file = e.target.files[0]
        const err = checkImage(file)
        if(err) return dispatch ({type: GLOBALTYPES.ALERT, payload: {error: err}})
        setAvatar(file)
    }
    const handleInput = e =>{
        const{name,value}=e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateProfileUser({userData, avatar, auth}))
        setOnEdit(false)
        //window.location.reload();
    }

    return (
        <div className="edit_profile">
            <span className="btn btn-danger btn_close"
            onClick={()=> setOnEdit(false)}>
                Close
            </span>
            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img src={avatar? URL.createObjectURL(avatar):auth.user.avatar} 
                    alt="avatar" style={{filter: theme ? 'invert(1)':'invert(0)'}}/>
                    <span>
                        <i className="fas fa-camera"/>
                        <p>Change</p>
                        <input type="file" name ="file" id="file_up" accept="image/*" onChange={ChangeAvatar}/>
                    </span>
                </div>
                <div className="form_group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative" >
                        <input type="text" className="form-control" id="fullname"
                        name="fullname" value={fullname} onChange={handleInput} />
                        <small className="text-danger position-absolute"
                        style={{top: '50%', right: '5px', transform: 'translateY(-50%)' }} >
                            {fullname.length}/25
                        </small>
                    </div>
                </div>

                <div className="form_group">
                    <label htmlFor="mobile">Number</label>
                    <input type="number" name="mobile" value={mobile}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form_group">
                    <label htmlFor="adress">Address</label>
                    <input type="text" name="adress" value={adress}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form_group">
                    <label htmlFor="website">Website</label>
                    <input type="text" name="website" value={website}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form_group">
                    <label htmlFor="story">About you</label>
                    <textarea name="story" value={story} rows="4"
                    className="form-control" onChange={handleInput} />
                     <small className="text-danger d-block text-right" >
                            {story.length}/250
                        </small>
                </div>

                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                    className="custom-select text-capitalize" onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <span className="btn btn-info w-100" type="submit">Save</span>
            </form>
        </div>
    );
}

export default EditProfile;