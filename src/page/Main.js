import '../assets/styles/Main.css'
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import Wagon from '../assets/images/wagon.png'
import Item1 from '../assets/images/item1.png'
import Item2 from '../assets/images/item2.png'
import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import { useEffect, useState } from 'react';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const Main = () => {
    const [request, setRequest] = useState()
    const [repairPlanDate, setRepairPlanDate] = useState()
    const [repairPastDate, setRepairPastDate] = useState()
    const [capitalRepair, setCapitalRepair] = useState(false)
    const [currentMileage, setCurrentMileage] =useState(0)
    const [text, setText] = useState("")
    const [conditionPercentage, setConditionPercentage] = useState()
    const [colour, setColour] = useState()
    const [data, setData] = useState({})
    const [isTrue, setIsTrue] = useState(false)

    const ViewRequest = () => {
        axios
            .get("http://3.121.226.168:8080/main")
            .then(result => {
                setRequest(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const PostDate = (event) => {
        event.preventDefault();

        console.log(repairPlanDate, repairPastDate, capitalRepair, currentMileage)
        axios
        .post("http://3.121.226.168:8080/main", {
            repairPlanDate,
            repairPastDate,
            capitalRepair,
            currentMileage    
        })
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })

        setText("Это временный текст")
        setColour('YELLOW')
        setConditionPercentage('30%')
        setIsTrue(true)
        
    }

    const DoughnutFunction = () => {
        var percentage= conditionPercentage.slice(0,-1)
        
            const temp={
                datasets: [{
                    data: [Number(percentage),100-percentage],
                    backgroundColor: [colour, '#0B131E'],
                    borderColor: [colour, '#0B131E'],
                }],
            }
            setData(temp)
            setIsTrue(false)
    }
    const date = new Date();
    console.log(formatDate(date));

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    useEffect(()=>{
        ViewRequest()
    }, [])

    return(
    <div className='main'>
        <div className='wagon__container'>
            <div className='wagon__item'>
                <h1>Крытый вагон</h1>
                <div className='wagon__carousel'>
                    <FaChevronLeft className='wagon__carousel-line'/>
                    <img src={Wagon} alt=""/>
                    <FaChevronRight className='wagon__carousel-line'/>
                </div>
                <h2>Вид поломки</h2>
                <div className='wagon__components'>
                    <div className='wagon__component'>
                        <img src={Item1} alt=""/>
                        <p>531 : Пoвpeждeниe oбшивки кузoвa</p>
                    </div>
                    <div className='wagon__component'>
                        <img src={Item2} alt=""/>
                        <p>107 : Выщербина обода колеса</p>
                    </div>
                </div>
            </div>
            {isTrue === true ? DoughnutFunction() : ""}
            {text === "" ? "" : 
            <div className='wagon__state'>
                <div className='state'>
                    <h2>Состояние</h2>
                    <p>{text}</p>
                </div>
                <div className='wagon__doughnut'>
                    <Doughnut data={data}/>
                    <p>{conditionPercentage}</p>
                </div>
            </div>
            }
            <div className='request'>Было сделано: {request} запросов</div>
        </div>
        <div className='wagon__form-directory'>
            <form onSubmit={PostDate} className='form'>
                <h1>Внести данные</h1>
                <div className='input_box'>
                    <label>Дата планового ремонта</label>
                    <input type="date" 
                        value={repairPlanDate}
                        min={formatDate(date)}
                        onChange={e=>setRepairPlanDate(e.target.value)}
                    />
                </div>
                <div className='input_box'>
                    <label>Дата прошлого ремонта</label>
                    <input 
                        type="date"
                        max={formatDate(date)}
                        value={repairPastDate}
                        onChange={e=>setRepairPastDate(e.target.value)}/>
                </div>
                <div className='check_box'>
                    <label>Вид прошлого ремонта Капитальный?</label>
                    <input 
                        type="checkbox" 
                        onChange={e=>setCapitalRepair(e.target.checked)}
                        />
                </div>
                <div className='input_box'>
                    <label>Текущий Пробег (км)</label>
                    <input 
                        type="number"   
                        value={currentMileage}
                        min='0'
                        onChange={e=>setCurrentMileage(e.target.valueAsNumber)}
                        />
                </div>
                <button type="submit">Посчитать состояние</button>
            </form>
            <div className='wagon__directory'>
                <h1>Справочник</h1>
                <p>Крытыми вагонами называют вагоны, имеющие защиту груза от любого воздействия со всех сторон, кузов которых закрыт со всех сторон. Данные вагоны предназначены для обеспечения сохранности перевозимого груза при неблагоприятных погодных условиях, для защиты от краж и повреждений.</p>
            </div>
        </div>
    </div>
    );
};

export default Main;