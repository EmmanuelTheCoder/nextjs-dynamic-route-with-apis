
import Link from 'next/link'

export async function getStaticProps(){
    const apiCall = await fetch('https://jsonplaceholder.typicode.com/users/')

    const data = await apiCall.json()

    return{
        props:{
            data
        },

    }
}

export default function home({data}) {
  return (
    <div>
        <h1>REST API data</h1>
        {data.map(user =>(
            <Link href={'/rest/'+ user.id} key={user.id}>
                <div className='container'>
                    
                        <p>{user.name}</p>
                    

                <hr />
                </div>
            </Link>
        ))}
        
    </div>
  )
}
