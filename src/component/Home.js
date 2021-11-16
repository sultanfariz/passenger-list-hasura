import { useEffect, useState } from 'react';
import PassengerInput from './PassengerInput';
import ListPassenger from './ListPassenger';
import Header from './Header';
import { useQuery, gql, useMutation } from "@apollo/client";
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
        insert_kampus_merdeka_passengers_one(object: {name: $name, age: $age, sex: $sex}){
                id
                name
                age
                sex
        }
    }
`;

const UPDATE_PASSENGER = gql`
    mutation UpdatePassenger($id: Int!, $name: String!, $age: Int!, $sex: String!){
        update_kampus_merdeka_passengers_by_pk(pk_columns: { id: $id }, _set: { name: $name, age: $age, sex: $sex }){
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
    const [updatedPengunjung, setUpdatedPengunjung] = useState({
        id: '',
        nama: '',
        umur: '',
        jenis_kelamin: 'Pria',
        editing: false,
    });
    const { loading, error, data } = useQuery(GET_PASSENGERS, {
        notifyOnNetworkStatusChange: true,
    });
    const { loading: loadingGetId, data: dataGetId } = useQuery(GET_PASSENGERS_BY_ID, {
        variables: { id }
    });
    const [postPassenger, { loading: loadingPost, error: errorPost }] = useMutation(POST_PASSENGER, {
        refetchQueries: [{ query: GET_PASSENGERS }]
    });
    const [updatePassenger, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_PASSENGER, {
        refetchQueries: [{ query: GET_PASSENGERS }]
    });

    useEffect(() => {
        if (data) {
            setList(data.kampus_merdeka_passengers);
        }
        if (dataGetId) {
            setList(dataGetId.kampus_merdeka_passengers);
        }
    }, [dataGetId, data]);

    const tambahPengunjung = (newPassenger) => {
        postPassenger({
            variables: {
                name: newPassenger.nama,
                age: newPassenger.umur,
                sex: newPassenger.jenisKelamin,
            }
        });
    };

    const editPengunjung = (id, data) => {
        updatePassenger({
            variables: {
                id,
                name: data.nama,
                age: data.umur,
                sex: data.jenisKelamin
            }
        });
    }
    const hapusPengunjung = () => { };

    const handleEditPengunjung = (id, data) => {
        setUpdatedPengunjung({
            id,
            nama: data.nama,
            umur: data.umur,
            jenisKelamin: data.jenisKelamin,
            editing: data.editing
        });
    }

    return (
        <div>
            <Header />
            <form className="form-inline my-2 my-lg-0">
                <div className="form-group">
                    <label htmlFor="id">Search by ID</label>
                    <br />
                    <input type="text" className="form-control" id="id" placeholder="Enter ID"
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
            </form>
            <br />
            {(loading || loadingGetId || loadingPost || loadingUpdate) ? (
                <LoadingDualRing />
            ) : (error || errorPost || errorUpdate) ?
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
                        editPengunjung={handleEditPengunjung}
                        hapusPengunjung={hapusPengunjung}
                    />
                    <PassengerInput
                        tambahPengunjung={tambahPengunjung}
                        editPengunjung={editPengunjung}
                        data={updatedPengunjung}
                    /></>)
            }
        </div>
    )
}

export default Home;