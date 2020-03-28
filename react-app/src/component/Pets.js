import React from 'react';
import Pagination from "react-js-pagination";

class Pets extends React.Component {
    constructor(props) {
        super(props);
        // Next we establish our state
        this.state = {
            pets: [],
            nameorder: '',
            activePage: 1,
            itemsCountPerPage:10,
            totalItemsCount:0
        }
    }

    componentDidMount() {
        this.loadData();
        }

        loadData(){
            var urlparams = 'activePage='+this.state.activePage+'&itemsCountPerPage='+this.state.itemsCountPerPage+'&nameorder='+this.state.nameorder;
            fetch('/pets?'+urlparams)
            .then(res => res.json())
            .then((data) => {
            this.setState({ pets: data.data })
            this.setState({ totalItemsCount: data.totalRecord })
            })
            .catch(console.log)
        }
        
        handlePageShort() {
            var order = '';
          
        if(this.state.nameorder == 'ASC')
        order = 'DESC'
        if(this.state.nameorder == 'DESC' || this.state.nameorder == '')
        order = 'ASC'
        
          this.setState({nameorder: order}, () => {
            this.setState({activePage: 1}, () => {
              this.loadData();
            }); 
          }); 
        }
       
        handlePageChange(pageNumber) {
            this.setState({activePage: pageNumber}, () => {
                this.loadData();
            }); 
          }

    
    render() {
        return (
          <div>
            <table id='pets' cellPadding='5'>
               <tbody>
                   <tr>
                       <th>ID</th>
                       <th><a href='#' onClick={this.handlePageShort.bind(this)}>Name</a></th>
                       <th>Weight</th>
                       <th>Age</th>
                    </tr>
               {this.state.pets.map(pet =>
                <tr>
                    <td><a href={"/pet/" + pet.id}>{pet.id}</a></td>
                    <td>{pet.name}</td>
                    <td>{pet.weight}</td>
                    <td>{pet.age}</td>
                </tr>
              )}
               </tbody>
            </table>
            <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={this.state.totalItemsCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
          </div>
        )
      }
}
export default Pets;
