
import arrow_down from '../../assets/arrow_down.svg'
import section_icon from '../../assets/section_icon.svg'
import './projectsList.scss'


const ProjectsList = () => {
    return (
        <div className="projects-list">
            <div className="projects-list__header">
                <div className="projects-list__header-title">
                    <span className="projects-list__header-title_main">Название проекта</span>
                    <span className="projects-list__header-title_submain">Аббревиатура</span>
                </div>

                <img src={arrow_down} alt="arrow_down" />
            </div>

            <ul className="projects-list__list">
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>

                    <span>По проекту</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>Объекты</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>РД</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>МТО</span>
                </li>
                <li className="projects-list__item projects-list__item_active">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>СМР</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>График</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>Мим</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>Рабочие</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>Капвложения</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>Бюджет</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>Финансирование</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>Панорамы</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>Камеры</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>Поручения</span>
                </li>
                <li className="projects-list__item">
                    <div className="projects-list__item-img">
                        <img src={section_icon} alt="section_icon" />
                    </div>
                    <span>Контрагенты</span>
                </li>
            </ul>
        </div>
    );
};

export default ProjectsList;