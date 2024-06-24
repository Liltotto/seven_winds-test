import './header.scss'
import squares from '../../assets/squares.svg'
import arrow from '../../assets/arrow.svg'


const Header = () => {
    return (
        <header>
            <div className="icons">
                <div className="icons__item">
                    <img src={squares} alt="squares" />
                </div>

                <div className="icons__item">
                    <img src={arrow} alt="arrow" />
                </div>
            </div>

            <div className="modes">
                <div className="modes__item modes__item_active">
                    <span>Просмотр</span>
                </div>
                <div className="modes__item">
                    <span>Управление</span>
                </div>
            </div>
        </header>
    );
};

export default Header;