import React, {useEffect} from 'react';
import Input from "./UI/Input/Input";
import Button from "../../../test_web_dev/src/components/UI/Button/Button";
import {useState} from "react";
import axios from "axios";
import MySelect from "./UI/select/MySelect";

const ResearchForm = () => {
    const [form, setForm] = useState({
        name: "",
        university: "",
        lectureName: "",
        coAuthors: "",
        adviser: "",
        conference: "",
        sphere: "",
        language: "",
        abstracts: null,
        paper: null
    });

    let [nameDirty, setNameDirty] = useState(false);
    let [universityDirty, setUniversityDirty] = useState(false);
    let [lectureNameDirty, setLectureNameDirty] = useState(false);
    let [abstractsDirty, setAbstractsDirty] = useState(false);

    let [nameError, setNameError] = useState('Необходимо указать ФИО');
    let [universityError, setUniversityError] = useState('Необходимо указать университет');
    let [lectureNameError, setLectureNameError] = useState('Необходимо указать назвние доклада');
    let [abstractsError, setAbstractsError] = useState('Необходимо загрузить тезисы');

    let [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (nameError || universityError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }

    }, [nameError, universityError]);

    async function sendApplication() {
        console.log(form)
        try {
            await axios({
                url: '',
                headers: {
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
        } catch (e) {
            console.log('Ошибка отправки', e)
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setNameDirty(true)
                break
            case "lectureName":
                setLectureNameDirty(true)
                break
            case "abstracts":
                setAbstractsDirty(true)
                break

        }

    }

    const nameHandler = (e) => {
        setForm({...form, name: e.target.value});
        if (e.target.value) {
            setNameError("")
        } else {
            setNameError("Необходимо указать ФИО")
        }
    }

    const lectureNameHandler = (e) => {
        setForm({...form, lectureName: e.target.value});
        if (e.target.value) {
            setLectureNameError("")
        } else {
            setLectureNameError("Необходимо указать название доклада")
        }
    }

    const abstractsHandler = (e) => {
        setForm({...form, abstracts: e.target.value});
        if (e.target.value) {
            setAbstractsError("")
        } else {
            setAbstractsError("Необходимо загрузить тезисы")
        }
    }

        return (
            <form style={{width: "80%", margin: 20}}>
                ФИО докладчика*
                {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
                <Input
                    name="name"
                    value={form.name}
                    onBlur={e => blurHandler(e)}
                    onChange={e => nameHandler(e)}
                    type="text"
                    placeholder="Иванов Иван Иванович"
                    style={{width: "75%"}}
                />
                Название орагицзации (ВУЗа)*
                <MySelect
                    value={form.university}
                    onChange={e => setForm({...form, university: e})}
                    defaultValue="Выберите организацию из списка"
                    options={[
                        {value: 'Университет Итмо', name: 'Университет Итмо'},
                        {value: 'СПБГУ', name: 'СПБГУ'}
                    ]}

                />
                Название доклада*
                {(lectureNameDirty && lectureNameError) && <div style={{color: 'red'}}>{lectureNameError}</div>}
                <Input
                    value={form.lectureName}
                    name="lectureName"
                    onBlur={e => blurHandler(e)}
                    onChange={e => lectureNameHandler(e)}
                    type="text"
                    placeholder="Введите название доклада"
                    style={{width: "100%-15px"}}
                />
                Список соавторов*
                <MySelect
                    value={form.coAuthors}
                    onChange={e => setForm({...form, coAuthors: e})}
                    defaultValue="Выберите соавторов"
                    options={[
                        {value: 'Королёв Сергей Павлович', name: 'Королёв Сергей Павлович'},
                        {value: 'Калашников Михаил Тимофеевич', name: 'Калашников Михаил Тимофеевич'}
                    ]}
                />
                Научный руководитель*
                <MySelect
                    value={form.adviser}
                    onChange={e => setForm({...form, adviser: e})}
                    defaultValue="Выберите научного руководителя"
                    options={[
                        {value: 'Королёв Сергей Павлович', name: 'Королёв Сергей Павлович'},
                        {value: 'Калашников Михаил Тимофеевич', name: 'Калашников Михаил Тимофеевич'}
                    ]}
                />
                <div style={{display: "grid", gridTemplateColumns: "25fr 1fr 25fr"}}>
                    <div>
                        Конференция*
                        <MySelect
                            value={form.conference}
                            onChange={e => setForm({...form, conference: e})}
                            defaultValue="Выберите конференцию"
                            options={[
                                {value: 'Конгресс молодых учёных', name: 'Конгресс молодых учёных'}
                            ]}
                            style={{width: "100%"}}
                        />
                    </div>
                    <div></div>
                    <div>
                        Направление конференции*
                        <MySelect
                            value={form.sphere}
                            onChange={e => setForm({...form, sphere: e})}
                            defaultValue="Выберите направление"
                            options={[
                                {value: 'Инженерия', name: 'Инженерия'}
                            ]}
                            style={{width: "100%"}}
                        />
                    </div>
                </div>
                <div style={{display: "grid", gridTemplateColumns: "25fr 26fr"}}>
                    <div>
                        Язык выступления*
                        <MySelect
                            value={form.language}
                            onChange={e => setForm({...form, language: e})}
                            defaultValue="Выберите язык"
                            options={[
                                {value: 'Русский', name: 'Русский'},
                                {value: 'English', name: 'English'}
                            ]}
                            style={{width: "100%"}}
                        />
                    </div>
                    <div>

                    </div>
                </div>
                <div style={{display: "grid", gridTemplateColumns: "25fr 2fr 25fr"}}>
                    <div>
                        Тезисы доклада*
                        {(abstractsDirty && abstractsError) && <div style={{color: 'red'}}>{abstractsError}</div>}
                        <Input
                            name="abstracts"
                            value={form.abstracts}
                            onBlur={e => blurHandler(e)}
                            onChange={e => abstractsHandler(e)}
                            type="file"
                        />
                    </div>
                    <div></div>
                    <div>
                        Статья
                        <Input
                            name="paper"
                            value={form.paper}
                            onBlur={e => blurHandler(e)}
                            onChange={e => setForm({...form, paper: e.target.value})}
                            type="file"
                        />
                    </div>
                </div>

                <Button onClick={sendApplication} disabled={!formValid}>Отправить заявку</Button>
            </form>


        );
};
export default ResearchForm;