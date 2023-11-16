import Header from '../Header/Header'
import Promo from '../Main/Promo/Promo'
import NavTab from '../Main/NavTab/NavTab'
import AboutProject from '../Main/AboutProject/AboutProject'

export default function App() {
    return (
        <div className="page">
            <Header />
            <Promo />
            <NavTab />
            <AboutProject />
        </div>
    )
}