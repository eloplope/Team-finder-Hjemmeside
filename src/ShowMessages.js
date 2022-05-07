
import { getMessages, createSnapshotHandler } from "./firebase";
import { useEffect, useState, useContext } from "react";



function ShowMessages() {

    
    const [dataList, setDataList] = useState([]);

    const listItems = dataList.map((doc, index) => {
        return (
            <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.author} </td>
                <td>{doc.message} </td>
                <td>{doc.createdAt}</td>
            </tr>
        );
    }

    );

    useEffect(() => {
        //getMessages(dataList, setDataList);
        createSnapshotHandler(dataList, setDataList);
    }, []);

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