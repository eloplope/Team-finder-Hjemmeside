
import { createSnapshotHandler } from "./firebase";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Context.js";



function ShowMessages() {
    const [dataList, setDataList] = useState([]);
    let { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = createSnapshotHandler(setDataList);
        return () => {
            console.log("Cleaning up...");
            unsubscribe();
        };
    }, []);

    const listItems = dataList.map((doc, index) => {
        return (
            <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.author}<br></br>
                    <img src={doc.photoURL} style={{ width: 100 }} />
                </td>
                <td>{doc.message} </td>
                <td>{doc.createdAt}</td>
            </tr>
        );
    });

    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Forfatter</th>
                        <th>Besked</th>
                        <th>Tidspunkt</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
        </>
    );
}

export default ShowMessages;