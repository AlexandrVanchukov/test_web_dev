import React, {useEffect} from 'react';
import Input from "./UI/Input/Input";
import Button from "../../../test_web_dev/src/components/UI/Button/Button";
import {useState} from "react";
import axios from "axios";

const SignUpForm = () =>{
        const [form, setForm] = useState({name: "", email: "", tel: "", university: "", city: "", password: ""});

        let [nameDirty, setNameDirty] = useState(false);
        let [telDirty, setTelDirty] = useState(false);
        let [universityDirty, setUniversityDirty] = useState(false);
        let [cityDirty, setCityDirty] = useState(false);
        let [emailDirty, setEmailDirty] = useState(false);
        let [passwordDirty, setPasswordDirty] = useState(false);

        let [nameError, setNameError] = useState('Необходимо указать ФИО');
        let [telError, setTelError] = useState('Необходимо указать телефон');
        let [universityError, setUniversityError] = useState('Необходимо указать университет');
        let [cityError, setCityError] = useState('Необходимо указать город');
        let [emailError, setEmailError] = useState('Необходимо указать email');
        let [passwordError, setPasswordError] = useState('Необходимо указать пароль');

        let [formValid, setFormValid] = useState(false);

        useEffect(() => {
                if(nameError  || telError || universityError || cityError || emailError || passwordError){
                        setFormValid(false)
                }
                else {
                        setFormValid(true)
                }

        }, [nameError, telError, universityError, cityError, emailError, passwordError]);

        async function sign_up(){
                console.log(form)
                try{
                        await axios({
                                url: '',
                                headers:{
                                        "Content-type": "application/json"
                                },
                                params: {
                                        form
                                },
                                method: "POST",
                                data: null
                        }).then(({data}) => {
                                return data;
                        });
                }
                catch (e){
                        console.log('Ошибка отправки',e)
                }
        }
        const blurHandler = (e) => {
                switch (e.target.name){
                        case "name":
                                setNameDirty(true)
                                break
                        case "tel":
                                setTelDirty(true)
                                break
                        case "university":
                                setUniversityDirty(true)
                                break
                        case "city":
                                setCityDirty(true)
                                break
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


        const telHandler = (e) =>{
                setForm({...form,tel:e.target.value});
                const valid = String(e.target.value)
                    .toLowerCase()
                    .match(
                        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
                    );
                if (!valid) {
                        setTelError("Некорекктный номер телефона")
                        if(!e.target.value){
                                setTelError("Необходимо указать номер телефона")
                        }
                }
                else{
                        setTelError("")
                }
        }



        const passwordHandler = (e) =>{
                setForm({...form,password:e.target.value});
                if (e.target.value.length < 4) {
                        setPasswordError("Пароль не должен быть меньше 4-х символов")
                        if(!e.target.value){
                                setPasswordError("Необходимо указать пароль")
                        }
                }

                else{
                        setPasswordError("")
                }
        }
        const nameHandler = (e) =>{
                setForm({...form,name: e.target.value});
                if (e.target.value) {
                        setNameError("")
                }

                else{
                        setNameError("Необходимо указать ФИО")
                }
        }

        const universityHandler = (e) =>{
                setForm({...form,university: e.target.value});
                if (e.target.value) {
                        setUniversityError("")
                }

                else{
                        setUniversityError("Необходимо указать университет")
                }
        }
        const cityHandler = (e) =>{
                setForm({...form,city: e.target.value});
                if (e.target.value) {
                        setCityError("")
                }

                else{
                        setCityError("Необходимо указать город")
                }
        }

    return (
        <form style={{width: 300, margin: 20}}>
            ФИО
            {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
            <Input
                name = "name"
                value = {form.name}
                onBlur = {e => blurHandler(e)}
                onChange={e => nameHandler(e)}
                type = "text"
                placeholder="Иванов Иван Иванович"
            />
                Телефон
                {(telDirty && telError) && <div style={{color: 'red'}}>{telError}</div>}
            <Input
                value = {form.tel}
                name = "tel"
                onBlur = {e => blurHandler(e)}
                onChange={e => telHandler(e)}
                type = "tel"
                placeholder="Телефон"
            />
                Университет
                {(universityDirty && universityError) && <div style={{color: 'red'}}>{universityError}</div>}
            <Input
                value = {form.university}
                name = "university"
                onBlur = {e => blurHandler(e)}
                onChange={e => universityHandler(e)}
                type = "text"
                placeholder="Университет"
            />
                Город
                {(cityDirty && cityError) && <div style={{color: 'red'}}>{cityError}</div>}
            <Input
                value = {form.city}
                name = "city"
                onBlur = {e => blurHandler(e)}
                onChange={e => cityHandler(e)}
                type = "text"
                placeholder="Город"
            />
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
            <Button onClick={sign_up} disabled={!formValid}>Зарегестрироваться</Button>
        </form>
    );
};

export default SignUpForm;