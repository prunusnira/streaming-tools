import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { saveAccessToken, saveUser } from "../../redux/streamerSlice";

interface Props {
    hash: string;
}

const ValidContainer = ({ hash }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        reqValidation(getAcctok(hash));
    });

    const reqValidation = async (acctok: string) => {
        axios
            .get(process.env.REACT_APP_URL_VALIDATE!, {
                headers: {
                    Authorization: `Bearer ${acctok}`,
                },
            })
            .then((res: any) => {
                dispatch({ type: saveAccessToken, payload: acctok });
                dispatch({
                    type: saveUser,
                    payload: {
                        loginName: res.data.login as string,
                        clientId: res.data.client_id as string,
                        scope: res.data.scopes as Array<string>,
                        userId: res.data.user_id as string,
                    },
                });
                setTimeout(() => {
                    window.location.href = process.env.REACT_APP_REDIR_URI!;
                }, 2000);
            })
            .catch((err) => {
                // validation failed
                alert("User validation failed");
            });
    };

    const getAcctok = (hash: string) => {
        return hash.split("&")[0].split("#access_token=")[1];
    };

    return <>로그인 진행 중...</>;
};

export default ValidContainer;
