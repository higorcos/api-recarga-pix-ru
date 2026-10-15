'use client'
import CardInfo from "@/components/cardInfo";
import Navbar from "@/components/navBar";
import api from "@/services/api";
import { AxiosResponse, AxiosError } from 'axios';


interface DataAxiosCard {
  error: boolean;
  msg: string;
  data: DataCard;
}
interface DataCard {
  cod_ru: string;
  value: string;
  created_on: string;
  updated_on: string;
  matriculation: string;
}


const getData = async ()=>{
  const matriculation = '20234234009824';
  const cod_ru = '1697478898418'
  try{
    const {data:result}:AxiosResponse<DataAxiosCard> = await api.post(`/card/info`,{ matriculation, cod_ru})
    if(!result.error){
      return {error: false, data: result["data"]}

    }else{
      throw new Error(`${result["msg"]}`);
    }

  }catch(error){
    console.log(error)
    return {error: true, data: []}  
  }
  
}


interface Props {
  params : {txid:string}
}


export default async function PagamentoQRcode() {
  const {error, data}: any = await getData();
  
  return (<>
    <Navbar notButtonCash={true} notButtonNewB={true}/>
    <main className="flex flex-1 max-w-xs justify-center items-center h-lvh m-auto">
          <CardInfo card={data} error={error}/>
    </main>
  </>
  );
}
