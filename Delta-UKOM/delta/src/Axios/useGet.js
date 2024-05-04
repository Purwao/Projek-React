import { useEffect, useState } from "react";
import { link } from "./link";

function UseGet(url) {
    const [isi, setIsi] = useState([]);

    useEffect(() => {
        let ambil = true;
        async function fetchData() {
            const response = await link.get(url);
            if (ambil) {
                setIsi(response.data);
            }
        }
        fetchData();
        return () => (ambil = false);
    }, [isi]);

    return [isi];
}

export default UseGet;