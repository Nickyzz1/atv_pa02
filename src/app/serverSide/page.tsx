import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Suspense } from "react";
// é como se fosse uma struct ou uma classe
type IData = {
    items: {
        name: string;
        id: string;
        image: string;
    }[];
};

const serverSide = async () => {
    let data: IData = { items: [] }; 

    try {
        const res = await fetch("https://dragonball-api.com/api/characters/");
        
        if (!res.ok) {
            console.error("Erro ao buscar os dados:", res.statusText);
            return data;
        }

        data = await res.json();
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }

    const style = {
        container: "flex flex-wrap justify-center items-center gap-3 mb-4",
        box: "flex flex-wrap flex-col bg-purple-800  text-white h-auto w-60 p-4 rounded-lg text-center shadow-[0_10px_33px_1px_rgba(0,0,0,0.4)] hover:scale-[1.05] ease-linear shadow-[0_10px_33px_1px_rgba(255,255,255,0.4)",
        btn: "bg-purple-950  p-2 rounded hover:bg-purple-700 ",
        img: "h-[350px] w-auto mt-6 w-[460px] rounded "
    };

    return (
        <div className="min-h-screen overflow-y-auto text-center bg-gradient-to-r from-violet-950 to-indigo-950 text-white">
            <h1 className="m-4 text-medium">Server Side Rendering</h1>
            <div className={style.container}>
            <Suspense fallback = { <div> Loading..</div>}>
                {data.items.map((item) => (
                <Link href={`/person/${item.id}`}>
                    <div key={item.id} className={style.box}>
                        <h2 className="m-2">{item.name}</h2>
                        <Image className={style.img} src={item.image} alt="Photo" width={200} height={100} priority></Image>
                        {/* <button className={style.btn}>
                            ABRIR
                        </button> */}
                           
                    </div>
                </Link>
                ))}
            </Suspense>
            </div>
        </div>
    );
};

export default serverSide;