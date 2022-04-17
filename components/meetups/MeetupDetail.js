import { Fragment } from "react"

function MeetupDetail(props) {
    return (
        <Fragment>
            <img alt={props.title} src={props.img} />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.desc}</p>
        </Fragment>
    )
}

export default MeetupDetail