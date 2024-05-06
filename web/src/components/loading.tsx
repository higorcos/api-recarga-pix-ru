interface parametros{
  padding?:string
  render:boolean
}
export default function Loading(props:parametros) {
  const {render, padding} = props;

    return (
      <>{render && (
      <div className={`flex justify-center ${padding}`}> 
        <div >
        <div className={`border-gray-300 flex-auto h-20 w-20 animate-spin rounded-full border-8 border-t-color-c2-loading`}/>
        </div>
      </div>)}</>
    )
  }
