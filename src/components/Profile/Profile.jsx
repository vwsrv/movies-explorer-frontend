export default function Profile() {
    return(
        <div className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>
            <form className="profile__form">
                <label htmlFor="user-name" className="profile__field">
                    <p className="profile__input_name">Имя</p>
                    <input type="text" className="profile__input profile__input_type-name" />
                </label>
                <label htmlFor="user-email" className="profile__field">
                    <p className="profile__input_name">E-mail</p>
                    <input type="text" className="profile__input profile__input_type-email" />
                </label>
                <span className="profile__input-error"></span>
                <button className="profile__button profile__edit-btn">Редактировать</button>
                <button href="#" className="profile__button profile__signout-btn">Выйти из аккаунта</button>
            </form>
        </div>
    )
}