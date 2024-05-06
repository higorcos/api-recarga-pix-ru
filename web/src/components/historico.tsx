"use client"

import CardHistorico from './cardHistorico';
import api from '../services/api';
import { AxiosResponse } from 'axios';

interface DataAxiosHistoric {
  error: boolean;
  msg: string;
  data: TypeDataHistory[];
}
interface TypeDataHistory {
  created_on: string;
  description: string;
  devedor_cpf: string;
  devedor_data_criacao: string;
  devedor_loc: string;
  devedor_location: string;
  devedor_txid: string;
  devedor_valor: string;
  expiration: string;
  id_order_status_type: number;
  matriculation: string;
  name: string;
  pagamento_cod_pix: string;
  pagamento_data: string | null;
  pagamento_endtoendid: string | null;
  status: number;
  type: number;
  update_on: string;
  updated: string;
}

const getData = async ()=>{
  const matriculation = '20234234009824'
  try{
    const {data:result}:AxiosResponse<DataAxiosHistoric> = await api.get(`/purchase-order/${matriculation}`)
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


export default async function Historico() {
  const {error, data:historic} = await getData();

    return (<>
      {!error && 
      <div className="grid grid-cols-1 grid-rows-4 gap-4 justify-items-center px-16">
        {historic.map((item, index) => (
          <CardHistorico key={index} data={item}/>
        ))}
      </div>
      }

    </>)
  }



