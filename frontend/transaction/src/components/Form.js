import {useDispatch, useSelector} from "react-redux";
import {fetchForm, formSlice} from "../features/form";
import Loading from "../viewes/Loading";

export default function Form() {
    const id = useSelector((state) => state.form.form.id);
    const name = useSelector((state) => state.form.form.name);
    const price = useSelector((state) => state.form.form.price);
    const description = useSelector((state) => state.form.form.description);
    const isLoading = useSelector((state) => state.form.isLoading);
    const isReadonly = useSelector((state) => state.form.isReadonly);
    const toFreeze = useSelector((state) => state.list.toFreeze);
    const dispatch = useDispatch();

    function nameChangeValueHandler(event) {
        event.preventDefault();
        const nameInput = event.currentTarget.value;
        dispatch(formSlice.actions.name(nameInput));
    }

    function priceChangeValueHandler(event) {
        event.preventDefault();
        const priceInput = event.currentTarget.value;
        if (Number.parseInt(priceInput)) {
            dispatch(formSlice.actions.price(priceInput));
        }
    }

    function descriptionChangeValueHandler(event) {
        event.preventDefault();
        const descriptionInput = event.currentTarget.value;
        dispatch(formSlice.actions.description(descriptionInput));
    }

    function cancelButtonHandler(event) {
        event.preventDefault();
        dispatch(formSlice.actions.clear());
    }

    function saveButtonHandler(event) {
        event.preventDefault();
        dispatch(fetchForm({
            id: id,
            name: name,
            price: price,
            content: description,
        }));
    }

    return (
        <form>
            <div className="form-group m-1">
                <label htmlFor="name">Название</label>
                <input type="text"
                       className="form-control"
                       id="name"
                       placeholder="Название"
                       value={name}
                       onChange={nameChangeValueHandler}
                       readOnly={toFreeze || isReadonly}
                />
            </div>
            <div className="form-group m-1">
                <label htmlFor="price">Цена</label>
                <input type="text"
                       className="form-control"
                       id="price"
                       placeholder="Цена"
                       value={price}
                       onChange={priceChangeValueHandler}
                       readOnly={toFreeze || isReadonly}
                />
            </div>
            <div className="form-group m-1">
                <label htmlFor="description">Описание</label>
                <textarea className="form-control"
                          id="description"
                          placeholder="Описание"
                          rows="3"
                          value={description}
                          onChange={descriptionChangeValueHandler}
                          readOnly={toFreeze || isReadonly}
                />
            </div>
            <button type="button"
                    className="btn btn-primary m-1"
                    onClick={saveButtonHandler}>
                <Loading status={isLoading} title="Сохранить" />
            </button>
            <button type="button"
                    className="btn btn-secondary m-1"
                    onClick={cancelButtonHandler}
            >Отмена</button>
        </form>
    )
}