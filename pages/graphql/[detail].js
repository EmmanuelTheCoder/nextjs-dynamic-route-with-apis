//import {query} from './home'
import {request, gql} from 'graphql-request'
import Link from 'next/link'

const queryIdOnly = gql`

    {
        users{
        data{
            id
        }
        
        }
  }

`

const queryUserById = gql `
  query ($id: ID!)
  {
    user(id: $id) {
        id
        email
        name
        phone
        
      }
  }

`

export async function getStaticPaths(){
    const data = await request({
        url: 'https://graphqlzero.almansi.me/api',
        document: queryIdOnly
    })

    const paths = data.users.data.map(user =>{
        return{
            params: {detail: user.id.toString()}
        }
    })

    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}){

    const variables = {
        id: params.detail
    }
   
    const data = await request({
        url: 'https://graphqlzero.almansi.me/api',
        document: queryUserById,
        variables: variables

    })

    return{
        props: {
            data
        }
    }
}


export default function detail({data}) {
    const {name, email, id, phone} = data.user

    // console.log(data.user)
  return (
    <div>

        <div className='detail-container'>
            <h3>Welcome to GraphQL detail page</h3>
            <p>id: {id}</p>
            <p>name: {name}</p>
            <p>email: {email}</p>
            <p>contact: {phone}</p>
        </div>
        <Link href={'/graphl/home'}>
            <button>
                Home
            </button>
        </Link>
    </div>

  )
}
