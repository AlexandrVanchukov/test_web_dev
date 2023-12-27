import React, {useEffect} from 'react';
import Input from "./UI/Input/Input";
import Button from "../../../test_web_dev/src/components/UI/Button/Button";
import {useState} from "react";
import axios from "axios";

const SignInForm = () =>{
    let [emailDirty, setEmailDirty] = useState(false);
    let [passwordDirty, setPasswordDirty] = useState(false);

    let [emailError, setEmailError] = useState('Необходимо указать email');
    let [passwordError, setPasswordError] = useState('Необходимо указать пароль');

    let [formValid, setFormValid] = useState(false);

    const [form, setForm] = useState({email: "", password: ""});
    async function sign_in() {
        console.log(form)
        try {
            await axios({
                url: 'https://google.com/',
                headers: {
                    "Content-type": "application/json"
                },
                params: {
                    form
                },
                method: "GET",
                data: null
            }).then(({data}) => {
                return data;
            });
        } catch (e) {
            console.log('Ошибка отправки', e)
        }
    }

    useEffect(() => {
        if(emailError || passwordError){
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }

    }, [ emailError, passwordError]);

    const blurHandler = (e) => {
        switch (e.target.name){
            case "email":
                setEmailDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
        }
    }

    const emailHandler = (e) =>{
        setForm({...form,email:e.target.value});
        const valid = String(e.target.value)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (!valid) {
            setEmailError("Некорекктный адрес почты")
            if(!e.target.value){
                setEmailError("Необходимо указать почту")
            }
        }
        else{
            setEmailError("")
        }
    }
    const passwordHandler = (e) =>{
        setForm({...form,password:e.target.value});
        if(!e.target.value){
            setPasswordError("Необходимо указать пароль")
        }
        else{
            setPasswordError("")
        }
    }

    return (
        <form style={{width: 300, margin: 20}}>
            Почта
            {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
            <Input
                value = {form.email}
                name = "email"
                onBlur = {e => blurHandler(e)}
                onChange={e => emailHandler(e)}
                type = "email"
                placeholder="Почта"
            />
            Пароль
            {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
            <Input
                value = {form.password}
                name = "password"
                onBlur = {e => blurHandler(e)}
                onChange={e => passwordHandler(e)}
                type = "password"
                placeholder="Пароль"
            />
            <Button onClick={sign_in} disabled={!formValid}>Войти</Button>
        </form>
    );
};

export default SignInForm;