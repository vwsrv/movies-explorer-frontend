import headerLogo from '../../images/main_logo.svg'

export default function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <img src={headerLogo} alt="" className="header__logo" />
                <nav className="header__nav">
                    <button className="header__button header__button-signup">Регистрация</button>
                    <button className="header__button header__button-signin">Войти</button>
                </nav>
            </div>
        </header>
    )
}