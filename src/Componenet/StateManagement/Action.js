import axios from "axios";
import ServerURL from "../API/ServerURL";
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      // const response = await axios.post(`${ServerURL()}users/login`, {
      const response = await axios.post(`http://localhost:3001/users/login`, {
        email,
        password,
      });
      
      // ذخیره وضعیت ادمین در localStorage
      if (email === "Admin@gmail.com") {
        localStorage.setItem("isAdmin", "true");
      } else {
        localStorage.setItem("isAdmin", "false");
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId", response.data.userId);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      dispatch(getUserId(response.data));
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Invalid email or password" });
    }
  };
};



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
let cart = [];

export const postProductlist = (data) => {
  return async (dispatch) => {
    const infoAlretTitle=data.title
    const infoAlretArtistName=data.artistName
    try {
      const productExists = cart.some(item => item.post_id === data.post_id);
      
      if (productExists) {
      
        dispatch({ type: "Alret", payload: ` محصولی به اسم ${infoAlretTitle} از هنرمند  ${infoAlretArtistName} قبلا به سبد خرید اضافه شده است.` });
        return; 
      }

      cart.push(data); 
      dispatch({ type: "postProductlist", payload: data });
     
    } catch (error) {
      console.log(error);
    }
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
