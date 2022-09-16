import {query} from './home'
import {request} from 'graphql-request'

export async function getStaticPaths(){
    const data = await request({
        url: 'https://graphqlzero.almansi.me/api',
        document: query
    })

    const paths = data.map(user =>{
        return{
            params: {detail: user.id.toString()}
        }
    })

    return{
        paths,
        fallback
    }
}

export async function getStaticProps(){
    const data = await request({
        url: 'https://graphqlzero.almansi.me/api',
        document: query
    })

    return{
        props: {
            data
        }
    }
}


export default function detail({data}) {
    const {name, email, id, phone} = data
  return (
    <div>

        <div className='detail-container'>
            <h3>Welcome to GraphQL detail page</h3>
            <p>id: {id}</p>
            <p>name: {name}</p>
            <p>email: {email}</p>
            <p>contact: {phone}</p>
        </div>
        <Link href={'/rest/home'}>
            <button>
                Home
            </button>
        </Link>
    </div>

  )
}
