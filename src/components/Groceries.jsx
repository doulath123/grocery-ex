import{useEffect,useState} from "react";
import axios from "axios";

export const Groceries=()=>{
    const [text, setText]=useState('');
    const [groceries, setGroceries]=useState([]);
    const [page, setPage]=useState(1)
    useEffect(()=>{
      getData();
    },[page])
    
   function getData(){
    axios.get(`http://localhost:3001/groceries?_limit=3&_page=${page}`).then((res)=>{
        setGroceries(res.data)
    })  
   }
  
   function doulath(id){
    fetch(`http://localhost:3001/groceries/${id}`,{
        method:"DELETE"
    }).then((result)=>{
        result.json().then((resp)=>{
            getData();
        })
    })
   
       }
    return (
        <div>
            <input type="text" onChange={(e)=>setText(e.target.value)}></input>
            <button onClick={()=>{
                fetch("http://localhost:3001/groceries",{
                    method:"POST",
                    body:JSON.stringify({title:text, perchage:false}),
                    headers:{
                        "content-type":"application/json"
                    },
                }).then(()=>{
                    getData();
                })
            }}>
                save groceries
            </button>
           {groceries.map((e)=>(
           
           <div>{e.title}<button onClick={()=>doulath(e.id)}>delet</button></div>
                
                
               
               
               
            ))}
            
            <button
             onClick={()=>{
                
                if(page<=1)
                {
                   setPage(1)
                }
                else{
                    setPage(page-1)
                }
                
            }}>prev</button>
            <button
            onClick={()=>{
                setPage(page+1)
            }}>next</button>
        </div>
        
        
    )

}
