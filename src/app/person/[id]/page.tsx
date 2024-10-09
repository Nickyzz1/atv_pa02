import React from "react";
import Image from "next/image";
import { Suspense } from "react";

interface IPerso {
    params:
    {
        id: string;
    }
}

interface IData 
{
    id: string;
    name: string;
    image: string;
    ki: string;
    race: string;
    gender: string;
    affiliation: string;

}

interface IDataStaticIndex{
    items: IData[];
}

const Perso = async({params: {id}} : IPerso) =>
{
    const res = await fetch(`https://dragonball-api.com/api/characters/${id}`)
    const data : IData = await res.json()

    const style =
    {
        container: "flex flex-wrap justify-center items-center p-4",
        box: "flex flex-col flex-wrap bg-purple-800 text-white object-cover overflow-hiden rounded p-8 m-4 shadow-[0_1px_5px_10px_rgba(255,255,255,0.1)] w-96",
        img: "h-auto w-auto mt-6 w-[460px] rounded object-cover"
    }

    return(
        <>
        <Suspense fallback = { <div> Loading..</div>}>
        <div className="min-h-screen overflow-y-auto bg-gradient-to-r from-violet-950 to-indigo-950">
            <div className={style.container}>
                <div className={style.box}>
                    <div className="flex self-center gap-6">
                        <h1>ID: {data.id}</h1>
                        <p>Name: {data.name}</p>
                    </div>

                    <Image className={style.img} src={data.image} alt="Photo" width={200} height={100} priority></Image>

                    <div className="bg-purple-900 p-2 texte-center flex justify-center flex-col items-center text-medium rounded shadow-[0_10px_13px_1px_rgba(0,0,0,0.1)]">
                        <p>Gender: {data.gender}</p>
                        <p>Ki: {data.ki}</p>
                        <p>Race: {data.race}</p>
                        <p>Affiliation: {data.affiliation}</p>
                    </div>

                </div>
            </div>
        </div>
        </Suspense>
        </>
    )
}

export default Perso;

export async function generateStaticParams(){
    const res = await fetch("https://dragonball-api.com/api/characters/")
    const data: IDataStaticIndex = await res.json();

    return data.items.map((item)=>{
        item.id.toString()
    })
}
