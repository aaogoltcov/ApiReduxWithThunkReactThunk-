import {useSelector} from "react-redux";
import Loading from "../viewes/Loading";
import Item from "./Item";

export default function List() {
    const list = useSelector((state) => state.list.list);
    const isLoading = useSelector((state) => state.list.isLoading);
    const isError = useSelector((state) => state.list.isError);

    const renderListOfTransactions = () => {
        if (list) {
            return (
                <ul className="list-group m-1">
                    {
                        list.map(item => {
                            return <Item key={item.id} item={item} />
                        })
                    }
                </ul>
            );
        }
    }

    return (
        <>
            {!isLoading && !isError && renderListOfTransactions()}
            {isLoading && !isError && <button type="button" className="btn btn-primary m-1 w-100">
                <Loading status={isLoading}
                         message="Загрузка данных..."/>
            </button>}
            {isLoading && isError && <button type="button" className="btn btn-danger m-1 w-100">
                <Loading status={isLoading}
                         message="Ошибка, пытаюсь загрузить снова..."/>
            </button>}
        </>
    )
}