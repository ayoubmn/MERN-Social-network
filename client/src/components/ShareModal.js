import React from 'react';
import {
    LinkedinShareButton, LinkedinIcon,
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    RedditShareButton, RedditIcon
} from 'react-share'

const ShareModal = ({url, theme}) => {
    return(
        <div className="d-flex justify-content-between px-4 py-2 bg-secondary"
        style={{filter: theme ? 'invert(1)' : 'invert(0)'}} >
            <FacebookShareButton url={url} >
                <FacebookIcon round size={32} />
            </FacebookShareButton>       
            <TwitterShareButton url={url} >
                <TwitterIcon round size={32} />
            </TwitterShareButton>  
            <RedditShareButton url={url} >
                <RedditIcon round size={32} />
            </RedditShareButton>  
            <WhatsappShareButton url={url} >
                <WhatsappIcon round size={32} />
            </WhatsappShareButton>  
            <LinkedinShareButton url={url} >
                <LinkedinIcon round size={32} />
            </LinkedinShareButton>       
        </div> 
    );}

export default ShareModal;