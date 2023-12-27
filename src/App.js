import './App.css';
import Sign_up_form from "./components/Sign_up_form";
import React, {useState} from "react";
import logoImg from "./components/img/logo.jpg";
import profileImg from "./components/img/icon_profile.png";
import dotImg from "./components/img/Ellipse 1.svg";
import Research_form from "./components/Research_form";
import Modal from "./components/UI/Modal/Modal";
import Sign_in_form from "./components/Sign_in_form";



function App() {
    const [visibleSignUpForm, setVisibleSignUpForm] = useState(false);
    const [visibleSignInForm, setVisibleSignInForm] = useState(false);

  return (
      <div className="App">
          <header className="header">
              <div style={{display: "grid", gridTemplateColumns: " 2fr 8fr 2fr"}}>
                  <div>
                      <img src={logoImg} alt='logo' style={{height: "95px", margin: "0px 20px"}}/>
                  </div>
                  <div>
                      <nav className="nav">
                          <button>Мероприятия</button>
                          <button>Новости</button>
                          <button>Конкурсы</button>
                          <button>Исследователям других вузов</button>
                          <button>Сообщество (СНО)</button>
                          <button>Контакты</button>
                      </nav>
                  </div>
                  <div style={{display:"flex", justifyContent:"space-around"}}>
                      <button className="profile"
                              onClick={e => {setVisibleSignInForm(true)}}
                              style={{padding: "0px"}}
                      >
                          <img src={profileImg} alt='profile' style={{width: '55px'}}/>
                      </button>
                  </div>
              </div>
          </header>
          <h3>Профиль</h3>
          <main className="content">
              <section className="sidebar">
                  <button><img src={dotImg}/> Главная</button>
                  <button><img src={dotImg}/> Личные данные</button>
                  <button><img src={dotImg}/> Мои публикации</button>
                  <button><img src={dotImg}/> Подача заявки</button>
                  <button><img src={dotImg}/> Сервисы</button>
              </section>
              <section className="main">
                <Research_form/>
              </section>
              <Modal visible={visibleSignInForm} setVisible={setVisibleSignInForm}>
                  <Sign_in_form/>
                  <button onClick={e => {
                      setVisibleSignInForm(false);
                      setVisibleSignUpForm(true)
                  }} style={{background: "white", border: "white", marginLeft: "33%", textDecoration: "underline"}}>Создать аккаунт</button>
              </Modal>
              <Modal visible={visibleSignUpForm} setVisible={setVisibleSignUpForm}>
                  <Sign_up_form/>
              </Modal>
          </main>
          <footer className="footer">
              <div style={{display: "grid", gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr 2fr"}}>
                  <div>
                      <p>Учебный центр студентческой науки,<br/> конференций и выставок ИТМО</p>
                      <p style={{fontSize: "14px"}}>8 (812) 480-10-91<br/>
                      8 (812) 480-10-92</p>
                      <p style={{fontSize: "14px"}}>csn@itmo.ru<br/>
                      <span style={{fontSize: "10px"}}>Кронверкский проспект, д.49,лит.А, ауд.2302</span></p>
                      <div style={{display: "grid", gridTemplateColumns: "2fr 2fr"}}>
                          <div>
                              <p style={{lineHeight: "25px", margin: 0}}>Время приёма<br/>
                              <span style={{fontSize: "16px"}}>11:00 - 18:00</span></p>
                          </div>
                          <div style={{display: "flex", justifyContent: "flex-start"}}>
                              <img src={dotImg} style={{width: "30px", marginRight: "8px"}}/>
                              <img src={dotImg} style={{width: "30px"}}/>
                          </div>
                      </div>


                  </div>
                  <div></div>
                  <div>
                      <h3>ИТМО</h3>
                      <p>Университет</p>
                      <p>Лицензия</p>
                      <p>Факультеты</p>
                      <p>Как поступить</p>
                  </div>
                  <div>
                      <h3>Наука</h3>
                      <p>О студнауке</p>
                      <p>Сотрудники</p>
                      <p>Научные подразделения</p>
                      <p>Контакты</p>
                  </div>
                  <div>
                      <h3>Поступление</h3>
                      <p>Магистратура</p>
                      <p>Для студентов других вузов</p>
                      <p>Стипендии</p>
                      <p>Приемная компания</p>
                  </div>
                  <div>
                      <h3>Ресурсы</h3>
                      <p>Конкурсы и гранты</p>
                      <p>Конференции</p>
                      <p>Сообщество(СНО)</p>
                      <p>Новости</p>
                      <p>НИРМА</p>
                      <p>ПО НИОКТР</p>
                  </div>
              </div>
          </footer>
      </div>
  );
}

export default App;
