import { FaHome, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link'; 

export default function Item({ children }) {
    return (
        <html lang="en">
            <body>
                <nav>
                    <ul>
                        <li>
                            <Link href="/home">
                                <FaHome className="GenIcon" /> หน้าหลัก
                            </Link>
                        </li>
                        <li>
                            <Link href="/cart">
                                <FaShoppingCart className="GenIcon" /> ตะกร้าสินค้า
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile">
                                <FaUser className="GenIcon" /> โปรไฟล์
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <FaSignOutAlt className="GenIcon" /> ออกจากระบบ
                            </Link>
                        </li>
                    </ul>
                </nav>
                {children}
            </body>
        </html>
    );
}
