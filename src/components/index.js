import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';


class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Price</th>
              <th scope="col">Name</th>
              <th scope="col">Created</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
        <Link className="btn btn-primary" to="/new"> Create product </Link>
      </div>
    )
  }

  renderList() {
    return _.map(this.props.products,(product) => {
      return (
        <tr key={product.id} onClick={(e) => this.handleClick(product.id)} style={{cursor: "pointer"}}>
          <td>{product.id}</td>
          <td>{product.price}</td>
          <td>{product.name}</td>
          <td>{product.created._d.toDateString()}</td>
        </tr>
      );
    });
  }

  handleClick(id) {
    console.log(id)
    this.props.history.push(`/${id}`);
  }
}

function mapStateToProps(state) {
  return{
    products: state.products
  };
}

export default connect(mapStateToProps)(Index);
