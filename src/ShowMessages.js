
import { getMessages } from "./firebase";
import { useEffect, useState } from "react";

function ShowMessages() {
    const [dataList, setDataList] = useState([]);

    const listItems = dataList.map((survey, index) => {
        return (
            <tr key={survey.id}>
                <td>{index + 1}</td>
                <td>{survey.message} </td>
                <td>{survey.createdAt}</td>
            </tr>
        );
    }

    );

    useEffect(() => {
        getMessages(dataList, setDataList);
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