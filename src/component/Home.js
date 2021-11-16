import { useEffect, useState } from 'react';
import PassengerInput from './PassengerInput';
import ListPassenger from './ListPassenger';
import Header from './Header';
import SearchPassenger from './SearchPassenger';
import { useQuery, gql } from "@apollo/client";
import { ReactComponent as LoadingDualRing } from "../assets/loadingDualRing.svg";

const GET_PASSENGERS = gql`
    query GetPassengers {
        kampus_merdeka_passengers {
            id
            name
            age
            sex
        }
    }
`;

const GET_PASSENGERS_BY_ID = gql`
    query GetPassengers($id: Int!) {
        kampus_merdeka_passengers(where: { id: { _eq: $id } }) {
            id
            name
            age
            sex
        }
    }
`;

const POST_PASSENGER = gql`
    mutation PostPassenger($name: String!, $age: Int!, $sex: String!){
        insert_kampus_merdeka_passengers(objects: {name: $name, age: $age, sex: $sex}){
            id
            name
            age
            sex
        }
    }
`;

const Home = () => {
    const [id, setId] = useState('');
    const [list, setList] = useState([]);
    const { loading, error, data, refetch } = useQuery(GET_PASSENGERS);
    const { loading: loadingGetId, error: errorGetId, data: dataGetId, refetch: refetchGetId } = useQuery(GET_PASSENGERS_BY_ID, {
        variables: { id }
    });

    useEffect(() => {
        if (data) {
            setList(data.kampus_merdeka_passengers);
        }
        if (dataGetId) {
            setList(dataGetId.kampus_merdeka_passengers);
        }
    }, [dataGetId, data]);


    const handleSearch = (event) => {
        event.preventDefault();
        refetchGetId({ id });
    }

    const tambahPengunjung = () => { };
    const hapusPengunjung = () => { };

    return (
        <div>
            <Header />
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
                <div className="form-group">
                    <label htmlFor="id">Search by ID</label>
                    <br />
                    <input type="text" className="form-control" id="id" placeholder="Enter ID"
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <br />
            {(loading || loadingGetId) ? (
                <LoadingDualRing />
            ) : error ?
                (<p>{error}</p>) :
                (<>
                    <ListPassenger
                        data={list.map(({ id, name, age, sex }) => {
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