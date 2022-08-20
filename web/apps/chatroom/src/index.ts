import axios from "axios";
import {setCookie} from "./utils";
import {UserConfig} from "./config_gen";

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Access-Control-Request-Method'] = '*';
// axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
// axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';

const websocket_dir = UserConfig.websocketDir;

start()

const userPwdInput = document.getElementById("pwd_input");
const userPwdButton = document.getElementById("start");
userPwdButton!.style.visibility = 'hidden';
userPwdInput!.style.visibility = 'hidden';
let userStatus: any = new Map();


function start() {
    $.when($.ready).then(() => {
        $("#user-form").on("submit", (e) => {
            e.preventDefault();
            const currentUser = $("#user_input").val();
            if (currentUser) {
                const data = {"username": currentUser};
                try {
                    axios.post(`https://${websocket_dir}/api/verifyUserName`, data,
                        ).then(res => {
                        const data = res.data;
                        userStatus.set('username', data.username)
                        userStatus.set('is_new', data.is_new);
                        userPwdInput!.setAttribute('placeholder', data.msg);
                        userPwdButton!.style.visibility = 'visible';
                        userPwdInput!.style.visibility = 'visible';

                    });
                    // $(".chat-body").removeClass("hide");
                    // $(".chat-register").addClass("hide");
                    // window.location.href = "/chat";
                } catch (error) {
                    console.error(error);
                }
            }
        });
        $("#pwd-form").on("submit", (e) => {
            e.preventDefault();
            const currentUser = $("#user_input").val();
            const currentPwd = $("#pwd_input").val();
            if (currentUser == userStatus.get('username')) {
                if (currentPwd) {
                    const data = {"username": currentUser, "password": currentPwd, 'is_new': userStatus.get('is_new')};
                    try {
                        axios.post(`https://${websocket_dir}/api/register`, data).then(res => {
                            // console.log(res.data);
                            const resp_data = res.data;
                            if (resp_data.code == 0) {
                                setCookie("username", userStatus.get('username'));
                                window.location.href = "/chat";
                                // axios.post(`http://${websocket_dir}/api/register_cookie`,data).then(res=>{
                                // })
                            } else {
                                // $("#pwd_input").empty();
                                // userPwdInput!.setAttribute("content", '');
                                // userPwdInput!.setAttribute('placeholder', data.msg)
                                alert(resp_data.msg)
                            }

                        });
                    } catch (error) {
                        console.error(error);
                    }
                }
            } else {
                alert("请确认用户名");
            }
        })
    });
}