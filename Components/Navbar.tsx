import React from 'react'
import Link from 'next/link';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

                <li className="nav-item">
                    <Link href="/profile">
                        <span className="nav-item nav-link active">Home</span>
                    </Link>
                </li>
                <li className="nav-item dropdown">
                    <Link href="/admin">
                        <span className="nav-item nav-link">Admin</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/thirdparty">
                        <span className="nav-item nav-link">ThirdParty</span>

                    </Link>
                </li>
                <li className="nav-item">
                <Link href="/restaurant">
                    <span className="nav-item nav-link disabled">Restaurant</span>

                </Link>
                </li>
            </ul>

        </div>
    </nav>


    )
}

export default Navbar

function Navbars() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                        <Link href="/profile">
                            <span className="nav-item nav-link active">Home</span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link href="/admin">
                            <span className="nav-item nav-link">Admin</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/thirdparty">
                            <span className="nav-item nav-link">ThirdParty</span>

                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link href="/restaurant">
                        <span className="nav-item nav-link disabled">Restaurant</span>

                    </Link>
                    </li>
                </ul>

            </div>
        </nav>

    )
}
