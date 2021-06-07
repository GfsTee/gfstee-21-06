import Link from 'next/link'
import { useState, useEffect, useRef } from "react";
// Usage
function App() {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();
    // State for our modal
    const [isModalOpen, setModalOpen] = useState(false);
    // Call hook passing in the ref and a function to call on outside click
    return (
        <div>
            {isModalOpen ? (
                <div >
                    👋 Hey, I'm a modal. Click anywhere outside of me to close.
                </div>
            ) : (
                <button onClick={() => setModalOpen(true)}>Open Modal</button>
            )}
        </div>
    );
}
// Hook
function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}





const Nav = () => {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();
    // State for our modal
    const [isModalOpen, setModalOpen] = useState(false);
    useOnClickOutside(ref, () => setModalOpen(false));

    return (
        <>
            <div className={`nav-wrapper ${isModalOpen ? "show" : ""}`} ref={ref}>
                <div className={`hamburger`} onClick={() => setModalOpen(!isModalOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <nav>
                    <ul>
                        <li><Link href=""><a>Home</a></Link></li>
                        <li><Link href=""><a>About</a></Link></li>
                        <li><Link href=""><a>Contact</a></Link></li>
                    </ul>
                </nav>
            </div>
            <style jsx>{`
                nav {
                    // transform: skew(5deg);
                    height: 100%;
                    width: 100%;
                }
                ul {
                    list-style-type: none;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    height: 100%;
                    width: 100%;
                }
                a {
                    transform: skew(5deg);
                    display: block;
                }
                .nav-wrapper {
                    position: relative;
                    top: 0;
                    bottom: 0;
                    left: -275px;
                    height: 90vh;
                    margin-top: 5vh;
                    width: 300px;
                    // background: red;
                    transform: skew(-5deg);
                    transition: left 1s;
                    // border-radius: 10px;
                    border: 2px solid #333;
                    border-left: 0;
                }
                .show {
                    left: -50px;
                }
                .hamburger {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    height: 20px;
                    width: 30px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    transform: skew(5deg);
                }
                .hamburger span {
                    display: block;
                    height: 2px;
                    width: 100%;
                    background: #333;
                }
            `}</style>
        </>
    );
}

export default Nav;