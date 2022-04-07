import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './ResetPassword.module.css';
import { Link, useHistory, Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { resetPassword } from '../../services/actions/auth';
import { RootState } from '../../services/reducers/index';


export default function ResetPassword() {
    const [valueForm, setValueForm] = useState({ password: '', token: '' })
    const history = useHistory();
    const dispatch = useDispatch();
    const isPasswordForgotten = useSelector((store: RootState) => store.forgotPassword.isPasswordForgotten);

    const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
        const formValue = e.currentTarget.value;
        const formName = e.currentTarget.name;
        setValueForm(prev => ({...prev, [formName]: formValue }))
    };

    if (!isPasswordForgotten) {
        return (
            <Redirect to={{ pathname: '/' }} />
        )
    }

    const onFormSubmit = (e: React.SyntheticEvent) => {
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