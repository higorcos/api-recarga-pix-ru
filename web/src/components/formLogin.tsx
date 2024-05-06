"use client"
import api from '@/services/api'
import React, { FormEvent,useState } from 'react'
import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/navigation'

interface User {
  email: string;
  password: string;
}

interface ReturnLogin{
  error:string ,
	msg: string,
	token?: string 
}

export default  function FormLogin() {

  const router = useRouter();

  const [formData, setFormData] = useState<User>({
    email: '',
    password: ''
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
      const {data:result}:AxiosResponse<ReturnLogin> = await api.post('/login', formData)
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
                <label htmlFor="email" className="block uppercase text-sm font-medium leading-6 text-default-txt-color">
                  Usuário
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  focus:ring-color-input-focus focus:ring-2"

                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm text-default-txt-color font-medium leading-6 ">
                    Senha
                  </label>
                  <div className="text-sm">
                    {/* <a href="#" className="font-semibold text-default-txt-color hover:text-default-txt-color-hover">
                      Esqueceu a senha?
                    </a> */}
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-color-input-focus   focus-visible:outline-none focus:ring-2" 
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg- px-3 py-1.5 text-sm font-semibold leading-6 text-default-txt-color shadow-sm hover:bg-default-button hover:text-default-color-background focus:ring-color-input-focus   focus-visible:outline-none focus:ring-2"
                >
                  ENTRAR
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
