import {request, gql} from 'graphql-request';
import Link from 'next/link'


export const query = gql `
{
    users{
        data{
          name
          id
          email
          phone
        }
      }
}

`
export async function getStaticProps(){
    const data = await request({
        url: 'https://graphqlzero.almansi.me/api',
        document: query
    })


    return{
        props:{
            data
        }
    }
}



export default function home({data}) {
    const userData = data.users.data
  return (
    <div>
        <h1>Graph API data</h1>
        {userData.map(user =>(
            <Link href={'/graphql/'+ user.id} key={user.id}>
                <div className='container'>
                    
                        <p>{user.email}</p>
                    

                <hr />
                </div>
            </Link>
        ))}
        
    </div>
  )
}
