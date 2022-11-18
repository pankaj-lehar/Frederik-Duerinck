import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from 'react-redux';
import axios from "axios";
import moment from "moment";

const TextEditor = () => {

    const dateFromRedux = useSelector(state => state.login.dateFromPastLog);
    const loginDataRedux = useSelector(state => state.login.loginInfo);


    let todayDate = new Date();
    let sortedTodayDate = moment((todayDate.getMonth() + 1) + '-' + todayDate.getDate() + '-' + todayDate.getFullYear(), 'MM-DD-YYYY').format('MM-DD-YYYY');

    // let t;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [updateText, setUpdateText] = useState(false);

    const onEditorStateChange = (editorState) => {
        if (editorState !== null) {
            setEditorState(editorState);
            localStorage.setItem('EditorDataLocal' + loginDataRedux.userID + '-' + dateFromRedux, JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        }
    };

    let content = window.localStorage.getItem('EditorDataLocal' + loginDataRedux.userID + '-' + dateFromRedux);

    const AUTOSAVE_INTERVAL = 3000;
    useEffect(() => {
        const timer = setTimeout(() => {
            checkstatechange();
        }, AUTOSAVE_INTERVAL);
        return () => clearTimeout(timer);
    }, [editorState]);


    const checkstatechange = () => {

        if (content && localStorage.getItem('EditorDataLocal' + loginDataRedux.userID + '-' + dateFromRedux)) {
            setUpdateText(true);
            let contentddd = JSON.parse(content);

            if (editorState !== null && contentddd.blocks[0].text) {

                axios({
                    method: 'post',
                    url: process.env.REACT_APP_EDITOR,
                    data: {
                        todayDate: dateFromRedux,
                        editorData: content,
                        userId: loginDataRedux.userID,
                        api_token: localStorage.getItem("api_token")
                    }
                }).then((response) => {
                    // console.log("545454545 : ", response.data.msg)
                    if (response.data.msg === "updated" || "save") {
                        setUpdateText(false);
                        localStorage.removeItem('EditorDataLocal' + loginDataRedux.userID + '-' + dateFromRedux);
                    }
                    else {
                        setUpdateText(false);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }


    useEffect(() => {
        axios.get(process.env.REACT_APP_EDITOR + "/" + loginDataRedux.userID + "?api_token=" + localStorage.getItem("api_token") + "").then((response) => {
            // console.log("222 : ", response.data)
            setEditorState(EditorState.createEmpty());
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].todayDate === dateFromRedux) {
                    // console.log("data", dateFromRedux);
                    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(response.data[i].editorTextData))))
                }
            }
        }).catch(err => {
            // console.log("Error is ", err);
        });
    }, [dateFromRedux]);


    const focusFunction = () => {
        console.log("Focus is on the input field  ");
    }

    return (
        <React.Fragment>

            {updateText && <span style={{ color: "gray" }} >Saving...</span>}
            <div className={dateFromRedux === sortedTodayDate ? '' : 'stopEditEditor'}>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    // onBlur={checkstatechange}
                    wrapperStyle={{ width: "100%", border: "1px solid rgb(227, 226, 225)" }}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'image'],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: { inDropdown: true }
                    }}

                    onFocus={focusFunction}
                />

            </div>

        </React.Fragment>
    )
}
export default TextEditor