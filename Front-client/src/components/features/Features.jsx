import { useState, useEffect, useContext } from "react"
import useFetch from "../../hooks/useFetch"
import "./features.scss"
import { useNavigate } from "react-router-dom"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Aos from 'aos'
import 'aos/dist/aos.css'
import { SearchContext } from "../../context/SearchContext"

const Features = () => {
    // eslint-disable-next-line
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=Ha Noi,Ho Chi Minh,Phu Quoc,Da Lat,Da Nang,Sa Pa")

    const { dispatch } = useContext(SearchContext);
    // eslint-disable-next-line
    const [destination, setDestination] = useState(['Ha Noi', 'Ho Chi Minh', 'Phu Quoc', 'Da Lat', 'Da Nang', 'Sa Pa'])
    
    const today = new Date();
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const startDate = new Date(today);
    const endDate = new Date(today.setDate(today.getDate() + 2));
    // eslint-disable-next-line
    const [dates, setDates] = useState([
        {
            startDate: startDate,
            endDate: endDate,
            key: 'selection'
        }
    ]);
    // eslint-disable-next-line
    const [option, setOption] = useState({
        adult: 2,
        children: 0,
        room: 1
    });

    const navigate = useNavigate()

    const list = [
        {
            img: 'https://cdn.lawnet.vn/nhch-images//CauHoi_Hinh/87577cc2-910a-477e-a1c9-f066df898287.jpg',
            desc: 'Ha Noi, the capital of Vietnam, is an attractive destination with a wonderful combination of rich historical and cultural heritage, unique architecture and fresh green spaces.'
        },
        {
            img: 'https://www.new7wonders.com/app/uploads/sites/5/2016/10/ho-chi-minh-city-1348092-1920x1280.jpg',
            desc: 'This vibrant city is known as the "Pearl of the Far East" because of its charming heritage architecture, dynamic, vibrant, bustling atmosphere and friendly people.'
        },
        {
            img: 'https://vietnam.travel/sites/default/files/styles/top_banner/public/2021-05/Phu%20Quoc%20family%20guide.jpg?itok=5NYQQXnW',
            desc: 'Tourists can visit Phu Quoc National Park, which attracts millions of tourists with beautiful pristine beaches and rich and diverse flora and fauna.'
        },
        {
            img: 'https://static.vinwonders.com/production/gioi-thieu-ve-da-lat-1.jpg',
            desc: 'Da Lat appears with a dreamy and poetic scene thanks to the cold plateau at night, the morning fog and the vast pine forest, promising to be an attractive tourist destination.'
        },
        {
            img: 'https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA',
            desc: 'Da Nang brings together mountains, plains, and seas and is one of the top 20 cleanest cities in the world, with diverse terrain and beautiful natural scenery.'
        },
        {
            img: 'https://i-dulich.vnecdn.net/2022/05/10/Sa-Pa-mai-anh-dao-8046-1650277-6665-2702-1652148656.jpg',
            desc: 'Sa Pa is a destination to admire the wild beauty of terraced fields, waterfalls, mountains, customs and cultural beauty of ethnic groups in the mountains.'
        }
    ]

    useEffect(() => {
        Aos.init({ duration: 500 })
    }, [])


    return (
        <section className="features container section">

            <div data-aos='fade-right' className="ftSecTitle">
                <h3 className="ftTitle">Most visited destinations</h3>
            </div>

            <div className="ftSecContent grid">
                {loading ? 'PLEASE WAIT' :
                    <>
                        {data && list.map(({ img, desc }, i) => {
                            return (
                                <div className="singleDestination" key={i}>
                                    <div className="imageDiv">
                                        <img src={img}
                                            alt=''
                                        />
                                    </div>

                                    <div className="cardInfo"
                                        onClick={() => {
                                            dispatch({ type: "NEW_SEARCH", payload: { destination: destination[i], dates, option } });
                                            localStorage.setItem('dates', JSON.stringify(dates));
                                            localStorage.setItem('option', JSON.stringify(option));
                                            navigate("/hotels", { state: { destination: destination[i], dates, option } })
                                        }}
                                    >
                                        <h4 className="destTitle flex">
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            {destination[i]}

                                            <span>
                                                <small>{data[i]} properties</small>
                                            </span>
                                        </h4>

                                        <div className="desc">
                                            <p>{desc}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                }
            </div>
        </section>
    )
}

export default Features