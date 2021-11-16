import ListItem from './ListItem';
const ListPassenger = ({ data, hapusPengunjung, editPengunjung }) => {

    return (
        <div>
            <table cellPadding="5px" cellSpacing="0" style={{ margin: "auto" }}>
                <thead bgcolor="red">
                    <td>Id</td>
                    <td>Nama</td>
                    <td>Umur</td>
                    <td>Jenis Kelamin</td>
                    <td bgcolor="white" className="removeBorder"></td>
                </thead>
                {
                    console.log(data)
                }
                {data.map(item => (
                    <ListItem
                        key={item.id}
                        data={item}
                        editPengunjung={editPengunjung}
                        hapusPengunjung={hapusPengunjung}
                    />
                ))}
            </table>
        </div>
    )
}

export default ListPassenger;