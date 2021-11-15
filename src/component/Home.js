import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PassengerInput from './PassengerInput';
import ListPassenger from './ListPassenger';
import Header from './Header';
import { useQuery, gql } from "@apollo/client";
import { ReactComponent as LoadingDualRing } from "../assets/loadingDualRing.svg";

const GET_VISITORS = gql`
    query GetVisitors {
        kampus_merdeka_visitors {
            id
            name
            age
            sex
        }
    }
`;

const Home = () => {
    const [visitors, setVisitors] = useState([]);
    const { loading, error, data } = useQuery(GET_VISITORS);

    const tambahPengunjung = () => { };
    const hapusPengunjung = () => { };

    // useEffect(() => {
    //     const getData = async () => {
    //         const { loading, error, data } = useQuery(GET_VISITORS);
    //         try {
    //             if (loading) {
    //                 console.log("Loading...");
    //             } else if (error) {
    //                 console.log(error);
    //             } else {
    //                 console.log(data);
    //                 setVisitors(data.kampus_merdeka_visitors);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // })

    return (
        <div>
            {loading ? (
                <LoadingDualRing />
            ) : error ?
                (<p>{error}</p>) :
                (<>
                    <Header />
                    <ListPassenger
                        data={data.kampus_merdeka_visitors.map(({ id, name, age, sex }) => {
                            return {
                                id,
                                nama: name,
                                umur: age,
                                jenisKelamin: sex
                            };
                        })}
                        // data={data.kampus_merdeka_visitors}
                        hapusPengunjung={hapusPengunjung}
                    />
                    <PassengerInput
                        tambahPengunjung={tambahPengunjung}
                    /></>)
            }
        </div>
    )
}

// class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: [],
//         }

//         // const {
//         //     loading: loadingGet,
//         //     error: errorGet,
//         //     data: dataGet } = useQuery
//         // this.state = {
//         //     data : [
//         //         {
//         //             id: uuidv4(),
//         //             nama: 'Yoga',
//         //             umur: 22,
//         //             jenisKelamin: 'Pria'
//         //         },
//         //         {
//         //             id: uuidv4(),
//         //             nama: 'Ria',
//         //             umur: 19,
//         //             jenisKelamin: 'Wanita'
//         //         },
//         //         {
//         //             id: uuidv4(),
//         //             nama: 'Fahmi',
//         //             umur: 25,
//         //             jenisKelamin: 'Pria'
//         //         },
//         //         {
//         //             id: uuidv4(),
//         //             nama: 'Lala',
//         //             umur: 21,
//         //             jenisKelamin: 'Wanita'
//         //         },
//         //         {
//         //             id: uuidv4(),
//         //             nama: 'Ivan',
//         //             umur: 25,
//         //             jenisKelamin: 'Pria'
//         //         }
//         //     ]
//         // }
//     }

//     componentDidMount() {
//         this.getData();
//     }

//     getData = () => {
//         const GET_PENGUNJUNG = `
//             query GetVisitors {
//                 kampus_merdeka_visitors {
//                     id
//                     name
//                     age
//                     sex
//                 }
//             }
//         `;
//         const { loading, error, data } = useQuery(GET_PENGUNJUNG);
//     }


//     hapusPengunjung = id => {
//         this.setState({
//             data: [
//                 ...this.state.data.filter(item => {
//                     return item.id !== id;
//                 })
//             ]
//         });
//     };

//     tambahPengunjung = newUser => {
//         const newData = {
//             id: uuidv4(),
//             ...newUser
//         };
//         this.setState({
//             data: [...this.state.data, newData]
//         });
//     };

//     render() {
//         return (
//             <div>
//                 <Header />
//                 <ListPassenger
//                     data={this.state.data}
//                     hapusPengunjung={this.hapusPengunjung}
//                 />
//                 <PassengerInput
//                     tambahPengunjung={this.tambahPengunjung}
//                 />
//             </div>
//         )
//     }
// }

export default Home;