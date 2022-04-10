import style from './Register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../../services/actions/auth';
import { useDispatch, useSelector } from '../../types/hooks';
import { useState } from 'react';

export default function Register() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setForm({...form, [e.currentTarget.name]: e.currentTarget.value })
    }

    const onFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(form, "проверка регистрации");
        dispatch(register(form));
        history.replace({ pathname: '/' });
    }
    
    return (
        <>
            <div className={style.main}>

                <form onSubmit={onFormSubmit} className={style.form}>
                    <p className="text text_type_main-large">
                        Регистрация
                    </p>

                    <div className={style.formChild}>

                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onChange}
                            value={form.username}
                            name={'username'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>

                    <div className={style.formChild}>
                        <Input
                            type={'text'}
                            placeholder={'E-mail'}
                            onChange={onChange}
                            value={form.email}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>

                    <div className={style.formChild}>
                        <PasswordInput
                            onChange={onChange}
                            value={form.password}
                            name={'password'}
                            
                        />
                    </div>

                    <div className={style.formChild}>
                        <Button
                            type="primary"
                            size="large"
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>

                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link to={{ pathname: '/login' }}>Войти</Link>
                </p>
            </div>
        </>
    )
}