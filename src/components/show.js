import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../actions';

class Show extends Component {

  onDeleteClick(){
    const {id} = this.props.match.params;
    this.props.deleteProduct(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const product = this.props.product;
    if (!product) {
      return <div> No such product </div>
    }
    return (
      <div>
        <h1>{product.name}</h1>
        <h2>{`Price: USD${product.price}`}</h2>
        <h6>{`Created on: ${product.created._d.toDateString()}`}</h6>
        <p>{product.description}</p>
        <Link className="btn btn-primary" to="/"> Back </Link>
        <Link className="btn btn-primary pull-xs-right" to={`/edit/${this.props.match.params.id}`}>
          Edit
        </Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}> Delete! </button>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return{
    product: state.products[props.match.params.id]
  };
}

export default connect(mapStateToProps, { deleteProduct })(Show);
