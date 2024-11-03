import Link from "next/link";

type Props = {
    current: "home" | "profile" | "feed" | "discover" | "lists"
}

const Header: React.FC<Props> = ({current}: Props) => { const linkStyle = `text-text2 hover:text-text1 duration-150`
    const currentStyle = `text-white hover:text-text2 duration-150`

    return (
        <div className="bg-bg2 py-10 flex justify-evenly items-center">
            <div className="hover:text-text1 duration-150 flex items-center yadig-italic text-6xl text-text2">
                <Link href="/">yadig?</Link>
            </div>
            <div className="main-font text-2xl cursor-pointer flex items-center gap-10">
                <Link 
                    href="/profile" 
                    className={current=="profile"?currentStyle:linkStyle}
                >
                    Profile
                </Link>
                <Link 
                    href="/feed" 
                    className={current=="feed"?currentStyle:linkStyle}
                >
                    Feed
                </Link>
                <Link 
                    href="/discover"
                    className={current=="discover"?currentStyle:linkStyle}
                >
                    Discover
                </Link>
                <Link 
                    href="/lists"
                    className={current=="lists"?currentStyle:linkStyle}
                >
                    Lists
                </Link>
            </div>
        </div>
    )
};

export default Header;
