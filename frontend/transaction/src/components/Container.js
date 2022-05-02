import Form from "./Form";
import List from "./List";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchList} from "../features/list";

export default function Container() {
    const dispatch = useDispatch();
    const toUpdate = useSelector((state) => state.list.toUpdate);
    const isUpdated = useSelector((state) => state.form.isUpdated);

    useEffect(() => {
        dispatch(fetchList());
    }, [dispatch, toUpdate, isUpdated]);

    return (
        <div className="card-group gap-4 m-4 flex-column w-50">
            <Form />
            <List />
        </div>
    )
}