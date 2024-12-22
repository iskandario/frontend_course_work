import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }
        
        // Пропускаем проверку пароля, всегда считаем успешным логин
        setError(null); // Убираем ошибку
        setSuccessMessage("Вы успешно вошли в систему!");
        navigate("/root"); // Перенаправляем на страницу после успешного логина
    };

    // Функция для регистрации без обращения к бэкенду
    const handleRegistration = () => {
        if (!email || !password) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }

        // Вместо реальной регистрации сразу показываем сообщение об успехе
        setError('');
        setSuccessMessage("Регистрация прошла успешно. Теперь вы можете войти в систему.");
        navigate("/login"); // Перенаправляем на страницу логина
    };
    

    console.log(error);
    return (
        <div className={styles.formContainer}>
            <div className={styles.siteHeader}>
                <img src="/notion.svg" alt="Иконка сайта" className={styles.siteIcon}/>
                <h1 className={styles.siteName}>ProNotion</h1>
            </div>
            <div className={styles.formBox}>
                <input
                    className={styles.formInput}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder='Username'
                />
                <input
                    className={styles.formInput}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder='Password'
                />
                <button
                    className={styles.formButton}
                    onClick={handleLogin}
                >
                    Login
                </button>
                <button className={styles.formButton} onClick={handleRegistration}>Register</button>

                {error && <div className={styles.error}>{error}</div>}
                {successMessage && <div className={styles.success}>{successMessage}</div>}

            </div>
        </div>
    );
};

export default LoginForm;
