import React from 'react';


class Pet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            pet: []
        }
    }

   componentDidMount() {
            fetch('/pet/'+this.state.id)
            .then(res => res.json())
            .then((data) => {
            this.setState({ pet: data })
            })
            .catch(console.log)
       }

    render() {
        return (
          <div>
               {this.state.pet.map(pet =>
            <table id='pet' cellPadding='5'>
               <tbody>
                   <tr>
                       <th>ID</th><td>{pet.id}</td>
                       </tr>
                       <tr>
                       <th>Name</th> <td>{pet.name}</td>
                       </tr>
                       <tr>
                       <th>Weight</th><td>{pet.weight}</td>
                       </tr>
                       <tr>
                       <th>Age</th><td>{pet.age}</td>
                    </tr>
               </tbody>
               <a href="/pets">Back</a>
            </table>
            )}
          </div>
        )
      }
}
export default Pet;
