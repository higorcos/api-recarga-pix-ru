"use client"
import React, { FormEvent,useState } from 'react'
import { useRouter } from 'next/navigation'
import iconeArrow from '../../public/icons/arrow-left-square-fill.svg' 
import iconeNew from '../../public/icons/new.svg' 
import iconeCash from '../../public/icons/credit-card-2-front-fill.svg' 
import Image from 'next/image'



interface StatusButtons {
  notButtonNewB?: boolean
  notButtonCash?: boolean
}


export default  function Navbar(data:StatusButtons) {
    const {notButtonCash , notButtonNewB}= data

    if(notButtonCash){
        console.log('aqui')
    }

    const router = useRouter();



  return (
      <>
          <div className="m-2 
          ">
              {/* sm:mx-auto sm:w-full sm:max-w-sm */}
           <div className="grid grid-cols-3 gap-2 justify-between" >
            <div className="grid grid-cols-2 gap-0 justify-items-start">
            {/* Imagem voltar */}
                <Image
                priority
                src={iconeArrow}    
                className="fill-icone-default mx-auto "
                alt="Icone Pagamento"
                height={35}
                width={35}  
                onClick={()=>{router.back();}}
            />
            </div>
            <div></div>
            <div className="grid grid-cols-2 gap-0 justify-items-end" >
            {!notButtonNewB && 
                <Image
                priority
                src={iconeNew}    
                className="fill-icone-default mx-auto "
                alt="Icone Pagamento"
                height={35}
                width={35}  
                onClick={()=>{router.push('/solicitacao-recarga')}}
                
            />
            }
            {!notButtonCash && 
                <Image
                priority
                src={iconeCash}    
                className="fill-icone-default mx-auto "
                alt="Icone Pagamento"
                height={35}
                width={35}  
                onClick={()=>{router.push('/carteira')}}
            />
            }
            </div>
           </div>
          </div>
        
      </>
    )
  }
