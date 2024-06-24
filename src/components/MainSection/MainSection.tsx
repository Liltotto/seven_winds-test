import { outlayAPI } from '../../services/OutlayService';
import './mainSection.scss'

const MainSection = () => {

    const eID = 128694

    const {data: outlay_rows, isLoading, error} = outlayAPI.useGetAllOutlayRowsQuery(eID)


    return (
        <div className="main-section">
            <div className="main-section__title">
                <div className="main-section__title-item">
                    Строительно-монтажные работы
                </div>
                <div className="main-section__title-space"></div>
            </div>
    
            <main>
                {isLoading && <div>Идет загрузка...</div>}
                {error && <div>Произошла ошибка при загрузке</div>}
                <table className="main-section__table" >
                    <thead>
                        <tr>
                            <th>Уровень</th>
                            <th>Наименование работ</th>
                            <th>Основная з/п</th>
                            <th>Оборудование</th>
                            <th>Накладные расходы</th>
                            <th>Сметная прибыль</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Южная строительная площадка</td>
                            <td>20 348</td>
                            <td>1 750</td>
                            <td>108,07</td>
                            <td>1 209 122,5</td>
                        </tr>
                        <tr>
                            <td className="nested">1.1</td>
                            <td>Фундаментальные работы</td>
                            <td>20 348</td>
                            <td>1 750</td>
                            <td>108,07</td>
                            <td>1 209 122,5</td>
                        </tr>
                        <tr>
                            <td className="nested">1.2</td>
                            <td>Статья работы № 1</td>
                            <td>20 348</td>
                            <td>1 750</td>
                            <td>108,07</td>
                            <td>189 122,5</td>
                        </tr>
                        <tr>
                            <td className="nested">2</td>
                            <td>Статья работы № 2</td>
                            <td>38 200</td>
                            <td>1 200</td>
                            <td>850</td>
                            <td>1 020 000</td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default MainSection;