import "./Home.css"
const ListItem = ({ data, hapusPengunjung, editPengunjung }) => {

    const { id, nama, umur, jenisKelamin } = data

    return (
        <tr>
            <td>{id}</td>
            <td>{nama}</td>
            <td>{umur}</td>
            <td>{jenisKelamin}</td>
            <td className="removeBorder" onClick={() => hapusPengunjung(id)}><button>Hapus</button></td>
            <td className="removeBorder" onClick={() => editPengunjung(id, {
                nama, umur, jenisKelamin, editing: true
            })}><button>Edit</button></td>
        </tr>
    )
}

export default ListItem;