import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './ResetPassword.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { resetPassword } from '../../services/actions/auth';


export default function ResetPassword() {
    const [valueForm, setValueForm] = useState({ password: '', token: '' })
    const history = useHistory();
    const dispatch = useDispatch();

    const onFormChange = (e) => {
        console.log(e.target.value, "e");
        setValueForm(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(valueForm, "form");
        dispatch(resetPassword(valueForm));
        history.replace({ pathname: '/' });
    }
   
    return (
        <div className={style.main}>

            <p className="text text_type_main-large">
                Восстановление пароля
            </p>

            <form onSubmit={onFormSubmit} className={style.form}>
                <PasswordInput
                    onChange={onFormChange}
                    value={valueForm.password}
                    name={'password'}
                />

                <div className={style.formChild}>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onFormChange}
                        value={valueForm.token}
                        name={'token'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className={style.formChild}>
                    <Button type="primary" size="large">
                        Сохранить
                    </Button>
                </div>

            </form>

            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link to={{ pathname: '/login' }}>Войти</Link>
            </p>

        </div>
    )
}