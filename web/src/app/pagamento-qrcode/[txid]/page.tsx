// "use client"
import Navbar from "@/components/navBar";
import ShowQRcode from "@/components/showQRcode";
import api from "@/services/api";
import { AxiosResponse, AxiosError } from 'axios';


interface DataAxiosPurchaseOrder {
  error: boolean;
  msg: string;
  data: DataPurchaseOrder;
}
interface DataPurchaseOrder {
  devedor_txid: string;
  matriculation: string;
  devedor_loc: string;
  devedor_cpf: string;
  devedor_location: string;
  devedor_valor: string;
  devedor_data_criacao: string;
  pagamento_data: string | null;
  pagamento_endtoendid: string | null;
  status: number;
  type: number;
  created_on: string;
  expiration: string;
  updated: string;
  pagamento_cod_pix: string;
  id_order_status_type: number;
  name: string;
  description: string;
  update_on: string;
  qrcode: string;
  imagemQrcode: string;
  linkVisualizacao: string;
}

const getData = async (txid:string)=>{
  const matriculation = '20234234009824'
  try{
    const {data:result}:AxiosResponse<DataAxiosPurchaseOrder> = await api.get(`/purchase-order/${matriculation}/${txid}`)
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
interface DataResultPurchaseOrder {
  error: boolean;
  data: DataPurchaseOrder;
}

export default async function PagamentoQRcode({params}:Props) {
  const {error, data}: any = await getData(params.txid);
  
  return (<>
    <Navbar notButtonCash={true} notButtonNewB={true}/>
    <main className="flex flex-1 max-w-xs justify-center items-center h-lvh m-auto">

          <ShowQRcode purchaseOrder={data} error={error}/>
    </main>
  </>
  );
}
