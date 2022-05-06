
import { getMessages, createSnapshotHandler } from "./firebase";
import { useEffect, useState } from "react";

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
                        <th>Message</th>
                        <th>Created</th>
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