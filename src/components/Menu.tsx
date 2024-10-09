import {ROUTES} from "@/constants/routes"
import Link from "next/link";
import Image from "next/image";
import db from "@/app/assets/img/db.png"


export const Menu = ({op1, op2, op3} : 
{
    op1: string;
    op2: string;
    op3: string;
}


) =>{
    const style = 
    {
    p:"text-white bg-violet-800 p-2 rounded hover:bg-violet-700 min-w-auto w-30 text-center",
    nav:"flex flex-wrap text-white bg-violet-800 gap-3 p-3 text-large flex-row font-comic w-screen justify-center items-center"
    }

    return(
        <>
        <nav className={style.nav}>

            <Image className=" self-start h-auto w-auto" src={db} width={100} height={100} alt="" priority></Image>
   
          <div className="flex flex-row self-center w-full justify-center items-center">
              <Link href={ROUTES.fetchPage} className={style.p} >{op1}</Link>
              <Link href={ROUTES.axiosPage} className={style.p} >{op2}</Link>
              <Link href={ROUTES.serverSide} className={style.p} >{op3}</Link>
          </div>

        </nav>
        </>
    );
}