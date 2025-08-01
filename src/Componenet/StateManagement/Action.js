import axios from "axios";

export const logout = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT" });
  };
};
export const showInput = () => ({
  type: "input",
});
export const showMusicplayer = () => ({
  type: "showMusicplayer",
});
export const fetchurlMuiscFile = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "postUrlMuiscFile", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};


export const postProductlist = (data) => {
  return (dispatch, getState) => { 
    const { cart } = getState().cartLit; 
    const infoAlretTitle = data.title;
    const infoAlretArtistName = data.artistName;

    const productExists = cart.some(item => item.post_id === data.post_id);
    if (productExists) {
      dispatch({ type: "Alret", payload: ` محصولی به اسم ${infoAlretTitle} از هنرمند  ${infoAlretArtistName} قبلا به سبد خرید اضافه شده است.` });
      return;
    }
    dispatch({ type: "postProductlist", payload: data }); 
  };
};
export const removeFromCart = (newCart) => {
  return {
    type: "UPDATE_CART",
    payload: newCart
  };
}
export const getOneMusicInfo = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "OneMusicInfo", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchImage = (filename) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "profile", payload: filename });
      console.log(filename);
    } catch (error) {
      console.log(error);
    }
  };
};
export const getUserId = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "userId2", payload: userId });
      // console.log(userId)
    } catch (error) {
      console.log(error);
    }
  };
};
export const getMusicInfo = (musicFile) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "muiscInfo", payload: musicFile });
      console.log(musicFile);
    } catch (error) {
      console.log(error);
    }
  };
};
