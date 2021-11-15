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
    const { loading, error, data } = useQuery(GET_VISITORS);

    const tambahPengunjung = () => { };
    const hapusPengunjung = () => { };

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
                        hapusPengunjung={hapusPengunjung}
                    />
                    <PassengerInput
                        tambahPengunjung={tambahPengunjung}
                    /></>)
            }
        </div>
    )
}

export default Home;