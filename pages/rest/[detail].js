
import Link from 'next/link'

export async function getStaticPaths(){
    const res = await fetch('https://jsonplaceholder.typicode.com/users/')
    const data = await res.json()

    const paths = data.map(user =>{
        return{
             params: {detail: user.id.toString()},

         }

    })


    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps(ctx){

    const id = ctx.params.detail; 
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const data = await res.json()

    return{
        props:{
            data
        }
    }
}

export default function details({data}) {
    const {id, name, username, website} = data
  return (
    <div>

        <div className='detail-container'>
            <h3>Welcome to REST details page</h3>
            <p>id: {id}</p>
            <p>name: {name}</p>
            <p>username: {username}</p>
            <p>contact website: {website}</p>
        </div>
        <Link href={'/rest/home'}>
            <button>
                Home
            </button>
        </Link>
    </div>

  )
}
