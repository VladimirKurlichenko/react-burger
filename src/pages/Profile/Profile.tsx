import style from './Profile.module.css';
import { Link, NavLink } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef, useCallback } from 'react';
import { logout, patchUserData } from '../../services/actions/auth';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((store: any) => store.user);

    const [form, setForm] = useState({ username: user.username, email: user.email, password: '' });

    const resetProfileFormValue = () => {
        setForm({ ...form, username: user.name, email: user.email, password: '' });
    }

    const mainRef = useRef<HTMLDivElement>(null);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const formValue = e.currentTarget.value;
        const formName = e.currentTarget.name;
        setForm(prev => ({ ...prev, [formName]: formValue }))
    }

    const onSubmit = (e: React.SyntheticEvent & any) => {
        e.preventDefault();
        console.log("work")
        console.log(e.nativeEvent.submitter.name)
        if (e.nativeEvent.submitter.name === 'update') {
            dispatch(patchUserData(form));
            console.log("work")
        }
        if (e.nativeEvent.submitter.name === 'cancel') {
            resetProfileFormValue();
            console.log("work cancel")
        }
    }

    const onClickLogout = useCallback((e) => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <div className={style.main} ref={mainRef}>
            <nav className={style.nav}>
                <NavLink
                    exact to={{ pathname: '/profile' }}
                    activeClassName={style.activeLink}
                    className={`text text_type_main-large text-color-inactive ${style.navChild}`}>
                    Профиль
                </NavLink>

                <NavLink
                    exact to={{ pathname: '/profile/orders' }}
                    activeClassName={style.activeLink}
                    className={`text text_type_main-large text-color-inactive ${style.navChild}`}>
                    История заказов
                </NavLink>

                <Link
                    onClick={onClickLogout}
                    to={{ pathname: '/' }}
                    className={`text text_type_main-large text-color-inactive ${style.navChild}`}>
                    Выход
                </Link>

                <p className={`text text_type_main-small text_color_inactive ${style.navParagraph}`}>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>

            <form onSubmit={onSubmit} className={style.form}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={form.username}
                    name={'username'}
                    icon={'EditIcon'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />

                <div className={style.formChild}>
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        icon={'EditIcon'}
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
                            type="secondary" size="medium" name="cancel"
                        >
                            Отмена
                        </Button>

                        <Button
                            type="primary" size="medium" name="update"
                        >
                            Сохранить
                        </Button>
                    </div>

            </form>
        </div>

    )
}