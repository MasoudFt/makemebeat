import{
    legacy_createStore as CreateStore,
    combineReducers,
    applyMiddleware
}from 'redux';
import {ShowProfile,upNaveInput,postUserId,postMusicInfo,OneMusicInfo,showMusicplayer,postUrlMuiscFile,postProductlist} from '../StateManagement/Reducer';
import {thunk} from 'redux-thunk'


const reducers=combineReducers({

    showInput:upNaveInput,
    ShowProfilePic:ShowProfile,
    userId:postUserId,
    musicId:postMusicInfo,
    MusicInfo:OneMusicInfo,
    playMusic:showMusicplayer,
    cartLit:postProductlist,
    urlMusicFile:postUrlMuiscFile
});
const middleware=[thunk];
const initialState={

}
const store=CreateStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
);
export default store;   