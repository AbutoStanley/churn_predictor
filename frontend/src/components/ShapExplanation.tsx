interface Props{
  explanations:any[]
}

export default function ShapExplanation({explanations}:Props){

  if(!explanations || explanations.length === 0){
    return null
  }

  return(

    <div className="card">

      <h2>Feature Impact</h2>

      <ul>

        {explanations.map((f:any,i:number)=>(
          <li key={i}>
            {f.feature} : {f.value.toFixed(3)}
          </li>
        ))}

      </ul>

    </div>
  )
}