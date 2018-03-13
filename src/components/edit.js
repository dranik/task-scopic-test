import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { updateProduct } from '../actions';
import { SingleDatePicker } from 'react-dates';
import _ from 'lodash';
import moment from 'moment';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }
  renderField(field) {
    const renderInnerElement = (field) => {
      switch (field.type) {
        case "textarea":
          return(
            <textarea
              className="form-control"
              {...field.input}
            />
          )
        case "date":
          return(
            <SingleDatePicker
                {..._.omit(field.input, ['name', 'onBlur', 'onChange', 'onDragStart', 'onDrop', 'onFocus', 'value'])}
              date={field.input.value}
              onDateChange={date => field.input.onChange(date)}
              focused = {field.focused}
              onFocusChange={f => field.onFocusChange(f)}
              isOutsideRange={(day) => false}
            />
          )
        default:
          return (
            <input
              className="form-control"
              type={field.type}
              {...field.input}
            />
          )
      }
    };
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        {(field.type=='date') ? (<br />) : ''}
        {renderInnerElement(field)}
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.updateProduct(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const product = this.props.product;
    const id = this.props.match.params.id;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label = 'Id'
          type = 'text'
          name = 'id'
          component={this.renderField}
          normalize={normalizeInteger}
        />
        <Field
          label = 'Name'
          type = 'text'
          name = 'name'
          component={this.renderField}
        />
        <Field
          label = 'Price'
          type = 'text'
          name = 'price'
          component={this.renderField}
          normalize={normalizeFloat}
        />
        <Field
          label = 'Description'
          type = 'textarea'
          name = 'description'
          component={this.renderField}
        />
        <Field
          label = 'Created'
          type = 'date'
          name = 'created'
          component = {this.renderField}
          focused = {this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
        />
        <button type='Submit' className='btn btn-primary'> Submit </button>
        <Link className="btn btn-primary" to={`/${id ? id : ''}`}> Back </Link>
      </form>
    )
  }
}

const normalizeInteger = (value) => {
  if (!value) {
    return value
  }
  return value.replace(/[^\d]/g, '')
}

const normalizeFloat = (value) => {
  if (!value) {
    return value
  }
  return value.replace(/[^\d\.]/g, '')

}

function validate(values) {
  const errors = {};
  [ "id", "price", "name", "description", "created"].forEach((value)=>{
    if (eval(`!values.${value}`)) {
      eval(`errors.${value} = "Enter the value of ${value}"`);
    }
  })
  if (values.price){
    if (values.price.match(/^\d+(\.\d+)?$/) === null) {
      errors.price = "Price must be of proper format";
    };
  }

  return errors;
}

export default connect(
  (state, props) => ({
    initialValues: props.match.params.id ? state.products[props.match.params.id] : {created: moment()} // pull initial values from account reducer
  }),
  { updateProduct } // bind account loading action creator
)(reduxForm({
  validate,
  form: 'productsNewForm' // a unique identifier for this form
})(Edit))
