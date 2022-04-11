
import React, {useId} from 'react';
import {
    gql,
    useQuery
} from '@apollo/client';

const GET_LINKS = gql`
    query {
        feed{
            id
            description
            url
        }
    }
`;

const Links = () => {
  const {data, loading, error} = useQuery(GET_LINKS);
  const uid = useId();

  if(error) {
      console.error(error.message, error.name);
      return <span>Something wrong...</span>;
  }

  if(loading) return <span>Loading...</span>;

  return (
    <div>
    <h3>All Links</h3>
     {
         data && data.feed.map(item=> (
             <ul key={item.id+uid}>
                <Link link={item} />
             </ul>
         ))
     }
    </div>
  )
}

const Link = (props) => {
    const { link } = props;

    return (
      <li>
          {link.description} ({link.url})
      </li>
    );
};

export default Links