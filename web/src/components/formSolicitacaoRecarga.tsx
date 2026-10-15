"use client"
import api from '@/services/api'
import React, { FormEvent,useState } from 'react'
import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/navigation'

interface Order {
  recharge_value:string
  matriculation:string
}

interface ReturnLogin{
  error:string ,
	msg: string,
	token?: string 
}

  
export default function FormSolicitacaoRecarga() {

  const router = useRouter();

  const [formData, setFormData] = useState<Order>({
    recharge_value:"",
    matriculation:"20234234009824",
  }); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try{
     
      const {data:result}:AxiosResponse<ReturnLogin> = await api.post('/purchase-order', formData)
      
      if(!result.error){
        
        router.push('/historico')
       
      }else{
        alert('Erro no login')
      }
  
    }catch(error:any){
      // console.log(error)
      alert('Erro no login !')
    }
    
  };

    return (
      <>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={onSubmit} method='POST'>
            <div>
              <label htmlFor="price" className="block uppercase text-sm font-medium leading-6 text-default-txt-color">
              VALOR DE RECARGA
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm p-1">R$</span>
              </div>
                <input
                type="text"
                name="recharge_value"
                id="recharge_value"
                value={formData.recharge_value}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  focus:ring-color-input-focus focus:ring-2"
                placeholder="0.00"
                />

              </div>
              </div>

  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg- px-3 py-1.5 text-sm font-semibold leading-6 text-default-txt-color shadow-sm hover:bg-default-button hover:text-default-color-background focus:ring-color-input-focus   focus-visible:outline-none focus:ring-2"
                >
                  SOLICITAR
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              
              <div className="font-semibold leading-6 text-default-color-background hover:text--default-color-background focus:ring-color-input-focus   focus-visible:outline-none focus:ring-0 cursor-default transition duration-1000 delay-1000 hover:delay-1000">
               aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </div>
            </p>
          </div>
        
      </>
    )
  }
