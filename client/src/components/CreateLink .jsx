import React, { useState } from 'react';
import {
    useMutation,
    gql
} from '@apollo/client';

const POST_LINK = gql`
    mutation GoogleLink($description: String!, $url: String!){
        newLink(description: $description, url: $url){
            id,
            description,
            url
        }
    }
`;

const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });

  const [createLink] = useMutation(POST_LINK, {
      variables: {...formState},
      
  });


  const submitHandler = async(e) => {
    try{
        e.preventDefault();
        const {data} = await createLink(); 
        if(data){
            setFormState({
                description: '',
                url: ''
            })
        }  
    }
    catch(err){
        throw err;
    }
  }

  return (
    <div>
      <h3>Add New Link</h3>
      <form
        onSubmit={submitHandler}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;