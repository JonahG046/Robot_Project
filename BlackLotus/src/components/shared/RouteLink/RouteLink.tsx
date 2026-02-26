import "./RouteLink.css";
import {Link, useRoute} from "wouter"

const RouteLink = ({...props}) => {
    const{
        text,
        href,
        textColor = "white",
        activeColor = null,
    } = props;
    const [isActive] = useRoute(href);


    return (
        <Link href={href} className={`hover:opacity-60 block py-2 px-3 text-${textColor} bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 ${isActive ?"active":""}`} aria-current="page">{text}</Link>
    )
}

export default RouteLink;