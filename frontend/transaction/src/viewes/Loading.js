const Loading = props => {
    if (props.status) {
        return (
            <>
                <i className="fa-solid fa-cog fa-spin" /> {props.message}
            </>
        )
    } else {
        return <>{props.title}</>
    }
}

export default Loading;

Loading.defaultProps = {
    title: "",
    message: "",
    status: false,
}