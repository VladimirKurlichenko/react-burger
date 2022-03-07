import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react';
import style from './ForgotPassword.module.css';
import {Link, useHistory} from 'react-router-dom';
import { forgotPassword } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { PASSWORD_FORGOT } from '../../services/actions/forgotPassword';

export default function ForgotPassword() {

    const [valueForm, setValueForm] = useState({ email: '' })
    const history = useHistory();
    const dispatch = useDispatch();

    const onFormChange = (e) => {
        console.log(e.target.value, "e");
        setValueForm(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(valueForm, "form");
        dispatch({ type: PASSWORD_FORGOT });
        dispatch(forgotPassword(valueForm));
        history.replace({ pathname: '/reset-password' });
    }


    return (
        <div className={style
    .main}>
            <p className="text text_type_main-large">
                Восстановление пароля
            </p>

            <form onSubmit={onFormSubmit} className={style
            .form}>
                <Input
                    type={'text'}
                    placeholder={'Укажите e-mail'}
                    name={'email'}
                    onChange={onFormChange}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />

                <div className={style
                .formChild}>
                    <Button
                        type="primary"
                        size="large"
                    >
                        Восстановить
                    </Button>
                </div>

            </form>

            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link to={{ pathname: '/login' }}>Войти</Link>
            </p>
        </div>
    )
}