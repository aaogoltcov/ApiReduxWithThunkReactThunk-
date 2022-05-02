import Loading from "../viewes/Loading";
import {useState} from "react";
import {fetchEdit} from "../features/form";
import {useDispatch} from "react-redux";
import {deleteItem} from "../features/list";

export default function Item(props) {
    const { item } = props;
    const [editIsLoading, setEditLoading] = useState(false);
    const [deleteIsLoading, setDeleteLoading] = useState(false);
    const dispatch = useDispatch();

    function editClickButtonHandler(event) {
        event.preventDefault();
        setEditLoading(true);
        dispatch(fetchEdit(event.currentTarget.id))
            .then(() => setEditLoading(false));
    }

    function deleteClickButtonHandler(event) {
        event.preventDefault();
        setDeleteLoading(true);
        dispatch(deleteItem(event.currentTarget.id));
    }

    return (
        <li key={item.id} className="list-group-item">
            <div className="transaction">
                <div className="transaction-text">{item.name}: {item.price} руб.</div>
                <div className="transaction-button">
                    <button id={item.id} type="button"
                            className="btn btn-secondary"
                            onClick={editClickButtonHandler}
                    >
                        <Loading status={editIsLoading} title={<i className="fas fa-edit"/>} />
                    </button>
                    <button id={item.id}
                            type="button"
                            className="btn btn-danger"
                            onClick={deleteClickButtonHandler}
                    >
                        <Loading status={deleteIsLoading} title={<i className="fa fa-trash" aria-hidden="true"/>} />
                    </button>
                </div>
            </div>
        </li>
    )
}