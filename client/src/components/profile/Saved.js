import React, {useState, useEffect} from 'react';
import PostThumb from '../PostThumb'
import Loading from '../alert/Loading'
import LoadMoreBtn from '../LoadMoreBtn'
import {getDataAPI} from '../../utils/fetchData'
import { GLOBALTYPES} from '../../redux/actions/globalTypes'


const Saved = ({auth, dispatch}) => {
    const [savedPosts, setSavedPosts]= useState([])
    const [result, setResult] = useState(9)
    const [page, setPage]= useState(2)
    const [load, setLoad]= useState(false)

    useEffect(() => {
        setLoad(true)
        getDataAPI('getSavedPosts', auth.token)
        .then(res => {
            setSavedPosts(res.data.savedPosts)
            setResult(res.data.result)
            setLoad(false)
        })
        .catch(err =>{
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        })
    }, [])

    const handleLoadMore  = async () => {
        setLoad(true)
        const res = await getDataAPI(`getSavedPosts?limit=${page * 9}`, auth.token)
        setSavedPosts(res.data.savedPosts)
        setResult(res.data.result)
        setPage(page + 1)
        setLoad(false)
    }

    return (
        <div>
        <PostThumb posts={savedPosts} result={result} />

        {
            load && <Loading />
        }

        
        <LoadMoreBtn result={result} page={page}
        load={load} handleLoadMore={handleLoadMore} />
        
    </div>
    );
}

export default Saved;