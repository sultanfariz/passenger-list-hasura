import { useEffect, useState } from 'react';
import PassengerInput from './PassengerInput';
import ListPassenger from './ListPassenger';
import Header from './Header';
import { useMutation, useSubscription } from "@apollo/client";
import { ReactComponent as LoadingDualRing } from "../assets/loadingDualRing.svg";
import { GET_PASSENGERS_REALTIME, GET_PASSENGERS_BY_ID_REALTIME, POST_PASSENGER, UPDATE_PASSENGER, DELETE_PASSENGER } from '../GraphQL/query';

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

    const { loading, error, data } = useSubscription(GET_PASSENGERS_REALTIME, {
        notifyOnNetworkStatusChange: true,
    });
    const { loading: loadingGetId, data: dataGetId } = useSubscription(GET_PASSENGERS_BY_ID_REALTIME, {
        variables: { id }
    });
    const [postPassenger, { loading: loadingPost, error: errorPost }] = useMutation(POST_PASSENGER);
    const [updatePassenger, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_PASSENGER);
    const [deletePassenger, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_PASSENGER);

    useEffect(() => {
        if (data) {
            setList(data.kampus_merdeka_passengers_aggregate.nodes);
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
        setUpdatedPengunjung({
            id: '',
            nama: '',
            umur: '',
            jenis_kelamin: 'Pria',
            editing: false,
        });
    }
    const hapusPengunjung = (id) => {
        deletePassenger({ variables: { id } });
    };

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
            {(loading || loadingGetId || loadingPost || loadingUpdate || loadingDelete) ? (
                <LoadingDualRing />
            ) : (error || errorPost || errorUpdate || errorDelete) ?
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