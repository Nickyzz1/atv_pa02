"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface IData {
    name: string;
    ki: string;
    image: string;
}

const FetchPage = () => {
    const [character, setcharacter] = useState<IData[]>([]);

    const style =
    {
        container: "flex flex-row flex-wrap gap-6 m-4 justify-center",
        box: "flex flex-col items-center justify-center w-80 p-6 bg-purple-800 shadow-[0_10px_33px_1px_rgba(0,0,0,0.4)] rounded-xl text-white"
    }

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("https://dragonball-api.com/api/characters/");
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const data = await res.json();
                console.log(data);
                setcharacter(data.items || []);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };
        
        load();
    }, []);

    return (
        <div className="min-h-screen overflow-y-auto  bg-gradient-to-r from-violet-950 to-indigo-950">
            <h1 className="text-center text-white m-4 text-medium ">Personagens</h1>
        <div className={style.container}>
     
            {character.map((item: IData, index) => (
                <div className={style.box} key={index}>
                    <h2>{item.name}</h2>
                    <p>{item.ki}</p>
                    <Image
                        className="h-60 w-auto object-cover rounded-lg"
                        src={item.image}
                        alt={item.name} 
                        width={200}
                        height={400}
                        
                    />
                </div>
            ))}
        </div>
        </div>
    );
};

export default FetchPage;
