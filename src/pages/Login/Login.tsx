import style from './Login.module.css';
import { Button, Input, PasswordInput, } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from '../../types/hooks';
import { login } from '../../services/actions/auth';

export default function Login() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
    };

    const onFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(login(form));
        history.replace({ pathname: '/' });
    }

    return (
        <div className={style.main}>

            <p className="text text_type_main-large">
                Вход
            </p>


            <form onSubmit={onFormSubmit} className={style.form}>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={onFormChange}
                    value={form.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />

                <div className={style.formChild}>
                    <PasswordInput
                        onChange={onFormChange}
                        value={form.password}
                        name={'password'}
                    />

                </div>

                <div className={style.formChild} data-cy="buttonInput">
                    <Button
                        type="primary"
                        size="large"
                    >
                        Войти
                    </Button>
                </div>

            </form>

            <p className="text text_type_main-default text_color_inactive">
                Вы — новый пользователь? <Link to={{ pathname: '/register' }}>Зарегистрироваться</Link>
            </p>

            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль? <Link to={{ pathname: '/forgot-password' }}>Восстановить пароль</Link>
            </p>
        </div>
    )
}