import {GLOBALTYPES} from './globalTypes'
import {getDataAPI, patchDataAPI} from '../../utils/fetchData'
import { imageUpload} from '../../utils/imageUpload'

export const PROFILE_TYPES = {
    LOADING:'LOADING_PROFILE',
    GET_USER:'GET_PROFILE_USER',
    GET_ID: 'GET_PROFILE_ID',
    GET_POSTS: 'GET_PROFILE_POSTS'
}
export const getProfileUsers= ({id, auth}) =>async (dispatch)=>{
  dispatch ({type: PROFILE_TYPES.GET_ID, payload: id })
    try {
        dispatch({type: PROFILE_TYPES.LOADING, payload: true})
        const res = getDataAPI(`/user/${id}`,auth.token)

        const res1 = getDataAPI(`/user_posts/${id}`,auth.token)

        const users = await res;
        const posts = await res1;

        dispatch({
            type:PROFILE_TYPES.GET_USER,
            payload: users.data
        })

        dispatch({
            type:PROFILE_TYPES.GET_POSTS,
            payload: {...posts.data, _id: id, page: 2}
        })

        dispatch({type: PROFILE_TYPES.LOADING, payload: false})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg}})
    }
    
}

export const updateProfileUser = ({userData, avatar, auth}) => async (dispatch) => {
    if(!userData.fullname)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Please add your full name"}})

    if(!userData.fullname.length)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Fullname Too long!!"}})
    if(!userData.story.length)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Story too long!!"}})

    try {
        let media;
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading:true}})
        if(avatar) media = await imageUpload([avatar])
        const res = await patchDataAPI("user",{
            ...userData,
            avatar: avatar ? media[0].url :auth.user.avatar
        }, auth.token)
        console.log(res)

        dispatch({type: GLOBALTYPES.ALERT, 
            payload: {
                ...auth,
                user: {
                    ...auth.user,
                    ...userData,
                    avatar:avatar? media[0].url:auth.user.avatar,
                }
                
            }})

        dispatch({type: GLOBALTYPES.ALERT, payload: { success: res.data.msg}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}})
        
    }
    

}